from django.contrib import admin
from apps.study_history.models.history import StudyHistory


@admin.register(StudyHistory)
class StudyHistoryAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "duration_minutes", "studied_at"]
    list_filter = ["studied_at", "subject"]
