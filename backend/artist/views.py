from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from .serializers import ArtistDashboardSerializer, ArtistProfileSerializer, ChangePasswordSerializer, ChangeEmailSerializer, ArtistProfileUpdateSerializer
from .models import ArtistProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from django.db.models import Count

class ArtistProfileView(RetrieveAPIView):
    serializer_class = ArtistProfileSerializer
    permission_classes = (IsAuthenticated,)


    def get_object(self):
        try:
            return ArtistProfile.objects.get(user=self.request.user)
        except ArtistProfile.DoesNotExist:
            raise NotFound("Artist profile not found")
    
class ArtistDashboardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if not user.is_seller():
            return Response({"error": "User is not a seller"}, status=status.HTTP_403_FORBIDDEN)

        try:
           profile = ArtistProfile.objects.get(user=user)
        except ArtistProfile.DoesNotExist:
           return Response({"error": "Artist profile not found."}, status=status.HTTP_404_NOT_FOUND)
        artworks_summary = self.get_artworks_summary(user)
        orders_summary = self.get_orders_summary(user)
        analytics = self.get_analytics(user)
        messages = self.get_messages(user)
        payments = self.get_payments(user)

        serializer = ArtistDashboardSerializer({
            'user': user,
            'profile': profile,
            'artworks_summary': artworks_summary,
            'orders_summary': orders_summary,
            'analytics': analytics,
            'messages': messages,
            'payments': payments
        })
        return Response(serializer.data)

    def get_artworks_summary(self, user):
        return {
            "total_artworks": 0,
            "top_artworks": [],
            "message": "No artworks uploaded yet."
        }
    
    def get_orders_summary(self, user):
        return {
            "pending": 0,
            "processing": 0,
            "completed": 0,
            "cancelled": 0
        }

    def get_analytics(self, user):
        return {
            "total_sales": 0,
            "revenue": 0.0,
        }
    
    def get_messages(self, user):
        return {
            "unread_count": 0,
            "recent_messages": [],
            "message": "You have no new messages at the moment."
        }
    
    def get_payments(self, user):
        return {
            "total_earnings": 0.0,
            "pending": 0.0,
            "methods": []
        }
    
class ArtistProfileUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ArtistProfileUpdateSerializer

    def put(self, request):
        try:
            profile = ArtistProfile.objects.get(user=request.user)
        except ArtistProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

        serializer = ArtistProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

class ArtistDeactivateView(APIView):
    permission_classes = (IsAuthenticated,)


    def post(self, request, *args, **kwargs):
        try:
            profile = ArtistProfile.objects.get(user=request.user)
            profile.is_active = False
            profile.save()
            return Response({'message': 'Profile deactivated successfully.'}, status=status.HTTP_200_OK)
        except ArtistProfile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated,)


    def post(self, request, *args, **kwargs):
        serializer = ChangeEmailSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.email = serializer.validated_data['new_email']
            user.save()
            return Response({'message': 'Email updated successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({'error': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            update_session_auth_hash(request, user)  
            return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UploadProfilePictureView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        profile = ArtistProfile.objects.get(user=request.user)
        file = request.FILES.get('profile_picture')
        if file:
            profile.profile_picture = file
            profile.save()
            return Response({'message': 'Profile picture updated.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

class TopFollowedArtistsView(ListAPIView):
    serializer_class = ArtistProfileSerializer

    def get_queryset(self):
        return ArtistProfile.objects.annotate(
            follower_count=Count('followers')
        ).order_by('-follower_count')[:10]
