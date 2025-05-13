from rest_framework import serializers
from .models import Category, TodoTask, Tag, TaskComment, TaskAttachment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'icon']

class TaskAttachmentSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    
    class Meta:
        model = TaskAttachment
        fields = ['id', 'file', 'uploaded_by', 'uploaded_at']
        read_only_fields = ['uploaded_by', 'uploaded_at']

class TaskCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = TaskComment
        fields = ['id', 'author', 'text', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']

class TodoTaskSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        many=True,
        required=False
    )
    user = UserSerializer(read_only=True)
    comments = TaskCommentSerializer(many=True, read_only=True)
    attachments = TaskAttachmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = TodoTask
        fields = [
            'id', 'title', 'description', 'completed', 'created_at', 'updated_at',
            'due_date', 'priority', 'category', 'category_id', 'tags', 'tag_ids',
            'user', 'comments', 'attachments'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        task = TodoTask.objects.create(**validated_data)
        task.tags.set(tags)
        return task

    def update(self, instance, validated_data):
        tags = validated_data.pop('tags', None)
        if tags is not None:
            instance.tags.set(tags)
        return super().update(instance, validated_data)

class TodoTaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTask
        fields = ['title', 'description', 'due_date', 'priority', 'category', 'tags']