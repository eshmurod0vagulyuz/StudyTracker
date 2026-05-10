from django.urls import path, include
from . import stats_urls

urlpatterns = [
    path('', include('apps.statistics.urls.stats_urls')),
]