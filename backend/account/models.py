from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator as Min
from django.contrib.postgres.fields import ArrayField
from datetime import date

class Course(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    abbrev = models.CharField(max_length=50)
    grade = models.CharField(max_length=3, default="", blank=True, null=True)
    students = models.ManyToManyField('Student', default=0, blank=True, through='StudentCourse')
    
    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.name, self.description)

class Comment(models.Model):
    body = models.CharField(max_length=1500)
    commenter = models.ForeignKey('Faculty', on_delete=models.CASCADE, null=True)
    course = models.ManyToManyField('Course', default=0, blank=True)

    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.body)



class Job(models.Model):
    description = models.CharField(max_length=150)
    poster = models.ForeignKey('Faculty', on_delete=models.CASCADE, null=True)
    posted_date = models.DateField(date.today())
    hourly_salary = models.FloatField(max_length=10, default=10, blank=True)
    hours_per_week = models.IntegerField(default=10)
    course_req = models.ManyToManyField(Course, default=0, blank=True)
    applications = models.ManyToManyField('Student', default=0, blank=True, through='Application')

    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.description)

class Application(models.Model):
    job = models.ForeignKey('job', on_delete=models.CASCADE)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    application_date = models.DateField(date.today())
    applicant_score = models.IntegerField(default=0)
    
    
class StudentCourse(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    grade = models.CharField(max_length=50, default="")


class Student(models.Model):
    major = models.CharField(max_length=50, default="")
    GPA = models.FloatField(default=0, blank=True, null=True)
    # courses = ArrayField(models.CharField(max_length=50, blank=True))
    # applied_positions = ArrayField(models.CharField(max_length=50, blank=True))
    profile_completeness = models.IntegerField(default=0)
    # taken_class = models.ManyToManyField(Course)
    applications = models.ManyToManyField('Job', default=0, blank=True, through='Application')
    profile_completeness = models.IntegerField(default=0)
    course_taken = models.ManyToManyField('Course', default=0, blank=True, through='StudentCourse')
    resume_pdf = models.FileField(upload_to='pdf', null=True, blank=True)
    transcript = models.FileField(upload_to='pdf', null=True, blank=True)
    comments_recv = models.ManyToManyField('Comment', default=0, blank=True)
    user = models.OneToOneField('User', related_name='student', on_delete=models.CASCADE, primary_key=True, default=0)

    def __str__(self):
        return "{0}".format(self.user.username)

    def __repr__(self):
        return "{0} - {1} - {2}".format(self.id, self.major, self.GPA)

class Faculty(models.Model):
    department = models.CharField(max_length=50, default="")
    profile_completeness = models.IntegerField(default=0)
    courses_taught = models.ManyToManyField(Course, default=0, blank=True)
    comments_made = models.ManyToManyField('Comment', default=0, blank=True)
    user = models.OneToOneField('User', related_name='faculty', on_delete=models.CASCADE, primary_key=True, default=0)

    def __repr__(self):
        return "{0} - {1}".format(self.id, self.department)

    def __str__(self):
        return "{0}".format(self.user.username)

class User(AbstractUser):
    # User Login Information
    is_student = models.BooleanField(default=False)
    is_faculty = models.BooleanField(default=False)


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