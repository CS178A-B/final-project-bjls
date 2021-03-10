from account.models import User, Job, Student, Faculty, Course
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, JobSerializer, StudentSerializer, FacultySerializer, CourseSerializer

# Lead Viewset

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = JobSerializer
    
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StudentSerializer

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FacultySerializer
    
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer
