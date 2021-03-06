from django.urls import path
from .views import LoginView, DashboardView, SettingsView, DeleteView, RegisterStudentView
# from .views import LoginView, DashboardView, SettingsView, DeleteView, IndexView, RegisterStudentView
from django.contrib.auth.views import LogoutView, PasswordResetView, PasswordResetDoneView, PasswordResetCompleteView, PasswordResetConfirmView
from django.shortcuts import reverse
app_name = 'account'

urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('register-student/', RegisterStudentView.as_view(), name='register_student'),
    # path('register-faculty/', RegisterFacultyView.as_view(), name='register_faculty'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password-reset/', PasswordResetView.as_view(success_url='/password-reset-done'), name='password_reset'),
    path('password-reset-done/', PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(success_url='/password-reset-complete'), name='password_reset_confirm'),
    path('password-reset-complete/', PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('settings/', SettingsView.as_view(), name='settings'),
    # path('update-student/', StudentUpdateView.as_view(), name='update_student'),
    # path('update-faculty/', FacultyUpdateView.as_view(), name='update_faculty'),
    path('delete/', DeleteView.as_view(), name='delete'),
    # path('index/', IndexView.as_view(), name='index')
]

