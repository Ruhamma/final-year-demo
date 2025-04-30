from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from .models import CustomUser, Role
from django.contrib.auth import authenticate
from artist.models import ArtistProfile


class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')

class CustomUserSerializers(ModelSerializer):
    role = RoleSerializer(read_only=True)
    class Meta:
        model=CustomUser
        fields=("id","email",'username','role','is_active','createdAt')
        read_only_fields = ("role",)
        

class UserRegisterSerializer(ModelSerializer):
    role = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role_name = validated_data.pop('role')
        try:
            role = Role.objects.get(name=role_name)
        except Role.DoesNotExist:
            raise serializers.ValidationError(f"Role '{role_name}' does not exist.")
        
        user = CustomUser.objects.create_user(**validated_data)
        user.role = role
        user.save()

        if role.name == Role.SELLER:
            ArtistProfile.objects.create(user=user)

        return user

class UpdateUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "first_name", "last_name", "email", "phone_number", "profile_picture")
        extra_kwargs = {
            "email": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
            "username": {"required": False},
            "phone_number": {"required": False},
            "profile_picture": {"required": False},
        }

class LoginUserSerializer(Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")
