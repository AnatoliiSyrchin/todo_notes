from django.db import models
from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    repository = models.URLField(blank=True, null=True)
    users = models.ManyToManyField(User)

    def __str__(self) -> str:
        return f"{self.name}"


class TODO(models.Model):
    IS_ACTIVE_CHOICES = ((True, "Yes"), (False, "No"))

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    edited_at = models.DateTimeField(auto_now=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(choices=IS_ACTIVE_CHOICES)

    def __str__(self) -> str:
        return f"{self.project} {self.text[:10]}"
