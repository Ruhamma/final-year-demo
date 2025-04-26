# artwork/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('artworks/', views.ArtworkListCreateView.as_view(), name='artwork_list_create'),
    path('artworks/<int:pk>/', views.ArtworkInfoView.as_view(), name='artwork_info'),
    path('artworks/<int:pk>/delete/', views.ArtworkDeleteView.as_view(), name='artwork_delete'),
]
