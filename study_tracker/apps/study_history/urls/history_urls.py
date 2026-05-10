from rest_framework.routers import DefaultRouter
from apps.study_history.views.history_view import StudyHistoryViewSet

router = DefaultRouter()
router.register(r"", StudyHistoryViewSet, basename="study-history")

urlpatterns = router.urls
