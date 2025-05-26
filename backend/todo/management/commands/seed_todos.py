import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from todo.models import Category, TodoTask, Tag, TaskComment, TaskAttachment

User = get_user_model()
fake = Faker('ru_RU')

class Command(BaseCommand):
    help = 'Генерация фейковых данных (минимум 30 задач)'

    def handle(self, *args, **options):
        # Создаем тестового пользователя
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'testuser@example.com',
                'password': 'testpass123'
            }
        )
        if created:
            user.set_password('testpass123')
            user.save()
            self.stdout.write(self.style.SUCCESS('Создан тестовый пользователь: testuser'))

        # Создаем категории
        categories_data = [
            {'name': 'Работа', 'color': '#FF5733', 'icon': 'work'},
            {'name': 'Личное', 'color': '#33FF57', 'icon': 'person'},
            {'name': 'Семья', 'color': '#3357FF', 'icon': 'family_restroom'},
            {'name': 'Учеба', 'color': '#F033FF', 'icon': 'school'},
            {'name': 'Финансы', 'color': '#FF33F0', 'icon': 'attach_money'},
        ]
        
        categories = []
        for data in categories_data:
            category = Category.objects.create(user=user, **data)
            categories.append(category)
            self.stdout.write(self.style.SUCCESS(f'Создана категория: {category.name}'))

        # Создаем теги
        tags_names = [
            'важно', 'срочно', 'позже', 'проект', 'встреча',
            'документы', 'звонок', 'покупки', 'ремонт', 'здоровье'
        ]
        
        tags = []
        for name in tags_names:
            tag = Tag.objects.create(name=name, user=user)
            tags.append(tag)
            self.stdout.write(self.style.SUCCESS(f'Создан тег: {tag.name}'))

        # Создаем задачи (минимум 30)
        for i in range(35):
            due_date = timezone.now() + timedelta(days=random.randint(1, 30)) if random.choice([True, False]) else None
            
            task = TodoTask.objects.create(
                title=fake.sentence(nb_words=random.randint(2, 5)),
                description=fake.paragraph(nb_sentences=random.randint(1, 4)),
                completed=random.choice([True, False]),
                due_date=due_date,
                priority=random.choice(['low', 'medium', 'high']),
                category=random.choice(categories) if random.choice([True, False]) else None,
                user=user
            )
            
            # Добавляем теги
            for _ in range(random.randint(0, 3)):
                if tags:
                    task.tags.add(random.choice(tags))
            
            # Создаем комментарии
            for _ in range(random.randint(0, 2)):
                TaskComment.objects.create(
                    task=task,
                    author=user,
                    text=fake.paragraph(nb_sentences=random.randint(1, 3)))
            
            # Создаем вложения (примеры)
            if random.choice([True, False]):
                # В реальном коде здесь должно быть реальное создание файлов
                TaskAttachment.objects.create(
                    task=task,
                    file='task_attachments/sample.txt',  # В реальном проекте нужно загружать реальные файлы
                    uploaded_by=user
                )
            
            self.stdout.write(self.style.SUCCESS(f'Создана задача #{i+1}: {task.title}'))

        self.stdout.write(self.style.SUCCESS('Успешно сгенерированы фейковые данные!'))