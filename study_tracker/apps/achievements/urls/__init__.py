from django.urls import path, include
from . import achievement_urls

urlpatterns = [
    path("", include("apps.achievements.urls.achievement_urls")),
]
