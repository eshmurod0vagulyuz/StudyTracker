from django.urls import path, include
from . import history_urls

urlpatterns = [
    path("", include("apps.study_history.urls.history_urls")),
]
