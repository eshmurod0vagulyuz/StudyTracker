from apps.shared.health import health_check
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title="Study Tracker API",
        default_version="v1",
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
path("api/health/", health_check, name="health_check"),
    path("api/users/", include("apps.users.urls")),
    path("api/tasks/", include("apps.tasks.urls")),
    path("api/statistics/", include("apps.statistics.urls")),
    path("api/achievements/", include("apps.achievements.urls")),
    path("api/history/", include("apps.study_history.urls")),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0)),
]
