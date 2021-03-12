from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from account.models import User, Student, Faculty, Job, Course, Comment

# User Serializer


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    student = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    faculty = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        

        if password is not None:
            instance.set_password(password)
        instance.save()

        if instance.is_student:
            stud = Student(user=instance)
            stud.save()

        if instance.is_faculty:
            fac = Faculty(user=instance)
            fac.save()

        return instance

    class Meta:
        model = User
        fields = ('password', 'student', 'faculty')
        extra_kwargs = {'password' : {'write_only' : True}}



class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    student = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    faculty = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

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

        if instance.is_student:
            stud = Student(user=instance)
            stud.save()

        if instance.is_faculty:
            fac = Faculty(user=instance)
            fac.save()
        
        return instance

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password' : {'write_only' : True}}


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

        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course

        fields = '__all__'

    
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment

        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
