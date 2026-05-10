from rest_framework import serializers
from apps.tasks.models.subject import Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "name", "color", "icon", "user"]
        read_only_fields = ("user",)


