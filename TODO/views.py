from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .filters import ProjectFilter, TODOFilter
from .models import TODO, Project
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TODOCustomViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet
):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_class = TODOFilter

    def destroy(self, request, pk=None):
        todo = get_object_or_404(TODO, pk=pk)
        serializer = TODOModelSerializer(todo, data={"is_active": False}, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_destroy(serializer)
        return Response(serializer.data)

    def perform_destroy(self, serializer):
        serializer.save()
