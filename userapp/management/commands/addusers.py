from django.core.management.base import BaseCommand

from userapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User.objects.create_user(
            username="superuser", email="superuser@mail,ru", password="s1", is_superuser=True, is_staff=True
        )
        for i in range(1, 5):
            User.objects.create_user(username=f"user_{i}", email=f"user{i}@mail,ru", password=f"u{i}")
