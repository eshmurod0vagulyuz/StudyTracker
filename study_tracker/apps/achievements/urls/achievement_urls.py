from rest_framework.routers import DefaultRouter
from apps.achievements.views.achievement_view import AchievementViewSet

router = DefaultRouter()
router.register(r"", AchievementViewSet, basename="achievements")

urlpatterns = router.urls
