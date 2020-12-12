from django.urls import path
from .views import UserList

app_name = 'api'

urlpatterns = [
    path('api/user/', UserList.as_view(), name='api_user')
]