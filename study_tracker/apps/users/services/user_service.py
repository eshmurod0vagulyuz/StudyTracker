from apps.tasks.models.task import Task


def update_user_completion(user):
    tasks = Task.objects.filter(user=user)
    total = tasks.count()
    completed = tasks.filter(status="completed").count()
    user.completion_rate = round((completed / total) * 100, 1) if total > 0 else 0.0
    user.save(update_fields=["completion_rate"])
