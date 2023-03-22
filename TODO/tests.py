from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from TODO.models import Project
from TODO.views import TODOCustomViewSet
from userapp.models import User

file = open("tests_todo.log", "w")


class TestTODOViewSet(TestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        self.user = User.objects.create(username="user", email="user@mail.ru")
        self.project = Project.objects.create(name="project")

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


# status.HTTP_401_UNAUTHORIZED
