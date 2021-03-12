from django.test import TestCase

import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from api.api import UserSerializer
from account.models import User

# class UserRegistrationTestCase(APITestCase):
#     def test_user_registration(self):
#         data = {}
#         response = self.client.post("api/user/", data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
# Create your tests here.
