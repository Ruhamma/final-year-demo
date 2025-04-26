from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Artwork
from .serializers import ArtworkSerializer

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
        serializer.save(artist=self.request.user.artistprofile)

class ArtworkDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ArtworkSerializer

    def get_object(self):
        return Artwork.objects.get(pk=self.kwargs['pk'], artist=self.request.user.artistprofile)

