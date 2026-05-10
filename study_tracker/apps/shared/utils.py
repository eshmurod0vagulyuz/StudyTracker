from django.utils import timezone


def get_today():
    return timezone.now().date()


def minutes_to_hours_str(minutes):
    hours = minutes // 60
    mins = minutes % 60
    if hours > 0:
        return f"{hours}h {mins}m"
    return f"{mins}m"


def get_week_range():
    today = get_today()
    week_start = today - timezone.timedelta(days=today.weekday())
    week_end = week_start + timezone.timedelta(days=6)
    return week_start, week_end
