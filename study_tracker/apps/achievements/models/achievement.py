from django.db import models
from django.conf import settings


class Achievement(models.Model):
    ACHIEVEMENT_TYPES = [
        ("task_count", "Task Count"),
        ("streak", "Streak"),
        ("consistency", "Consistency"),
        ("weekly_goal", "Weekly Goal"),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    badge_icon = models.CharField(max_length=100)
    required_count = models.PositiveIntegerField()
    achievement_type = models.CharField(max_length=30, choices=ACHIEVEMENT_TYPES)

    def __str__(self):
        return self.title


class UserAchievement(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="achievements")
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "achievement")

    def __str__(self):
        return f"{self.user.username} - {self.achievement.title}"
