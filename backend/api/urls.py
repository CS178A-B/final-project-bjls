from django.urls import path
from .views import UserList, JobList

app_name = 'api'

urlpatterns = [
    path('api/user/', UserList.as_view(), name='api_user'),
    path('api/job/', JobList.as_view(), name='api_job')
]