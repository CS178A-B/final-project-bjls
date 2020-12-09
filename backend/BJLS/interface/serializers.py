from rest_framework import serializers
from application.account.models import User

# Lead Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'major', 'email', 'is_student')
    