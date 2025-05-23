# backend/todos/models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Category(models.Model):
    """Категории для группировки задач"""
    name = models.CharField(_("Название"), max_length=100, unique=True)
    color = models.CharField(_("Цвет"), max_length=7, default='#FFFFFF')
    icon = models.CharField(_("Иконка"), max_length=50, blank=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='categories',
        verbose_name=_("Пользователь")
    )

    class Meta:
        verbose_name = _("Категория")
        verbose_name_plural = _("Категории")
        ordering = ['name']
        unique_together = ['name', 'user']

    def __str__(self):
        return self.name


class Priority(models.TextChoices):
    """Уровни приоритета задачи"""
    LOW = 'low', _('Низкий')
    MEDIUM = 'medium', _('Средний')
    HIGH = 'high', _('Высокий')


class TodoTask(models.Model):
    """Основная модель задачи"""
    title = models.CharField(_("Заголовок"), max_length=200)
    description = models.TextField(_("Описание"), blank=True)
    completed = models.BooleanField(_("Выполнено"), default=False)
    created_at = models.DateTimeField(_("Дата создания"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Дата обновления"), auto_now=True)
    due_date = models.DateTimeField(_("Срок выполнения"), null=True, blank=True)
    priority = models.CharField(
        _("Приоритет"),
        max_length=10,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks',
        verbose_name=_("Категория")
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tasks',
        verbose_name=_("Пользователь")
    )
    tags = models.ManyToManyField(
        'Tag',
        related_name='tasks',
        blank=True,
        verbose_name=_("Теги")
    )

    class Meta:
        verbose_name = _("Задача")
        verbose_name_plural = _("Задачи")
        ordering = ['-priority', 'due_date']
        indexes = [
            models.Index(fields=['completed']),
            models.Index(fields=['due_date']),
            models.Index(fields=['priority']),
        ]

    def __str__(self):
        return f"{self.title} ({self.get_priority_display()})"


class Tag(models.Model):
    """Теги для задач"""
    name = models.CharField(_("Название"), max_length=50, unique=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tags',
        verbose_name=_("Пользователь")
    )

    class Meta:
        verbose_name = _("Тег")
        verbose_name_plural = _("Теги")
        ordering = ['name']

    def __str__(self):
        return self.name


class TaskComment(models.Model):
    """Комментарии к задачам"""
    task = models.ForeignKey(
        TodoTask,
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name=_("Задача")
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("Автор")
    )
    text = models.TextField(_("Текст комментария"))
    created_at = models.DateTimeField(_("Дата создания"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Дата обновления"), auto_now=True)

    class Meta:
        verbose_name = _("Комментарий")
        verbose_name_plural = _("Комментарии")
        ordering = ['-created_at']

    def __str__(self):
        return f"Комментарий от {self.author.username} к задаче {self.task.id}"


class TaskAttachment(models.Model):
    """Вложения к задачам"""
    task = models.ForeignKey(
        TodoTask,
        on_delete=models.CASCADE,
        related_name='attachments',
        verbose_name=_("Задача")
    )
    file = models.FileField(
        _("Файл"),
        upload_to='task_attachments/%Y/%m/%d/'
    )
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("Загрузил")
    )
    uploaded_at = models.DateTimeField(_("Дата загрузки"), auto_now_add=True)

    class Meta:
        verbose_name = _("Вложение")
        verbose_name_plural = _("Вложения")
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"Вложение {self.file.name} к задаче {self.task.id}"
    

class Project(models.Model):
    title = models.CharField(_("Заголовок"), max_length=200)
    description = models.TextField(_("Описание"), blank=True)
    tasks = models.ManyToManyField(TodoTask, blank=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    class Meta:
        verbose_name = _("Проект")
        verbose_name_plural = _("Проекты")

    def __str__(self):
        return f"{self.title}"