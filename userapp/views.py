from rest_framework import mixins, viewsets

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerFull


class UserCustomViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == "1.2":
            return UserModelSerializerFull
        return UserModelSerializer
