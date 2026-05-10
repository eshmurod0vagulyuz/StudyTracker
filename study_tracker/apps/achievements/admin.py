from django.contrib import admin
from apps.achievements.models.achievement import Achievement, UserAchievement


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ["title", "achievement_type", "required_count"]
    list_filter = ["achievement_type"]


@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ["user", "achievement", "earned_at"]
    list_filter = ["achievement"]
