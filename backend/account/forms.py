from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordResetForm, SetPasswordForm
# from .models import User, Student, Faculty
from .models import Student, Faculty

# class UserForm(UserCreationForm):
#     class Meta:
#         model = User
#         # model.is_student = True
#         fields = ('username', 'email', 'password1', 'password2')
#         # model.save()

#     # def save(self):
#     #     user = super().save(commit=False)
#     #     user.is_student = True
#     #     user.save()
#     #     student = Student.objects.create(user=user)
#     #     # student.interests.add(*self.cleaned_data.get('interests'))
#     #     return user

#     def __init__(self, *args, **kwargs):
#         super(UserForm, self).__init__(*args, **kwargs)
#         self.fields['password1'].help_text = "Minimum length of 8 characters."
#         self.fields['password2'].label = "Password Confirmation"
#         self.fields['password2'].help_text = "Enter the same password for confirmation."


class LoginForm(AuthenticationForm):

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

    # Note: Customer.username == Customer.email
    username = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'r-finder-text-field w-input'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'r-finder-text-field w-input'}))


# class StudentUpdateForm(forms.ModelForm):
#     class Meta:
#         model = Student
#         fields = ('name', 'email', 'major')

#     def __init__(self, *args, **kwargs):
#         super(StudentUpdateForm, self).__init__(*args, **kwargs)


# class FacultyUpdateForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ('name', 'email', 'department')

#     def __init__(self, *args, **kwargs):
#         super(FacultyUpdateForm, self).__init__(*args, **kwargs)