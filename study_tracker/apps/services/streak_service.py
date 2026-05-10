from django.utils import timezone
from apps.study_history.models.history import StudyHistory


def update_streak(user):
    today = timezone.now().date()
    yesterday = today - timezone.timedelta(days=1)

    studied_today = StudyHistory.objects.filter(user=user, studied_at=today).exists()
    studied_yesterday = StudyHistory.objects.filter(user=user, studied_at=yesterday).exists()

    if studied_today:
        if not studied_yesterday and user.streak == 0:
            user.streak = 1
        elif studied_yesterday:
            user.streak += 1
        if user.streak > user.best_streak:
            user.best_streak = user.streak
    else:
        user.streak = 0

    user.save(update_fields=["streak", "best_streak"])
