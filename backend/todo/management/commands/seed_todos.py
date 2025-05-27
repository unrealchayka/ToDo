import random
import os
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from todo.models import Category, TodoTask, Tag, TaskComment, TaskAttachment, Project

User = get_user_model()
fake = Faker('ru_RU')

class Command(BaseCommand):
    help = 'Генерация фейковых данных (минимум 30 задач)'

    def handle(self, *args, **options):
        # Получаем или создаем пользователя admin
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@example.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password('admin')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Создан пользователь admin'))

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
            category = Category.objects.create(user=admin_user, **data)
            categories.append(category)
            self.stdout.write(self.style.SUCCESS(f'Создана категория: {category.name}'))

        # Создаем теги
        tags_names = [
            'важно', 'срочно', 'позже', 'проект', 'встреча',
            'документы', 'звонок', 'покупки', 'ремонт', 'здоровье'
        ]
        
        tags = []
        for name in tags_names:
            tag = Tag.objects.create(name=name, user=admin_user)
            tags.append(tag)
            self.stdout.write(self.style.SUCCESS(f'Создан тег: {tag.name}'))

        # Создаем проекты
        projects = []
        for i in range(5):
            project = Project.objects.create(
                title=fake.sentence(nb_words=3),
                description=fake.paragraph(nb_sentences=2),
                slug=fake.slug(),
                user=admin_user  # Добавляем пользователя к проекту
            )
            projects.append(project)
            self.stdout.write(self.style.SUCCESS(f'Создан проект: {project.title}'))

        # Создаем задачи (минимум 30)
        tasks = []
        for i in range(35):
            due_date = timezone.now() + timedelta(days=random.randint(1, 30)) if random.choice([True, False]) else None
            
            task = TodoTask.objects.create(
                title=fake.sentence(nb_words=random.randint(2, 5)),
                description=fake.paragraph(nb_sentences=random.randint(1, 4)),
                completed=random.choice([True, False]),
                due_date=due_date,
                priority=random.choice(['low', 'medium', 'high']),
                category=random.choice(categories) if random.choice([True, False]) else None,
            )
            tasks.append(task)
            
            # Добавляем теги
            for _ in range(random.randint(0, 3)):
                if tags:
                    task.tags.add(random.choice(tags))
            
            # Создаем комментарии
            for _ in range(random.randint(0, 2)):
                TaskComment.objects.create(
                    task=task,
                    author=admin_user,
                    text=fake.paragraph(nb_sentences=random.randint(1, 3)))
            
            # Создаем вложения (примеры)
            if random.choice([True, False]):
                # Создаем временный файл
                file_path = f'task_attachments/sample_{task.id}.txt'
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                with open(file_path, 'w') as f:
                    f.write(fake.text())
                
                TaskAttachment.objects.create(
                    task=task,
                    file=file_path,
                    uploaded_by=admin_user
                )
            
            self.stdout.write(self.style.SUCCESS(f'Создана задача #{i+1}: {task.title}'))

        # Добавляем задачи в проекты
        for project in projects:
            project_tasks = random.sample(tasks, min(10, len(tasks)))
            project.tasks.set(project_tasks)
            self.stdout.write(self.style.SUCCESS(f'Добавлены задачи в проект {project.title}'))

        self.stdout.write(self.style.SUCCESS('Успешно сгенерированы фейковые данные!'))