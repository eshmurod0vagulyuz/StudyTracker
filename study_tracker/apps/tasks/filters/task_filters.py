import django_filters
from apps.tasks.models.task import Task

class TaskFilter(django_filters.FilterSet):
    class Meta:
        model = Task
        fields = {
            "status": ["exact"],
            "priority": ["exact"],
            "deadline": ["gte", "lte"],
        }
