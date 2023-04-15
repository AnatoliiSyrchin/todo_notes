from django.shortcuts import get_object_or_404
from rest_framework import mixins, permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .filters import ProjectFilter, TODOFilter
from .models import TODO, Project
from .serializers import (
    ProjectModelListSerializer,
    ProjectModelSerializer,
    TODOModelListSerializer,
    TODOModelSerializer,
)


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    # serializer_class = ProjectModelListSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return ProjectModelListSerializer
        return ProjectModelSerializer


class TODOCustomViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet
):
    queryset = TODO.objects.all()
    # serializer_class = TODOModelListSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_class = TODOFilter
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return TODOModelListSerializer
        return TODOModelSerializer

    def destroy(self, request, pk=None):
        todo = get_object_or_404(TODO, pk=pk)
        serializer = TODOModelSerializer(todo, data={"is_active": False}, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_destroy(serializer)
        return Response(serializer.data)

    def perform_destroy(self, serializer):
        serializer.save()
