from django.contrib import admin

# Register your models here.
from .models import CartItem, Order

admin.site.register(CartItem)
admin.site.register(Order)

