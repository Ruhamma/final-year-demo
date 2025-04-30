from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, DestroyAPIView, UpdateAPIView,ListAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Artwork, ArtworkCategory, ArtworkMedium, ArtworkStyle, Tag, FavoriteArtwork, ArtworkView
from .serializers import ArtworkSerializer, ArtworkCategorySerializer, ArtworkMediumSerializer, ArtworkStyleSerializer, TagSerializer, FavoriteArtworkSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from .filters import ArtworkFilter
from django.db.models import Count

class ArtworkInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ArtworkSerializer

    def get_object(self):
        return Artwork.objects.get(pk=self.kwargs['pk'], artist=self.request.user.artistprofile)

class ArtworkListCreateView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        return Artwork.objects.filter(artist=self.request.user.artistprofile)

    def perform_create(self, serializer):
        serializer.save()

class ArtworkDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ArtworkSerializer

    def get_object(self):
        return Artwork.objects.get(pk=self.kwargs['pk'], artist=self.request.user.artistprofile)

class PublicArtworkListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ArtworkFilter
    search_fields = ['title', 'category', 'medium', 'style']
    ordering_fields = ['price', 'created_at']  

    def get_queryset(self):
        return Artwork.objects.all()
    
class PublicArtworkDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user.is_authenticated:
            already_viewed = ArtworkView.objects.filter(user=request.user, artwork=instance).exists()
            if not already_viewed:
                ArtworkView.objects.create(user=request.user, artwork=instance)
                instance.view_count += 1
                instance.save()

        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key

            already_viewed = ArtworkView.objects.filter(session_key=session_key, artwork=instance).exists()
            if not already_viewed:
                ArtworkView.objects.create(session_key=session_key, artwork=instance)
                instance.view_count += 1
                instance.save()

        return super().retrieve(request, *args, **kwargs)

class AllMetadataView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ArtworkCategorySerializer
    
    def get(self, request):
        data = {
            'categories': ArtworkCategorySerializer(ArtworkCategory.objects.all(), many=True).data,
            'mediums': ArtworkMediumSerializer(ArtworkMedium.objects.all(), many=True).data,
            'styles': ArtworkStyleSerializer(ArtworkStyle.objects.all(), many=True).data,
            'tags': TagSerializer(Tag.objects.all(), many=True).data
        }
        return Response(data)
    
class FavoriteArtworkView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FavoriteArtworkSerializer

    def get_queryset(self):
        return FavoriteArtwork.objects.filter(user=self.request.user.artistprofile)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user.artistprofile)


class FavoriteArtworkDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FavoriteArtworkSerializer
    
    def get_object(self):
        return FavoriteArtwork.objects.get(pk=self.kwargs['pk'], user=self.request.user.artistprofile)
    
    def perform_destroy(self, instance):
        instance.delete()



class TopFavoritedArtworksView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        return Artwork.objects.annotate(
            favorite_count=Count('favorited_by')
        ).order_by('-favorite_count')[:10]
    
class TopViewedArtworksView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        return Artwork.objects.order_by('-view_count')[:10]    
    
class RecentlyViewedArtworksView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        user = self.request.user
        viewed_artwork_ids = ArtworkView.objects.filter(user=user).order_by('-viewed_at').values_list('artwork_id', flat=True)
        return Artwork.objects.filter(id__in=viewed_artwork_ids).distinct()[:10]    