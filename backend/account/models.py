from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator as Min
from django.contrib.postgres.fields import ArrayField
from datetime import date

class Course(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    abbrev = models.CharField(max_length=50)
    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.name, self.description)


class Job(models.Model):
    description = models.CharField(max_length=150)
    poster = models.CharField(max_length=50)
    posted_date = models.DateField(date.today())
    hourly_salary = models.FloatField(max_length=10, default=10)
    hours_per_week = models.IntegerField(default=10)
    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.description)

class Student(models.Model):
    major = models.CharField(max_length=50, default="")
    GPA = models.FloatField(default=0)
    # courses = ArrayField(models.CharField(max_length=50, blank=True))
    # applied_positions = ArrayField(models.CharField(max_length=50, blank=True))
    profile_completeness = models.IntegerField(default=0)
    # taken_class = models.ManyToManyField(Course)
    applied_positions = models.ManyToManyField(Job)
    profile_completeness = models.IntegerField(default=0)
    course_taken = models.ManyToManyField(Course)

    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.major, self.GPA)

class Faculty(models.Model):
    department = models.CharField(max_length=50, default="")
    profile_completeness = models.IntegerField(default=0)
    posted_jobs = models.ManyToManyField(Job)
    def __repr__(self):
        return "{0} - {1}".format(self.id, self.department)

class User(AbstractUser):
    # User Login Information
    is_student = models.ForeignKey(Student, on_delete=models.CASCADE)
    is_faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)

    def __repr__(self):
        return "{0} - {1}".format(self.id, self.email)



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