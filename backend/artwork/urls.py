# artwork/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('my-artworks/', views.ArtworkListCreateView.as_view(), name='artwork_list_create'),
    path('artwork-detail/<uuid:pk>/', views.ArtworkInfoView.as_view(), name='artwork_info'),
    path('my-artworks/<uuid:pk>/delete/', views.ArtworkDeleteView.as_view(), name='artwork_delete'),
    path('artworks/', views.PublicArtworkListView.as_view(), name='public_artwork_list'),
    path('artworks/<uuid:pk>/', views.PublicArtworkDetailView.as_view(), name='public_artwork_detail'),
    path('metadata/', views.AllMetadataView.as_view(), name='all_metadata'),
    path('wishlist/', views.FavoriteArtworkView.as_view(), name='favorite_artwork'),
    path('wishlist/<uuid:pk>/', views.FavoriteArtworkDeleteView.as_view(), name='favorite_artwork_delete'),
    path('top-favorited/', views.TopFavoritedArtworksView.as_view(), name='top-favorited-artworks'),
    path('top-viewed/', views.TopViewedArtworksView.as_view(), name='top-viewed-artworks'),
    path('recently-viewed/', views.RecentlyViewedArtworksView.as_view(), name='recently-viewed-artworks'),
]

