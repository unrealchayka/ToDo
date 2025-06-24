import requests
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from django.views import View
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from collections import OrderedDict
from rest_framework.permissions import AllowAny

from .models import Category, Project, ProjectFile, TodoTask, Tag, TaskComment, TaskAttachment
from .serializers import (
    CategorySerializer,
    ProjectFileSerializer,
    ProjectSerializer,
    TodoTaskSerializer,
    TagSerializer,
    TaskCommentSerializer,
    TaskAttachmentSerializer,
    NoteSerializer
)
from django.contrib.auth import get_user_model

User = get_user_model()

class AllAPIUrlsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        urls = OrderedDict()
        
        main_urls = {
            'categories': reverse('category-list', request=request),
            'tags': reverse('tag-list', request=request),
            'tasks': reverse('task-list', request=request),
            'comments': reverse('comment-list', request=request),
            'attachments': reverse('attachment-list', request=request),
            'projects': reverse('project-list', request=request),
        }
        urls.update(main_urls)
        
        project_urls = {
            'project_files': reverse(
                'project-file-list', 
                kwargs={'project_slug': 'sample'}, 
                request=request
            ).replace('sample', '{project_slug}')
        }
        urls.update(project_urls)
        
        return Response(urls)

class HomeView(View):
    def get(self, request):
        context = {}
        if request.user.is_authenticated:
            token, created = Token.objects.get_or_create(user=request.user)
            context['api_token'] = token.key

        api_url = request.build_absolute_uri(reverse('all-api-urls'))
        response = requests.get(api_url)

        if response.status_code == 200:
            api_urls = response.json()
        else:
            api_urls = {
                'error': 'Не удалось загрузить список API URLs'
            }

        context['api_urls'] = api_urls
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

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], url_path='upload-file')
    def upload_file(self, request, slug=None):
        project = self.get_object()
        file_serializer = ProjectFileSerializer(data=request.data, context={'request': request})
        
        if file_serializer.is_valid():
            file_serializer.save(project=project)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectFileViewSet(viewsets.ModelViewSet):
    queryset = ProjectFile.objects.all()
    serializer_class = ProjectFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(project__user=self.request.user)

    def perform_create(self, serializer):
        project = get_object_or_404(Project, slug=self.kwargs.get('project_slug'), user=self.request.user)
        serializer.save(project=project)

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'slug']

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

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