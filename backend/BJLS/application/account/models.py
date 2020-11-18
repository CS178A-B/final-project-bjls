from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator as Min


class User(AbstractUser):
    # Customer Information
    is_student = models.BooleanField(default=False)
    is_faculty = models.BooleanField(default=False)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    major = models.CharField(max_length=50, default="")
    department = models.CharField(max_length=50, default="")
    # organization = models.CharField(max_length=50)
    # website = models.URLField(unique=True)
    # # Billing Information
    # billing_start_date = models.DateTimeField(blank=True, null=True)
    # # Braintree API Information
    # braintree_customer_id = models.CharField(max_length=200, blank=True, null=True)
    # braintree_subscription_id = models.CharField(max_length=200, blank=True, null=True)
    # # Google Ads API Information
    # google_ads_customer_id = models.CharField(max_length=50, blank=True, null=True)

    # budget0 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    # budget1 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    # budget2 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __repr__(self):
        return "{0} - {1}".format(self.name, self.email)

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
#     #     return "{0} - {1}".format(self.name, self.email)
