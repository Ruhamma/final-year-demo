from django.urls import path
from .views import UserInfoView, UserRegisterView, LoginView, LogoutView, CookieTokenRefreshView, ChangePasswordView, DeleteAccountView

app_name = 'users'

urlpatterns = [
    path('me/', UserInfoView.as_view(), name='me'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
]
