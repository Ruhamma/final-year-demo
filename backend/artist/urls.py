from django.urls import path
from .views import ArtistDashboardView, ArtistProfileView, ArtistProfileUpdateView, ArtistDeactivateView, ChangePasswordView, ChangeEmailView, UploadProfilePictureView

urlpatterns = [
    path('dashboard/', ArtistDashboardView.as_view(), name='dashboard'),
    path('profile/', ArtistProfileView.as_view(), name='artist_profile'),  # GET
    path('profile/update/', ArtistProfileUpdateView.as_view(), name='artist_profile_update'),  # PUT/PATCH
    path('profile/deactivate/', ArtistDeactivateView.as_view(), name='artist_deactivate'),  # Optional
    path('profile/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('profile/change-email/', ChangeEmailView.as_view(), name='change_email'),
    path('profile/upload-picture/', UploadProfilePictureView.as_view(), name='upload_profile_picture'),

]

