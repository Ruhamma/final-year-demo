from django.urls import path
from .views import CartItemListCreateView, CartItemDeleteView, CheckoutView, OrderByStatusView
app_name = 'orders'

urlpatterns = [
    path('cart/', CartItemListCreateView.as_view(), name='cart-list-create'),
    path('cart/<uuid:pk>/', CartItemDeleteView.as_view(), name='cart-delete'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),   
    path('', OrderByStatusView.as_view(), name='orders-by-status'),
]
