from apps.achievements.models.achievement import Achievement, UserAchievement


def check_and_award_achievements(user):
    from apps.tasks.models.task import Task
    completed_count = Task.objects.filter(user=user, status="completed").count()

    achievements = Achievement.objects.filter(achievement_type="task_count")
    for achievement in achievements:
        if completed_count >= achievement.required_count:
            UserAchievement.objects.get_or_create(user=user, achievement=achievement)

    streak_achievements = Achievement.objects.filter(achievement_type="streak")
    for achievement in streak_achievements:
        if user.streak >= achievement.required_count:
            UserAchievement.objects.get_or_create(user=user, achievement=achievement)
