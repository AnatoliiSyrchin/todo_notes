from django.core.management.base import BaseCommand

from TODO.models import TODO, Project
from userapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Project.objects.all().delete()
        user_1 = User.objects.get(username="user_1")
        user_2 = User.objects.get(username="user_2")
        user_3 = User.objects.get(username="user_3")
        user_4 = User.objects.get(username="user_4")

        project_1 = Project.objects.create(name="Project 1", repository="project 1 repo")
        project_1.users.add(user_1, user_2)
        project_2 = Project.objects.create(name="Project 2", repository="project 2 repo")
        project_2.users.add(user_1, user_4)
        project_3 = Project.objects.create(name="Project 3")
        project_3.users.add(user_1)
        project_4 = Project.objects.create(name="Project 4")
        project_4.users.add(user_4)

        TODO.objects.create(text="todo_1_1_text", user=user_1, project=project_1, is_active=True)
        TODO.objects.create(text="todo_1_2_text", user=user_2, project=project_1, is_active=True)
        TODO.objects.create(text="todo_1_3_text", user=user_3, project=project_1, is_active=True)
        TODO.objects.create(text="todo_1_4_text", user=user_4, project=project_1, is_active=True)
        TODO.objects.create(text="todo_2_text", user=user_2, project=project_2, is_active=True)
        TODO.objects.create(text="todo_3_text", user=user_3, project=project_3, is_active=True)
