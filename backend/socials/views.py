from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Follow
from .serializers import FollowSerializer
from artist.models import ArtistProfile
from notifications.models import Notification



class FollowArtistView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FollowSerializer

    def perform_create(self, serializer):
        artist_profile = ArtistProfile.objects.get(pk=self.kwargs['artist_id'])
        serializer.save(follower=self.request.user, following=artist_profile)

        Notification.objects.create(
        user=artist_profile.user,
        message=f"{self.request.user.username} started following you!"
        )

class UnfollowArtistView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = 'following'

    def get_queryset(self):
        return Follow.objects.filter(follower=self.request.user)

class ListFollowingArtistsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FollowSerializer

    def get_queryset(self):
        return Follow.objects.filter(follower=self.request.user)
