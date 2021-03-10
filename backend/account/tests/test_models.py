from django.test import TestCase
from account.models import User, Student, Faculty, Job
# Create your tests here.
class StudentTest(TestCase):
    check_id = 1
    def setUp(self):
        self.s = Student.objects.create(major="Auto Test", GPA=4.01, profile_completeness=101)
        self.s.save() 
    def test_fields(self):
        self.assertEqual(self.s.major, "Auto Test")
        self.assertEqual(self.s.GPA, 4.01)
        self.assertEqual(self.s.profile_completeness, 101)

