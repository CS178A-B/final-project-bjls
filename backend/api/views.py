from django.shortcuts import render
from account.models import User, Job
from .serializers import UserSerializer, JobSerializer
from rest_framework import generics

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    