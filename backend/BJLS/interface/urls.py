from django.urls import path
from .views import UserList
# from .views import LoginView, DashboardView, SettingsView, StudentUpdateView, DeleteView, IndexView, RegisterStudentView
from django.contrib.auth.views import LogoutView, PasswordResetView, PasswordResetDoneView, PasswordResetCompleteView, PasswordResetConfirmView
from django.shortcuts import reverse
app_name = 'interface'

urlpatterns = [
    path('api/user/', UserList.as_view(), name='api_user')
]
