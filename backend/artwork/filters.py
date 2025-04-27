import django_filters
from .models import Artwork

class ArtworkFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    category = django_filters.CharFilter(lookup_expr='icontains')
    medium = django_filters.CharFilter(lookup_expr='icontains')
    style = django_filters.CharFilter(lookup_expr='icontains')
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Artwork
        fields = ['title', 'category', 'medium', 'style', 'min_price', 'max_price']
