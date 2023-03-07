from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import TODO, Project
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TODOCustomViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet
):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer

    def destroy(self, request, pk=None):
        todo = get_object_or_404(TODO, pk=pk)
        serializer = TODOModelSerializer(todo, data={"is_active": False}, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_destroy(serializer)
        return Response(serializer.data)

    def perform_destroy(self, serializer):
        serializer.save()
