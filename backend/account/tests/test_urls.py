from django.test import TestCase
from django.urls import reverse, resolve
from account.models import User, Student, Faculty, Job
from account.views import LoginView


class StudentTest(TestCase):
    def test_home_url(self):
        url = reverse('login')
        self.asserEquals(resolve(url).func, LoginView)
        