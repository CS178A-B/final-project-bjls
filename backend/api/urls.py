from django.urls import path
from django.conf.urls import url, include
from .views import current_user, UserViewSet, StudentViewSet, FacultyViewSet, \
    JobViewSet, CourseViewSet, CommentViewSet
from rest_framework_jwt.views import obtain_jwt_token

from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('user', UserViewSet)
router.register('student', StudentViewSet)
router.register('faculty', FacultyViewSet)
router.register('job', JobViewSet)
router.register('course', CourseViewSet)
router.register('comment', CommentViewSet)

app_name = 'api'

urlpatterns = [
    # path('user/', UserList.as_view(), name='api_user'),
    path('current_user/', current_user),
    path('token-auth/', obtain_jwt_token),
    url(r'', include(router.urls))

]
