from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProjectFileViewSet, ProjectViewSet, TagViewSet, TodoTaskViewSet, TaskCommentViewSet, TaskAttachmentViewSet, HomeView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'tasks', TodoTaskViewSet, basename='task')
router.register(r'comments', TaskCommentViewSet, basename='comment')
router.register(r'attachments', TaskAttachmentViewSet, basename='attachment')
router.register(r'projects', ProjectViewSet, basename='project')

projects_router = DefaultRouter()
projects_router.register(r'files', ProjectFileViewSet, basename='project-file')

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('api/', include(router.urls)),
    path('projects/<slug:project_slug>/', include(projects_router.urls)),
]