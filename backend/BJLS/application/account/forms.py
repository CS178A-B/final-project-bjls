from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordResetForm, SetPasswordForm
from .models import Student


class StudentForm(UserCreationForm):
    class Meta:
        model = Student
        fields = ('name', 'email', 'major', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(StudentForm, self).__init__(*args, **kwargs)
        self.fields['password1'].help_text = "Minimum length of 8 characters."
        self.fields['password2'].label = "Password Confirmation"
        self.fields['password2'].help_text = "Enter the same password for confirmation."


# class FacultyForm(UserCreationForm):
#     class Meta:
#         model = Faculty
#         fields = ('name', 'email', 'department', 'password1', 'password2')

#     def __init__(self, *args, **kwargs):
#         super(FacultyForm, self).__init__(*args, **kwargs)
#         self.fields['password1'].help_text = "Minimum length of 8 characters."
#         self.fields['password2'].label = "Password Confirmation"
#         self.fields['password2'].help_text = "Enter the same password for confirmation."


class LoginForm(AuthenticationForm):

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

    # Note: Customer.username == Customer.email
    username = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'ad-launcher-text-field w-input'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'ad-launcher-text-field w-input'}))


class StudentUpdateForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ('name', 'email', 'major')

    def __init__(self, *args, **kwargs):
        super(StudentUpdateForm, self).__init__(*args, **kwargs)


# class FacultyUpdateForm(forms.ModelForm):
#     class Meta:
#         model = Faculty
#         fields = ('name', 'email', 'department')

#     def __init__(self, *args, **kwargs):
#         super(FacultyUpdateForm, self).__init__(*args, **kwargs)
