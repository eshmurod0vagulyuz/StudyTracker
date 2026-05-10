from rest_framework import viewsets
from apps.tasks.models.subject import Subject
from apps.tasks.serializers.subject_serializer import SubjectSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        return Subject.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
