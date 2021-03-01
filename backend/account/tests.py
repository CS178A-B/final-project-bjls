from django.test import TestCase
from .models import User, Student, Faculty, Job
# Create your tests here.
class BasicTest(TestCase):
    def setUp(self):
        Student.objects.create(name="automated_testing",major="Auto Test", GPA=4.01, completeness=101)
    def test_fields(self):
        s = Student.objects.get(name="automated_testing")
        self.assertEqual(s.major, "Auto Test")
