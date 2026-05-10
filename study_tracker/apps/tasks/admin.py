from django.contrib import admin
from apps.tasks.models.task import Task
from apps.tasks.models.subject import Subject

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "subject", "priority", "status", "deadline", "user")
    search_fields = ("title", "description")
    list_filter = ("priority", "status", "subject")


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "color", "icon", "user")
    search_fields = ("name",)
