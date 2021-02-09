from django.urls import path
from .views import current_user, UserList, StudentList, FacultyList, JobList, CourseList
from rest_framework_jwt.views import obtain_jwt_token

app_name = 'api'

urlpatterns = [
    path('api/user/', UserList.as_view(), name='api_user'),
    path('api/current_user/', current_user),
    path('api/token-auth/', obtain_jwt_token),
    path('api/student/', StudentList.as_view(), name='api_student'),
    path('api/faculty/', FacultyList.as_view(), name='api_faculty'),
    path('api/course/', CourseList.as_view(), name='api_course'),
    path('api/job/', JobList.as_view(), name='api_job')
]
