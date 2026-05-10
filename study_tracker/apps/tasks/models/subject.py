from django.db import models
from django.conf import settings

class Subject(models.Model):
    name = models.CharField(max_length=150)
    color = models.CharField(max_length=20, default="#00CC66")
    icon = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


