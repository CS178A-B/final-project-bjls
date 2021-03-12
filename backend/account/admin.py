from django.contrib import admin

from .models import User, Course, Student, Faculty, Job, StudentCourse, Application


# Register your models here.
admin.site.register(User)
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Faculty)
admin.site.register(Job)


admin.site.register(StudentCourse)
admin.site.register(Application)
