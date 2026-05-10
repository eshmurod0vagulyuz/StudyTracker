from django.db.models import Sum, Count, Q
from apps.tasks.models.task import Task
from apps.study_history.models.history import StudyHistory


def get_dashboard_stats(user):
    tasks = Task.objects.filter(user=user)
    total_tasks = tasks.count()
    completed_tasks = tasks.filter(status="completed").count()
    active_tasks = tasks.filter(status="active").count()

    tasks_by_subject = list(
        tasks.values("subject__name", "subject__color")
        .annotate(
            count=Count("id"),
            completed=Count("id", filter=Q(status="completed"))
        )
    )

    tasks_by_priority = {
        "low": tasks.filter(priority="low").count(),
        "medium": tasks.filter(priority="medium").count(),
        "high": tasks.filter(priority="high").count(),
    }

    total_study_minutes = StudyHistory.objects.filter(user=user).aggregate(
        total=Sum("duration_minutes")
    )["total"] or 0

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "active_tasks": active_tasks,
        "completion_rate": user.completion_rate,
        "streak": user.streak,
        "best_streak": user.best_streak,
        "total_study_minutes": total_study_minutes,
        "tasks_by_subject": tasks_by_subject,
        "tasks_by_priority": tasks_by_priority,
    }
