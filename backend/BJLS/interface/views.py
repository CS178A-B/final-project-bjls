from django.shortcuts import render, redirect, reverse
from django.contrib.auth import login, logout
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from dateutil.relativedelta import relativedelta
from application.account.models import User
# from .forms import LoginForm, StudentUpdateForm, StudentForm
from django.contrib import messages
from django.utils import timezone
import logging 
import os
import json
import datetime
import calendar
from datetime import datetime, date
from .serializers import UserSerializer
from rest_framework import generics

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer