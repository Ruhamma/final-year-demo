from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UpdateUserSerializer, UserRegisterSerializer, LoginUserSerializer, CustomUserSerializers, ChangePasswordSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from .models import CustomUser
import string

class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CustomUserSerializers
        return UpdateUserSerializer
    
    def get_object(self):
        return self.request.user


class UserRegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer

    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            response = Response({
                "user": CustomUserSerializers(user).data},
                                status=status.HTTP_200_OK)
            
            response.set_cookie(key="access_token", 
                                value=access_token,
                                httponly=True,
                                secure=True,
                                samesite="None")
            
            response.set_cookie(key="refresh_token",
                                value=str(refresh),
                                httponly=True,
                                secure=True,
                                samesite="None")
            return response
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                refresh.blacklist()
            except Exception as e:
                return Response({"error":"Error invalidating token:" + str(e) }, status=status.HTTP_400_BAD_REQUEST)
        
        response = Response({"message": "Successfully logged out!"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        
        return response    

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request):
        
        refresh_token = request.COOKIES.get("refresh_token")
        
        if not refresh_token:
            return Response({"error":"Refresh token not provided"}, status= status.HTTP_401_UNAUTHORIZED)
    
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            
            response = Response({"message": "Access token token refreshed successfully"}, status=status.HTTP_200_OK)
            response.set_cookie(key="access_token", 
                                value=access_token,
                                httponly=True,
                                secure=True,
                                samesite="None")
            return response
        except InvalidToken:
            return Response({"error":"Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)        
    
class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            old_password = serializer.validated_data['old_password']
            if not user.check_password(old_password):
                return Response({"old_password": ["Incorrect password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            if len(serializer.validated_data['new_password']) < 8:
                return Response({"new_password": ["Password must be at least 8 characters long."]}, status=status.HTTP_400_BAD_REQUEST)
            if not any(char.isupper() for char in serializer.validated_data['new_password']):
                return Response({"new_password": ["Password must contain at least one uppercase letter."]}, status=status.HTTP_400_BAD_REQUEST)
            if not any(char.islower() for char in serializer.validated_data['new_password']):
                return Response({"new_password": ["Password must contain at least one lowercase letter."]}, status=status.HTTP_400_BAD_REQUEST)
            if not any(char in string.punctuation for char in serializer.validated_data['new_password']):
                return Response({"new_password": ["Password must contain at least one special character."]}, status=status.HTTP_400_BAD_REQUEST)
            
            
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteAccountView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        user.is_active = False
        user.save()
        return Response({"message": "Account deactivated successfully. It will be permanently deleted after 10 days."}, status=200)
    

        