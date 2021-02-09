from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator as Min
from django.contrib.postgres.fields import ArrayField


class User(AbstractUser):
    # User Login Information
    is_student = models.BooleanField(default=False)
    is_faculty = models.BooleanField(default=False)
    email = models.EmailField(unique=True)

    # def __repr__(self):
    #     return "{0} - {1}".format(self.name, self.email)

class Course(models.Model):
    name = models.CharField(max_length=50)
    abbrev = models.CharField(max_length=12)

class Job(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    poster = models.CharField(max_length=50)
    posted_date = models.DateField(auto_now_add=True)
    hourly_salary = models.FloatField(max_length=10)
    hours_per_week = models.IntegerField()

class Student(models.Model):
    name = models.CharField(max_length=50)
    major = models.CharField(max_length=50, default="")
    GPA = models.IntegerField(default=0)
    applied_positions = models.ManyToManyField(Job)
    profile_completeness = models.IntegerField(default=0)
    course_taken = models.ManyToManyField(Course)

class Faculty(models.Model):
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=50, default="")
    profile_completeness = models.IntegerField(default=0)
    posted_jobs = models.ManyToManyField(Job)



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