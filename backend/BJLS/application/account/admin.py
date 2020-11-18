from django.contrib import admin

# Register your models here.

from django.contrib import admin
from application.account.models import User


class UserAdmin(admin.ModelAdmin):
    fields = ['username', 'email']


admin.site.register(User, UserAdmin)
