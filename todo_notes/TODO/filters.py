from django_filters import rest_framework as drf_filters
from django_filters.widgets import RangeWidget

from .models import TODO, Project


class ProjectFilter(drf_filters.FilterSet):
    name = drf_filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]


class TODOFilter(drf_filters.FilterSet):
    created_at = drf_filters.IsoDateTimeFromToRangeFilter(widget=RangeWidget(attrs={"type": "datetime-local"}))

    class Meta:
        model = TODO
        fields = ["project", "created_at"]
