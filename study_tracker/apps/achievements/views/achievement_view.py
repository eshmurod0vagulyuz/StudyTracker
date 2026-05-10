from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.achievements.models.achievement import Achievement, UserAchievement
from apps.achievements.serializers.achievement_serializer import AchievementSerializer, UserAchievementSerializer


class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Achievement.objects.all()

    @action(detail=False, methods=["get"])
    def my_achievements(self, request):
        user_achievements = UserAchievement.objects.filter(user=request.user).select_related("achievement")
        serializer = UserAchievementSerializer(user_achievements, many=True)
        return Response({"success": True, "data": serializer.data})
