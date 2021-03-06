from django.shortcuts import render

from account.models import User, Student, Faculty, Job, Course, Comment, Application, StudentCourse
from .serializers import UserSerializer, UserSerializerWithToken, StudentSerializer, FacultySerializer, \
    JobSerializer, CourseSerializer, CommentSerializer, StudentCourseSerializer, ApplicationSerializer
from rest_framework import generics, status, viewsets, permissions, filters

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User as AUser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView



from . import permissions as perm


# # Create your views here.
# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (perm.UpdateOwnProfile,)
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    filter_backends = (filters.SearchFilter,)
    search_fields = ('first_name', 'last_name', 'email')

    # def create(self, request, *args, **kwargs):
    #     user_data = request.data

    #     # ('id', 'token', 'first_name', 'last_name', 'username', 'password', 'email', 'is_student', 'is_faculty')
    #     # new_user = User.objects.create(
            
    #     # )
    #     if (user_data['is_student']):
    #         new_student = Student(user=new_user)


    # def perform_create(self,serializer):
    #     serializer.save(user=self.request.user)

# class UserList(APIView):
#     """
#     Create a new user. It's called 'UserList' because normally we'd have a get
#     method here too, for retrieving a list of all User objects.
#     """

#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         serializer = UserSerializerWithToken(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     def get(self, request, format=None):
#         data = {"hi" : "hello"}
#         return Response(data, status=status.HTTP_201_CREATED)
    



class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()

    serializer_class = StudentSerializer


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('student__user__first_name', 'student__user__last_name', 'student__user__email')

class StudentCourseViewSet(viewsets.ModelViewSet):
    queryset = StudentCourse.objects.all()
    serializer_class = StudentCourseSerializer

