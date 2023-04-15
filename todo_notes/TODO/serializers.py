from rest_framework.serializers import ModelSerializer
from userapp.serializers import UserModelSerializer

from .models import TODO, Project


class ProjectModelListSerializer(ModelSerializer):
    users = UserModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class TODOModelListSerializer(ModelSerializer):
    user = UserModelSerializer(read_only=True)

    class Meta:
        model = TODO
        fields = "__all__"


class TODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = "__all__"
