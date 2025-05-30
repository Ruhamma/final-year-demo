from rest_framework import serializers
from .models import ArtistProfile
from users.serializers import CustomUserSerializers

class ArtistProfileSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()
    class Meta:
        model = ArtistProfile
        fields = ['first_name', 'last_name', 'bio', 'profile_picture', 'contact_email', 'phone_number', 'website', 'instagram', 'twitter', 'tiktok', 'facebook', 'youtube', 'is_active', 'location', 'follower_count']

    def get_follower_count(self, obj):
        return obj.followers.count()

class ArtistDashboardSerializer(serializers.Serializer):
    user = CustomUserSerializers()
    profile = ArtistProfileSerializer()
    artworks_summary = serializers.DictField()
    orders_summary = serializers.DictField()
    analytics = serializers.DictField()
    messages = serializers.ListField()
    payments = serializers.DictField()

class ArtistProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistProfile
        fields = ['first_name', 'last_name', 'bio', 'profile_picture', 'contact_email', 'phone_number', 'website', 'instagram', 'twitter', 'tiktok', 'facebook', 'youtube', 'is_active', 'location']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField(required=True)


