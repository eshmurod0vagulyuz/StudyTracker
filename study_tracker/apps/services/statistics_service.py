from django.db.models import Sum, Count, Q
from apps.tasks.models.task import Task
from apps.study_history.models.history import StudyHistory


def get_weekly_stats(user):
    from django.utils import timezone
    today = timezone.now().date()
    week_start = today - timezone.timedelta(days=today.weekday())

    weekly_tasks = Task.objects.filter(user=user, created_at__date__gte=week_start)
    weekly_study = StudyHistory.objects.filter(user=user, studied_at__gte=week_start)

    return {
        "weekly_tasks_total": weekly_tasks.count(),
        "weekly_tasks_completed": weekly_tasks.filter(status="completed").count(),
        "weekly_study_minutes": weekly_study.aggregate(total=Sum("duration_minutes"))["total"] or 0,
    }
