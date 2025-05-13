from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TagViewSet, TodoTaskViewSet, TaskCommentViewSet, TaskAttachmentViewSet, HomeView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'tasks', TodoTaskViewSet, basename='task')
router.register(r'comments', TaskCommentViewSet, basename='comment')
router.register(r'attachments', TaskAttachmentViewSet, basename='attachment')

urlpatterns = [
    path('', HomeView.as_view(), name='home'),

    path('api/', include(router.urls)),
]