from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator as Min
from django.contrib.postgres.fields import ArrayField


class User(AbstractUser):
    # Customer Information
    is_student = models.BooleanField(default=False)
    is_faculty = models.BooleanField(default=False)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    major = models.CharField(max_length=50, default="")
    department = models.CharField(max_length=50, default="")
    GPA = models.IntegerField(default=0)
    courses = ArrayField(models.CharField(max_length=50, blank=True))
    applied_positions = ArrayField(models.CharField(max_length=50, blank=True))
    
    def __repr__(self):
        return "{0} - {1}".format(self.name, self.email)

class Job(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    poster = models.CharField(max_length=50)

# class Student(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='student_profile')
#     # user.is_student
#     # major = models.CharField(max_length=50)

#     # def __repr__(self):
#     #     return "{0} - {1}".format(self.name, self.email)

# class Faculty(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='faculty_profile')
#     # department = models.CharField(max_length=50)
    
#     # def __repr__(self):
#     #     return "{0} - {1}".format(self.name, self.email