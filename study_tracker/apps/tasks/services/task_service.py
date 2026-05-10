from apps.tasks.models.task import Task

def calculate_task_completion(user):
    tasks = Task.objects.filter(user=user)
    total = tasks.count()
    completed = tasks.filter(status="completed").count()
    return completed, total
