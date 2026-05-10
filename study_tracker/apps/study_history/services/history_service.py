from django.db.models import Sum
from apps.study_history.models.history import StudyHistory


def get_total_study_time(user):
    result = StudyHistory.objects.filter(user=user).aggregate(total=Sum("duration_minutes"))
    return result["total"] or 0


def get_study_time_by_subject(user):
    return list(
        StudyHistory.objects.filter(user=user)
        .values("subject__name", "subject__color")
        .annotate(total_minutes=Sum("duration_minutes"))
        .order_by("-total_minutes")
    )
