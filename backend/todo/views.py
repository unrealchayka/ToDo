from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from django.shortcuts import render
from django.views import View
from rest_framework.authtoken.models import Token

from .models import Category, TodoTask, Tag, TaskComment, TaskAttachment
from .serializers import (
    CategorySerializer,
    TodoTaskSerializer,
    TagSerializer,
    TaskCommentSerializer,
    TaskAttachmentSerializer
)
from django.contrib.auth import get_user_model

User = get_user_model()

class HomeView(View):
    def get(self, request):
        context = {}
        if request.user.is_authenticated:
            try:
                # Удаляем старый токен, если существует
                Token.objects.filter(user=request.user).delete()
                # Создаем новый токен
                token = Token.objects.create(user=request.user)
                context['api_token'] = token.key
            except Exception as e:
                # Логирование ошибки
                print(f"Error creating token: {e}")
                context['token_error'] = "Не удалось создать токен доступа"
        
        return render(request, 'index.html', context)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return Tag.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TodoTaskViewSet(viewsets.ModelViewSet):
    serializer_class = TodoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['completed', 'priority', 'category', 'tags']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'updated_at', 'due_date', 'priority']
    ordering = ['-priority', 'due_date']

    def get_queryset(self):
        queryset = TodoTask.objects.filter(user=self.request.user)
        
        # Фильтрация по статусу (если параметр 'status' в запросе)
        status = self.request.query_params.get('status', None)
        if status == 'active':
            queryset = queryset.filter(completed=False)
        elif status == 'completed':
            queryset = queryset.filter(completed=True)
        
        # Фильтрация по сроку выполнения
        due_date = self.request.query_params.get('due_date', None)
        if due_date == 'today':
            queryset = queryset.filter(due_date__date=timezone.now().date())
        elif due_date == 'overdue':
            queryset = queryset.filter(due_date__lt=timezone.now(), completed=False)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        task = self.get_object()
        task.completed = True
        task.save()
        return Response({'status': 'task completed'})

    @action(detail=True, methods=['post'])
    def uncomplete(self, request, pk=None):
        task = self.get_object()
        task.completed = False
        task.save()
        return Response({'status': 'task uncompleted'})

class TaskCommentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskComment.objects.filter(
            Q(author=self.request.user) | Q(task__user=self.request.user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class TaskAttachmentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskAttachment.objects.filter(
            Q(uploaded_by=self.request.user) | Q(task__user=self.request.user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)