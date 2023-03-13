from rest_framework.serializers import ModelSerializer

from userapp.serializers import UserModelSerializer

from .models import TODO, Project


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = "__all__"


class TODOModelSerializer(ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = TODO
        fields = "__all__"
        # exclude = ['created_at', 'edited_at']
