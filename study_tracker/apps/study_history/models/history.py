from django.db import models
from django.conf import settings
from apps.tasks.models.subject import Subject


class StudyHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="study_history")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="study_history")
    duration_minutes = models.PositiveIntegerField()
    studied_at = models.DateField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-studied_at"]

    def __str__(self):
        return f"{self.user.username} - {self.subject.name} - {self.studied_at}"
