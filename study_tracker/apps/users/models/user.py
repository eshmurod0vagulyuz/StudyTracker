from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    streak = models.PositiveIntegerField(default=0)
    best_streak = models.PositiveIntegerField(default=0)
    completion_rate = models.FloatField(default=0.0)

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
