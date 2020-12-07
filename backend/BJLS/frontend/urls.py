from django.urls import path
from . import views


urlpatterns = [
    path('react-test/', views.index ),
]