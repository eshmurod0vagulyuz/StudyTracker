from rest_framework.routers import DefaultRouter
from apps.tasks.views import TaskViewSet, SubjectViewSet

router = DefaultRouter()
router.register(r"tasks", TaskViewSet, basename="tasks")
router.register(r"subjects", SubjectViewSet, basename="subjects")

urlpatterns = router.urls
