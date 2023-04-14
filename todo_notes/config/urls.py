"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view as get_drf_schema
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from TODO.views import ProjectModelViewSet, TODOCustomViewSet
from userapp.views import UserCustomViewSet

schema_view = get_schema_view(
    openapi.Info(
        title="TODO notes",
        default_version="1.1",
        description="Documentation for our project",
        contact=openapi.Contact(email="admin@admin.ru"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

router = DefaultRouter()
router.register("users", UserCustomViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", TODOCustomViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api/", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("api/<str:version>/users/", UserCustomViewSet.as_view({"get": "list"}), name="users_version"),
    # path("api/1.1/users/", include("userapp.urls", namespace="1.1")),
    # path("api/1.2/users/", include("userapp.urls", namespace="1.2")),
    path(
        "openapi",
        get_drf_schema(title="TODO project", description="Documentation for our project", version="1.2"),
        name="openapi-schema",
    ),
    path("swagger<str:format>", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path(
        "redoc/",
        TemplateView.as_view(template_name="redoc.html", extra_context={"schema_url": "openapi-schema"}),
        name="redoc",
    ),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
    # path("", TemplateView.as_view(template_name="index.html")),
]
