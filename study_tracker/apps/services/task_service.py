from apps.tasks.models.task import Task


def get_overdue_tasks(user):
    from django.utils import timezone
    today = timezone.now().date()
    return Task.objects.filter(user=user, status="active", deadline__lt=today).order_by("deadline")


def get_upcoming_tasks(user, days=7):
    from django.utils import timezone
    today = timezone.now().date()
    upcoming = today + timezone.timedelta(days=days)
    return Task.objects.filter(user=user, status="active", deadline__range=(today, upcoming)).order_by("deadline")
