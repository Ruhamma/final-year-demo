from django.urls import path
from .views import ArtistDashboardView, ArtistProfileView, ArtistProfileUpdateView, ArtistDeactivateView, ChangePasswordView, ChangeEmailView, UploadProfilePictureView, TopFollowedArtistsView

urlpatterns = [
    path('dashboard/', ArtistDashboardView.as_view(), name='dashboard'),
    path('profile/', ArtistProfileView.as_view(), name='artist_profile'),  
    path('profile/update/', ArtistProfileUpdateView.as_view(), name='artist_profile_update'),  
    path('profile/deactivate/', ArtistDeactivateView.as_view(), name='artist_deactivate'),  
    path('profile/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('profile/change-email/', ChangeEmailView.as_view(), name='change_email'),
    path('profile/upload-picture/', UploadProfilePictureView.as_view(), name='upload_profile_picture'),
    path('top-followed/', TopFollowedArtistsView.as_view(), name='top-followed-artists'),

]

