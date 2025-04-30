from django.urls import path
from .views import FollowArtistView, UnfollowArtistView, ListFollowingArtistsView

urlpatterns = [
    path('follow/<uuid:artist_id>/', FollowArtistView.as_view(), name='follow-artist'),
    path('unfollow/<uuid:following>/', UnfollowArtistView.as_view(), name='unfollow-artist'),
    path('following/', ListFollowingArtistsView.as_view(), name='following-artists'),
]
