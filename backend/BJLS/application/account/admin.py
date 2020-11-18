from django.contrib import admin

# Register your models here.

from django.contrib import admin
from application.account.models import Student


class StudentAdmin(admin.ModelAdmin):
    fields = ['username', 'email', 'major']


admin.site.register(Student, StudentAdmin)
