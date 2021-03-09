from django.shortcuts import render
from account.models import User, Student, Faculty, Job, Course, Comment
from .serializers import UserSerializer, UserSerializerWithToken, StudentSerializer, FacultySerializer, JobSerializer, CourseSerializer, CommentSerializer
from rest_framework import generics, permissions, status
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


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


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class FacultyList(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
