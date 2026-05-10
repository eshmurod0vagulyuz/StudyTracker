from rest_framework import serializers
from apps.tasks.serializers.subject_serializer import SubjectSerializer
from apps.tasks.models.task import Task
from apps.tasks.models.subject import Subject


class TaskSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        write_only=True,
        source="subject",
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "subject",
            "subject_id",
            "description",
            "deadline",
            "priority",
            "status",
            "completed_at",
            "created_at",
            "updated_at",
            "user",
        ]
        read_only_fields = ("user", "created_at", "updated_at", "completed_at")
