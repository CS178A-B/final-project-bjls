from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from account.models import Student, Faculty, Job, Course, Comment

# User Serializer


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name', 'username', 'password', 'email', 'is_student', 'is_faculty')


class StudentSerializerWithToken(serializers.ModelSerializer):

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
        model = Student
        fields = ('token', 'username', 'password', 'email', 'first_name', 'last_name')


class FacultySerializerWithToken(serializers.ModelSerializer):

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
        model = Faculty
        fields = ('token', 'username', 'password', 'email', 'first_name', 'last_name')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


# Job Serializer
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('description', 'poster', 'posted_date', 'hourly_salary', 'hours_per_week', 'course_req', 'applicants')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'abbrev', 'description', 'grade')
    
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('body', 'commenter', 'course')
