from rest_framework import generics
from .models import CartItem
from .serializers import CartItemSerializer, OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, CartItem
from rest_framework.permissions import IsAuthenticated


class CartItemListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartItemDeleteView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

class CheckoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        total_price = sum(item.artwork.price for item in cart_items)

        order = Order.objects.create(user=user, total_price=total_price)

        for item in cart_items:
            order.artworks.add(item.artwork)
            item.delete()  

        return Response({"message": "Order placed successfully!"}, status=status.HTTP_201_CREATED)
    
class OrderListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
class OrderByStatusView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        status_filter = self.request.query_params.get('status')
        qs = Order.objects.filter(user=self.request.user)
        if status_filter:
            qs = qs.filter(status=status_filter)
        return qs
