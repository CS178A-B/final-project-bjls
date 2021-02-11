from django.test import TestCase
from .models import User, Student, Faculty, Job
# Create your tests here.
class BasicTest(TestCase):
    def test_fields(self):
        student1 = Student()
        student1.name = "liam"
        student1.major = "Computer Engineering"
        student1.GPA = 3.93
        student1.completeness = 25
        