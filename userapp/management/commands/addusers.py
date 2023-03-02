from django.core.management.base import BaseCommand

from userapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User.objects.all().delete()
        User.objects.create_user(
            username="superuser",
            first_name="su first name",
            last_name="su last name",
            email="su@mail.ru",
            password="su1",
            is_superuser=True,
            is_staff=True,
        )
        for i in range(1, 5):
            User.objects.create_user(
                username=f"user_{i}",
                first_name=f"u{i} first name",
                last_name=f"u{i} last name",
                email=f"user{i}@mail.ru",
                password=f"u{i}",
            )
