from django.shortcuts import render, redirect, reverse
from django.contrib.auth import login, logout
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from dateutil.relativedelta import relativedelta
from .forms import FacultyForm, LoginForm, StudentUpdateForm, StudentForm, FacultyUpdateForm
from .models import User
# from .forms import LoginForm, StudentUpdateForm, StudentForm
from django.contrib import messages
from django.utils import timezone
import logging 
import os
import json
import datetime
import calendar
from datetime import datetime, date

logging.basicConfig(level=os.environ.get("LOGLEVEL", "DEBUG"))
logger = logging.getLogger(__name__)


class LoginView(View):
    """This how the login page is handled when attempting GET and POST requests
    """
    template_name = "account/login.html"

    # If a user is logged in, they have no need to access the login page, so we redirect them to their dashboard page
    # Otherwise, if they aren't logged in, access to the login page allows them to do so
    def get(self, request):
        if request.user.is_authenticated:
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            return redirect(reverse('account:dashboard'))
        login_form = LoginForm()
        return render(request, self.template_name, {'form': login_form})

    # When a user submits the fields on the login page, we want to ensure that the login credentials are correct
    # If they are, we redirect them to their dashboard page
    # If they aren't, we render the login page again, this time with an error message
    def post(self, request):
        login_form = LoginForm(request, data=request.POST)
        if login_form.is_valid():
            login(request, login_form.get_user())
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            # else:
            print("Valid Customer")
            return redirect(reverse('account:dashboard'))
        messages.error(request, "Your email or password is incorrect.")
        return render(request, self.template_name, {'form': login_form})


class RegisterStudentView(View):
    """This how the register page is handled when attempting GET and POST requests
    """
    template_name = "account/register.html"
    model = User

    # If a user is logged in, they should not have access to the registration page, so we redirect them to their dashboard
    # If a user is not logged in, they should not have access to the registration page, so we redirect them to the login page
    # If a user is a superuser, they are the ONLY people that should be able to access the registration page, so we render the page and form for them
    def get(self, request):
        student_form = StudentForm()
        if request.user.is_authenticated:
            # is_SuperUser = request.user.is_superuser
            # if is_SuperUser:
            return redirect(reverse('account:dashboard'))
        return render(request, self.template_name, {'form': student_form})

    # When a user submits the fields on the login page, we want to ensure that the registration credentials are correct
    # If they are, we redirect them to their dashboard page
    # If they aren't, we render the registration page again, this time with an error message
    def post(self, request):
        student_form = StudentForm(request.POST)
        if student_form.is_valid():
            student_form.instance.username = student_form.instance.email
            # customer_form.instance.billing_start_date = self.getBillingStart()
            student_form.save()
            return redirect(reverse('account:login'))
        return render(request, self.template_name, {'form': student_form})

    # def getBillingStart(self):
    #     today = datetime.today()
    #     firstThis = today.replace(day=1)

    #     firstNext = firstThis + relativedelta(months=+1)
    #     return firstNext


class RegisterFacultyView(View):
    """This how the register page is handled when attempting GET and POST requests
    """
    template_name = "account/register.html"

    # If a user is logged in, they should not have access to the registration page, so we redirect them to their dashboard
    # If a user is not logged in, they should not have access to the registration page, so we redirect them to the login page
    # If a user is a superuser, they are the ONLY people that should be able to access the registration page, so we render the page and form for them
    def get(self, request):
        faculty_form = FacultyForm()
        if request.user.is_authenticated:
            # is_SuperUser = request.user.is_superuser
            # if is_SuperUser:
            return redirect(reverse('account:dashboard'))
        return render(request, self.template_name, {'form': faculty_form})

    # When a user submits the fields on the login page, we want to ensure that the registration credentials are correct
    # If they are, we redirect them to their dashboard page
    # If they aren't, we render the registration page again, this time with an error message
    def post(self, request):
        faculty_form = FacultyForm(request.POST)
        if faculty_form.is_valid():
            faculty_form.instance.username = faculty_form.instance.email
            # customer_form.instance.billing_start_date = self.getBillingStart()
            faculty_form.save()
            return redirect(reverse('account:login'))
        return render(request, self.template_name, {'form': faculty_form})


class DashboardView(View):
    """This how the dashboard page is handled when attempting GET requests
    """
    template_name = "account/dashboard.html"

    # If a user is logged in, they should have access to their dashboard page, so we render their dashboard
    # If a user is not logged in, they should not have access to the dashboard page, so we redirect them to the login page
    def get(self, request):
        if request.user.is_authenticated:
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            # print(request.user.billing_start_date)
            return render(request, self.template_name)
        else:
            return redirect(reverse('account:login'))


class JobBoardView(View):
    """This how the job board page is handled when attempting GET requests
    """
    template_name = "account/JobBoard.html"

    # If a user is logged in, they should have access to their dashboard page, so we render their dashboard
    # If a user is not logged in, they should not have access to the dashboard page, so we redirect them to the login page
    def get(self, request):
        # if request.user.is_authenticated:
        #     # validC = validPayingCustomer(request)
        #     # if not validC:
        #     #     return redirect(reverse('account:payment'))
        #     # print(request.user.billing_start_date)
        #     return render(request, self.template_name)
        # else:
        #     return redirect(reverse('account:login'))
        return render(request, self.template_name)


class SettingsView(View):
    """This how the settings page is handled when attempting GET requests
    """
    template_name = "account/settings.html"

    # If a user is logged in, they should have access to their settings page, so we render their account settings
    # If a user is not logged in, they should not have access to the settings page, so we redirect them to the login page
    def get(self, request):
        if request.user.is_authenticated:
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            return render(request, self.template_name)
        return redirect(reverse('account:login'))


class StudentUpdateView(View):
    """This how the update page is handled when attempting GET and POST requests
    """
    template_name = "account/update_account.html"

    # If a user is logged in, they should be able to access the update account page, so we render the update page and its form
    # Otherwise, if they aren't logged in, they should not have access to the update account page, so we redirect them to the login page
    def get(self, request):
        update_form = StudentUpdateForm()
        if request.user.is_authenticated:
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            return render(request, self.template_name, {'form': update_form})
        return redirect(reverse('account:login'))
    
    # When a user submits the fields on the update account page, we want to ensure that the update credentials are correct
    # If they are, we save the changes and redirect them to their dashboard page
    # If they aren't, we render the update account page again, this time with an error message
    def post(self, request):
        update_form = StudentUpdateForm(request.POST, instance=request.user)
        if update_form.is_valid():
            update_form.instance.username = update_form.instance.email
            update_form.save()
            return redirect(reverse('account:dashboard'))
        return render(request, self.template_name, {'form': update_form})


class FacultyUpdateView(View):
    """This how the update page is handled when attempting GET and POST requests
    """
    template_name = "account/update_account.html"

    # If a user is logged in, they should be able to access the update account page, so we render the update page and its form
    # Otherwise, if they aren't logged in, they should not have access to the update account page, so we redirect them to the login page
    def get(self, request):
        update_form = FacultyUpdateForm()
        if request.user.is_authenticated:
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            return render(request, self.template_name, {'form': update_form})
        return redirect(reverse('account:login'))
    
    # When a user submits the fields on the update account page, we want to ensure that the update credentials are correct
    # If they are, we save the changes and redirect them to their dashboard page
    # If they aren't, we render the update account page again, this time with an error message
    def post(self, request):
        update_form = StudentUpdateForm(request.POST, instance=request.user)
        if update_form.is_valid():
            update_form.instance.username = update_form.instance.email
            update_form.save()
            return redirect(reverse('account:dashboard'))
        return render(request, self.template_name, {'form': update_form})


class DeleteView(View):
    """This how the delete page is handled when attempting GET and POST requests
    """
    template_name = "account/delete_account.html"

    # If a user is logged in, they should be able to access the delete account page, so we render the delete page
    # Otherwise, if they aren't logged in, they should not have access to the delete account page, so we redirect them to the login page
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, self.template_name)
        return redirect(reverse('account:login'))

    # If a user submits the delete button, sending a delete POST request, the account should be deleted
    def post(self, request):
        u = request.user
        u.delete()
        return redirect(reverse('account:login'))


class IndexView(View):
    """This was the placeholder for index.html before replacing the dashboard I created
    """
    
    template_name = "account/index.html"

    def get(self, request):
        if request.user.is_authenticated:
            # validC = validPayingCustomer(request)
            # if not validC:
            #     return redirect(reverse('account:payment'))
            return render(request, self.template_name)
        return redirect(reverse('account:login'))

