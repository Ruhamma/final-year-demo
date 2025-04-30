from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.utils import timezone
import uuid

class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    USERNAME_FIELD="email"
    email= models.EmailField(unique=True)
    REQUIRED_FIELDS=[]

    createdAt = models.DateTimeField(default=timezone.now)
    updatedAt = models.DateTimeField(auto_now=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    
    objects = CustomUserManager()

    def has_role(self, role_name):
        return self.role and self.role.name == role_name
    
    def is_admin(self):
        return self.has_role(Role.ADMIN)
    
    def is_seller(self):
        return self.has_role(Role.SELLER)
    
    def is_buyer(self):
        return self.has_role(Role.BUYER)
    
