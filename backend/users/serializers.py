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
        fields=("id","email",'username','role')
        

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

class LoginUserSerializer(Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")

