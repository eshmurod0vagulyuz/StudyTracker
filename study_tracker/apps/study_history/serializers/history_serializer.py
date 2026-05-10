from rest_framework import serializers
from apps.study_history.models.history import StudyHistory
from apps.tasks.serializers.subject_serializer import SubjectSerializer


class StudyHistorySerializer(serializers.ModelSerializer):
    subject_detail = SubjectSerializer(source="subject", read_only=True)

    class Meta:
        model = StudyHistory
        fields = ["id", "subject", "subject_detail", "duration_minutes", "studied_at", "notes", "created_at", "user"]
        read_only_fields = ("user", "created_at")
