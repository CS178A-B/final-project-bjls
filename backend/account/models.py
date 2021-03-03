from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator as Min
from django.contrib.postgres.fields import ArrayField
from datetime import date


class Course(models.Model):
    name = models.CharField(max_length=50)
    abbrev = models.CharField(max_length=12)

class Job(models.Model):
    description = models.CharField(max_length=150)
    poster = models.CharField(max_length=50)
    posted_date = models.DateField(default=date.today)
    hourly_salary = models.FloatField(max_length=10, default=0)
    hours_per_week = models.IntegerField(default=10)

class Student(models.Model):
    major = models.CharField(max_length=50, default="")
    GPA = models.IntegerField(default=0)
    applied_positions = models.ManyToManyField(Job)
    profile_completeness = models.IntegerField(default=0)
    course_taken = models.ManyToManyField(Course)

class Faculty(models.Model):
    department = models.CharField(max_length=50, default="")
    profile_completeness = models.IntegerField(default=0)
    posted_jobs = models.ManyToManyField(Job)


class User(AbstractUser):
    # User Login Information
    is_student = models.ForeignKey(Student, on_delete=models.CASCADE)
    is_faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)

    # def __repr__(self):
    #     return "{0} - {1}".format(self.name, self.email)




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