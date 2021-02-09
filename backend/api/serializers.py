from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from account.models import User, Student, Faculty, Job, Course

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'is_student', 'is_faculty')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'email', 'is_student', 'is_faculty')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('major', 'GPA', 'course_taken', 'applied_positions', 'profile_completeness')


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ('department', 'profile_completeness', 'posted_jobs')


# Job Serializer
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('name', 'description', 'poster', 'posted_date', 'hourly_salary', 'hours_per_week')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'abbrev')
    
