from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from apps.tasks.models.task import Task
from apps.tasks.serializers.task_serializer import TaskSerializer
from apps.tasks.filters.task_filters import TaskFilter
from apps.users.services.user_service import update_user_completion
from apps.achievements.services.achievement_service import check_and_award_achievements


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filterset_class = TaskFilter

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
        update_user_completion(self.request.user)

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        task = self.get_object()
        if task.status == "completed":
            return Response({"success": False, "message": "Task already completed"}, status=400)
        task.status = "completed"
        task.completed_at = timezone.now()
        task.save()
        update_user_completion(request.user)
        check_and_award_achievements(request.user)
        return Response({"success": True, "message": "Task completed"})
