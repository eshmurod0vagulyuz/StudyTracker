from rest_framework import serializers


class DashboardStatsSerializer(serializers.Serializer):
    total_tasks = serializers.IntegerField()
    completed_tasks = serializers.IntegerField()
    active_tasks = serializers.IntegerField()
    completion_rate = serializers.FloatField()
    streak = serializers.IntegerField()
    best_streak = serializers.IntegerField()
    total_study_minutes = serializers.IntegerField()
    tasks_by_subject = serializers.ListField()
    tasks_by_priority = serializers.DictField()
