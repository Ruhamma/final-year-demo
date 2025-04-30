from django.urls import path
from .views import SmartRecommendationView
app_name = 'recommendations'

urlpatterns = [
    path('', SmartRecommendationView.as_view(), name='smart-recommendation'),
]
