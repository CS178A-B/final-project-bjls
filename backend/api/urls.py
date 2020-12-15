from django.urls import path
from .views import current_user, UserList
from rest_framework_jwt.views import obtain_jwt_token

app_name = 'api'

urlpatterns = [
    path('api/user/', UserList.as_view(), name='api_user'),
    path('api/current_user', current_user),
    path('api/token-auth/', obtain_jwt_token)
]
