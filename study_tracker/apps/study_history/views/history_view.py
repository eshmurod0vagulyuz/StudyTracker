from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.study_history.models.history import StudyHistory
from apps.study_history.serializers.history_serializer import StudyHistorySerializer
from apps.study_history.services.history_service import get_study_time_by_subject
from apps.services.streak_service import update_streak


class StudyHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = StudyHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StudyHistory.objects.filter(user=self.request.user).select_related("subject")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        update_streak(self.request.user)

    @action(detail=False, methods=["get"])
    def by_subject(self, request):
        data = get_study_time_by_subject(request.user)
        return Response({"success": True, "data": data})
