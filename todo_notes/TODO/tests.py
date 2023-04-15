from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate
from TODO.models import TODO, Project
from TODO.views import TODOCustomViewSet
from userapp.models import User

file = open("tests_todo.log", "w")


class TestTODOViewSet(TestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        self.user = User.objects.create(username="user", email="user@mail.ru", password="u1")
        self.project = mixer.blend(Project)
        self.todo = mixer.blend(TODO, user__username="user2")

    def test_todo_create_admin(self):
        factory = APIRequestFactory()
        data = {
            "project": 1,
            "text": "test_text",
            "user": 2,
            "is_active": True,
        }
        request = factory.post("/api/todo/", data, format="json")
        force_authenticate(request, self.admin)
        view = TODOCustomViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_todo_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/todo/")
        view = TODOCustomViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_todo_get_guest(self):
        client = APIClient()
        response = client.get(f"/api/todo/1/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_todo_put_admin(self):
        client = APIClient()
        client.login(username="admin", password="admin123456")
        response = client.put(
            f"/api/todo/{self.todo.id}/",
            {
                "project": 1,
                "text": "new_text",
                "user": 3,
                "is_active": True,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_todo = TODO.objects.get(id=self.todo.id)
        self.assertEqual(new_todo.user.username, "user2")
        self.assertEqual(new_todo.text, "new_text")
        client.logout()


class TestProjectViewSet(APITestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        self.user_1 = mixer.blend(User)
        self.user_2 = mixer.blend(User)
        self.project = mixer.blend(Project)

    def test_get_projects_list(self):
        response = self.client.get(f"/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_edit_admin(self):
        self.client.login(username="admin", password="admin123456")
        response = self.client.put(
            f"/api/projects/{self.project.id}/",
            {
                "name": "new project",
                "users": [
                    self.user_1.id,
                    self.user_2.id,
                ],
            },
        )
        print(response, file=file)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_project = Project.objects.get(id=self.project.id)
        self.assertEqual(new_project.name, "new project")


# status.HTTP_301_MOVED_PERMANENTLY
