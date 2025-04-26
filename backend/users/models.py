from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class Role(models.Model):
    ADMIN = 'ADMIN'
    SELLER = 'SELLER'
    BUYER = 'BUYER'
    
    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (SELLER, 'Seller'),
        (BUYER, 'Buyer'),
    ]
    
    name = models.CharField(max_length=50, choices=ROLE_CHOICES, unique=True)
    permissions = models.JSONField(default=dict)  
    
    def __str__(self):
        return self.name
    

class CustomUser(AbstractUser):
    USERNAME_FIELD="email"
    email= models.EmailField(unique=True)
    REQUIRED_FIELDS=[]

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    
    objects = CustomUserManager()

    def has_role(self, role_name):
        return self.role and self.role.name == role_name
    
    def is_admin(self):
        return self.has_role(Role.ADMIN)
    
    def is_seller(self):
        return self.has_role(Role.SELLER)
    
    def is_buyer(self):
        return self.has_role(Role.BUYER)
    
