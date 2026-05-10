from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from apps.statistics.services.stats_service import get_dashboard_stats
from apps.statistics.serializers.stats_serializer import DashboardStatsSerializer
from apps.services.statistics_service import get_weekly_stats
from apps.services.task_service import get_overdue_tasks, get_upcoming_tasks
from apps.tasks.serializers.task_serializer import TaskSerializer


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats = get_dashboard_stats(request.user)
        serializer = DashboardStatsSerializer(stats)
        return Response({"success": True, "data": serializer.data})


class WeeklyStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = get_weekly_stats(request.user)
        return Response({"success": True, "data": data})


class OverdueTasksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        tasks = get_overdue_tasks(request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response({"success": True, "data": serializer.data})


class UpcomingTasksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        tasks = get_upcoming_tasks(request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response({"success": True, "data": serializer.data})
