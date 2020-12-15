from rest_framework import serializers
from account.models import User, Job

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'email', 'username', 'password', 'major', 'department', 'is_student', 'is_faculty')

# Job Serializer
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('name', 'description', 'poster')
    