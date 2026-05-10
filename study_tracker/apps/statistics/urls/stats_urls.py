from django.urls import path
from apps.statistics.views.dashboard_view import DashboardView, WeeklyStatsView, OverdueTasksView, UpcomingTasksView

urlpatterns = [
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("weekly/", WeeklyStatsView.as_view(), name="weekly-stats"),
    path("overdue/", OverdueTasksView.as_view(), name="overdue-tasks"),
    path("upcoming/", UpcomingTasksView.as_view(), name="upcoming-tasks"),
]
