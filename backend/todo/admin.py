from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Category, TodoTask, Tag, TaskComment, TaskAttachment
from django.utils.html import format_html

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('colored_name', 'color', 'icon', 'user')
    list_filter = ('user',)
    search_fields = ('name',)
    fieldsets = (
        (None, {'fields': ('name', 'user')}),
        (_('Внешний вид'), {'fields': ('color', 'icon')}),
    )

    def colored_name(self, obj):
        return format_html(
            '<span style="color: {};">{}</span>',
            obj.color,
            obj.name
        )

class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    list_filter = ('user',)
    search_fields = ('name',)

class TaskCommentInline(admin.TabularInline):
    model = TaskComment
    extra = 0
    fields = ('author', 'text', 'created_at')
    readonly_fields = ('created_at',)

class TaskAttachmentInline(admin.TabularInline):
    model = TaskAttachment
    extra = 0
    fields = ('file', 'uploaded_by', 'uploaded_at')
    readonly_fields = ('uploaded_at',)

class TodoTaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'priority', 'completed', 'due_date')
    list_filter = ('completed', 'priority', 'category', 'user')
    search_fields = ('title', 'description')
    date_hierarchy = 'due_date'
    inlines = [TaskCommentInline, TaskAttachmentInline]
    fieldsets = (
        (None, {'fields': ('title', 'description', 'user')}),
        (_('Статус'), {'fields': ('completed', 'priority')}),
        (_('Детали'), {'fields': ('category', 'tags', 'due_date')}),
        (_('Даты'), {'fields': ('created_at', 'updated_at')}),
    )
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('tags',)

class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ('task', 'author', 'created_at', 'short_text')
    list_filter = ('author', 'created_at')
    search_fields = ('text', 'task__title')
    date_hierarchy = 'created_at'
    
    def short_text(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    short_text.short_description = _('Текст')

class TaskAttachmentAdmin(admin.ModelAdmin):
    list_display = ('task', 'uploaded_by', 'uploaded_at', 'file')
    list_filter = ('uploaded_by', 'uploaded_at')
    search_fields = ('task__title', 'file')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(TodoTask, TodoTaskAdmin)
admin.site.register(TaskComment, TaskCommentAdmin)
admin.site.register(TaskAttachment, TaskAttachmentAdmin)