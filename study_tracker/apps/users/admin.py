from django.contrib import admin
from apps.users.models.user import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "streak", "best_streak", "completion_rate")
    search_fields = ("username", "email")
    list_filter = ("is_staff", "is_superuser")
