from django.test import TestCase, Client
from django.shortcuts import reverse
from .forms import CustomerForm, LoginForm, AccountUpdateForm
from .models import Customer
from dateutil.relativedelta import relativedelta
import datetime
from datetime import datetime, date

startBill = datetime.today() + relativedelta(months=+1)


# This tests LoginView from views.py
class TestLoginView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page and can access the login fields.
        """
        response = self.client.get(reverse('account:login'))
        self.assertEqual(response.status_code, 200)

    def test_authenticated_user(self):
        """ This tests if an authenticated user is redirected from the login page to their dashboard.
        It is unnecessary for an authenticated user to view the login page if they are already logged in.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:login'))
        self.assertEqual(response.status_code, 302)


# This tests RegisterView from views.py
class TestRegisterView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        We do not want them accessing the registration page.
        """
        response = self.client.get(reverse('account:register'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is redirected from the register page to their dashboard.
        We do not want the nonprofit accounts having access to registering new nonprofit accounts
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:register'))
        self.assertEqual(response.status_code, 302)

    def test_valid_registration_and_valid_login(self):
        """This tests a valid registration and a valid login via POST requests."""
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'billing_start_date': startBill,
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response.status_code, 302)

    def test_valid_registration_and_invalid_login(self):
        """This tests a valid registration but an invalid login via POST requests."""
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'billing_start_date': startBill,
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Detect if registered customer gives incorrect login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': "This-is-an-incorrect-password-123!",
        })
        self.assertEqual(login_response.status_code, 200)

    def test_invalid_registration(self):
        """This tests an invalid registration, where the registration data is empty."""
        registration_data = {}
        # Send a POST request to "account:register"
        register_response = self.client.post(reverse("account:register"), registration_data)
        # The user attempts to go to "account:dashboard" 
        # However, the user should be redirected to "account:login" due to invalid registration
        dashboard_response = self.client.get(reverse("account:dashboard"))
        self.assertEqual(dashboard_response.status_code, 302)


# This tests CustomerForm form inputs from forms.py
class TestCustomerForm(TestCase):
    def test_valid(self):
        data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertTrue(customer_form.is_valid())

    def test_invalid_empty_data(self):
        customer_form = CustomerForm(data={})
        self.assertFalse(customer_form.is_valid())

    def test_invalid_empty_fields(self):
        data = {
            'name': "",
            'email': "",
            'organization': "",
            'website': "",
            'password1': "",
            'password2': ""
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_short_password(self):
        data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'billing_start_date': startBill,
            'website': "https://www.tesla.com/",
            'password1': "Elon123",
            'password2': "Elon123"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_password_mismatch(self):
        data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'billing_start_date': startBill,
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Ford-sucks-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_email(self):
        data = {
            'name': "Elon Musk",
            'email': "Elon Musk is an awesome email.",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_website(self):
        data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "Elon Musk is an awesome website.",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_input_size(self):
        size = 50
        data = {
            'name': "Elon Musk" * size,
            'email': "elon@tesla.com",
            'organization': "Tesla" * size,
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_email_exists(self):
        existing_email = "elon@tesla.com"
        customer = Customer(
            name="Elon Musk",
            email=existing_email,
            organization="Tesla",
            website="https://www.tesla.com/"
        )
        customer.save()
        data = {
            'name': "Bill Gates",
            'email': existing_email,
            'organization': "Microsoft",
            'website': "https://www.microsoft.com/en-us/",
            'password1': "Microsoft-is-awesome-2020",
            'password2': "Microsoft-is-awesome-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())

    def test_invalid_website_exists(self):
        existing_site = "https://www.spacex.com/"
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.spacex.com/"
        )
        customer.save()
        data = {
            'name': "Bill Gates",
            'email': "bill@microsoft.com",
            'organization': "Microsoft",
            'website': existing_site,
            'password1': "Microsoft-is-awesome-2020",
            'password2': "Microsoft-is-awesome-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())


# This tests AccountUpdateForm form inputs from forms.py
class TestAccountUpdateForm(TestCase):
    def test_valid(self):
        data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'billing_start_date': startBill,
            'website': "https://www.tesla.com/"
        }
        account_update_form = AccountUpdateForm(data=data)
        self.assertTrue(account_update_form.is_valid())

    def test_invalid_empty_data(self):
        account_update_form = AccountUpdateForm(data={})
        self.assertFalse(account_update_form.is_valid())

    def test_invalid_empty_fields(self):
        data = {
            'name': "",
            'email': "",
            'organization': "",
            'website': "",
            'password1': "",
            'password2': ""
        }
        account_update_form = AccountUpdateForm(data=data)
        self.assertFalse(account_update_form.is_valid())

    def test_invalid_email(self):
        data = {
            'name': "Elon Musk",
            'email': "Elon Musk is an awesome email.",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        account_update_form = AccountUpdateForm(data=data)
        self.assertFalse(account_update_form.is_valid())

    def test_invalid_website(self):
        data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "Elon Musk is an awesome website.",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        account_update_form = AccountUpdateForm(data=data)
        self.assertFalse(account_update_form.is_valid())

    def test_invalid_input_size(self):
        size = 50
        data = {
            'name': "Elon Musk" * size,
            'email': "elon@tesla.com",
            'organization': "Tesla" * size,
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        account_update_form = AccountUpdateForm(data=data)
        self.assertFalse(account_update_form.is_valid())

    def test_invalid_email_exists(self):
        existing_email = "elon@tesla.com"
        customer = Customer(
            name="Elon Musk",
            email=existing_email,
            organization="Tesla",
            website="https://www.tesla.com/"
        )
        customer.save()
        data = {
            'name': "Bill Gates",
            'email': existing_email,
            'organization': "Microsoft",
            'website': "https://www.microsoft.com/en-us/",
            'password1': "Microsoft-is-awesome-2020",
            'password2': "Microsoft-is-awesome-2020"
        }
        account_update_form = AccountUpdateForm(data=data)
        self.assertFalse(account_update_form.is_valid())

    def test_invalid_website_exists(self):
        existing_site = "https://www.spacex.com/"
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.spacex.com/"
        )
        customer.save()
        data = {
            'name': "Bill Gates",
            'email': "bill@microsoft.com",
            'organization': "Microsoft",
            'website': existing_site,
            'password1': "Microsoft-is-awesome-2020",
            'password2': "Microsoft-is-awesome-2020"
        }
        customer_form = CustomerForm(data=data)
        self.assertFalse(customer_form.is_valid())


# This tests DashboardView from views.py
class TestDashboardView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        We do not want them accessing the dashboard page because they are not assigned to an account.
        """
        response = self.client.get(reverse('account:dashboard'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access their account dashboard.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:dashboard'))
        self.assertEqual(response.status_code, 200)


# This tests the imported LogoutView in urls.py
class TestLogoutView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the logout page.
        """
        response = self.client.get(reverse('account:logout'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is redirected from the logout page to the login page.
        If they click to logout, there is no longer an account in use, thus being redirected to the login page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:logout'))
        self.assertEqual(response.status_code, 302)

    def test_logout_user(self):
        """This tests registering a user, ensuring the registered user is saved in the database, logging in with the created user, and attempting to logout
        """
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'billing_start_date': startBill,
            'website': "https://www.tesla.com/",
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response.status_code, 302)

        # Logout of the account here
        logout_response = self.client.get(reverse('account:logout'))
        self.assertEqual(logout_response.status_code, 302)

        # Try to access dashboard here, but cannot because there is not a user assigned to this unauthorized account
        logged_out_dashboard_response = self.client.get(reverse('account:dashboard'))
        self.assertEqual(logged_out_dashboard_response.status_code, 302)
        

# This tests the imported LogoutView in urls.py
class TestPasswordResetView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user can access the password reset page
        """
        response = self.client.get(reverse('account:password_reset'))
        self.assertEqual(response.status_code, 200)

    def test_authenticated_user(self):
        """This tests if an authenticated user can access the password reset page
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:password_reset'))
        self.assertEqual(response.status_code, 200)

    def test_reset_password_valid(self):
        """This tests if an email is sent out to a user who requests a password reset with a correct email via POST request
        """
        from django.core import mail
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Send a POST request to "account:password_reset"
        email_response = self.client.post(reverse("account:password_reset"), {
            'email': registration_data['email']
        })
        self.assertEqual(email_response.status_code, 302)
        
        # Check to see if the email was sent in our outbox
        self.assertEqual(len(mail.outbox), 1)

    def test_reset_password_invalid(self):
        """This tests if an email is not sent out to a user who requests a password reset with an incorrect email via POST request
        """
        from django.core import mail
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Send a POST request to "account:password_reset"
        email_response = self.client.post(reverse("account:password_reset"), {
            'email': "notelon@tesla.com"
        })

        # Ensure that an email was not sent out to the invalid email address
        self.assertEqual(len(mail.outbox), 0)


# This tests SettingsView in views.py
class TestSettingsView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the settings page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:settings'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access their account settings.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:settings'))
        self.assertEqual(response.status_code, 200)


# This tests UpdateView in views.py
class TestUpdateView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the update account page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:update'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access the update account page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:update'))
        self.assertEqual(response.status_code, 200)

    def test_update_account_valid(self):
        """This tests if an account created via POST request can update their account given correct inputs with POST request
        """
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response.status_code, 302)
        
        # Send a POST request to "account:update"
        update_response = self.client.post(reverse("account:update"), {
            'name': "Bill Gates",
            'email': "billgates@microsoft.com",
            'organization': "Microsoft",
            'website': "https://www.microsoft.com/en-us/",
        })
        self.assertEqual(update_response.status_code, 302)

        # Ensure it is possible to login with updated credentials
        login_response2 = self.client.post(reverse("account:login"), {
            'username': "billgates@microsoft.com",
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response2.status_code, 302)

    def test_update_account_invalid(self):
        """This tests if an account created via POST request cannot update their account given incorrect inputs with POST request
        """
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Store a new user occupying the email address we want to change our first customer to
        customer = Customer(
            name="Bill Gates",
            email="bill@microsoft.com",
            organization="Microsoft",
            website="https://www.microsoft.com/",
            billing_start_date=startBill
        )
        customer.save()

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response.status_code, 302)

        # Attempt to update the account with invalid credentials via a POST request
        update_response = self.client.post(reverse("account:update"), {
            'name': "Bill Gates",
            'email': "bill@microsoft.com",
            'organization': "Microsoft",
            'website': "https://www.microsoft.com/en-us/",
        })
        self.assertEqual(update_response.status_code, 200)

        # Ensure that the account details failed to update and that the original account details never changed
        login_response2 = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response2.status_code, 302)


class TestDeleteView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the delete account page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:delete'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access the delete account page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:delete'))
        self.assertEqual(response.status_code, 200)
        
    def test_delete_account(self):
        """This tests if an account registered via POST request can delete their account via POST request
        """
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response.status_code, 302)

        # Delete account via POST request
        delete_response = self.client.post(reverse("account:delete"))
        self.assertEqual(delete_response.status_code, 302)

        # Ensure that the database removed the stored account
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 0)

        # Ensure that the deleted user cannont be logged into anymore because it no longer exists
        login_response2 = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertEqual(login_response2.status_code, 200)


class TestIndexView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the index page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:index'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access the index page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:index'))
        self.assertEqual(response.status_code, 200)


class TestClicksView(TestCase):        
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the clicks page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:clicks'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access the clicks page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:clicks'))
        self.assertEqual(response.status_code, 200)

    def test_JSONResponse(self):
        """This tests if an authenticated user is able to access the clicks page.
        It then checks to ensure that when ClicksView() is used, that a JSONResponse is being sent out.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:clicks'))
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                "clicks_data": {
                    "dateData": ["2018-03-01", "2018-03-02", "2018-03-03", "2018-03-04", "2018-03-05"],
                    "clicksData": [64, 63, 22, 63, 74],
                    "viewsData": [110, 160, 180, 140, 150],
                    "cpcData": [5.4, 5.3, 4.2, 2.2, 2.1]
                }
            }
        )


class TestAdsView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        We do not want them accessing the dashboard page because they are not assigned to an account.
        """
        response = self.client.get(reverse('account:ads'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access their account dashboard.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:ads'))
        self.assertEqual(response.status_code, 200)


class TestAdsJsonView(TestCase):        
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the ads page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:adsJson'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access the ads page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:adsJson'))
        self.assertEqual(response.status_code, 200)

    def test_JSONResponse(self):
        """This tests if an authenticated user is able to access the ads page.
        It then checks to ensure that when AdsView() is used, that a JSONResponse is being sent out.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:adsJson'))
        ad1 = {
            "url": "www.cats.com",
            "headline1": "Adopt A Cat Today",
            "headline2": "Cats.com",
            "headline3": "40% Off",
            "description": "Friendliest Cats Available For Adoption! Come Visit Our Offices And Meet Your Next Furry Friend.",
            "clicks": 193,
            "spent": 65.18
        }

        ad2 = {
            "url": "www.cats.com",
            "headline1": "Pet Grooming Services",
            "headline2": "Cats.com",
            "headline3": "10% Off",
            "description": "Has Your Furry Friend Gotten Into Trouble? There's No Mess Too Big For Us. Stop By For A High-Quality Pet Wash.",
            "clicks": 136,
            "spent": 49.75
        }

        ads = {
            "ad1": ad1,
            "ad2": ad2
        }
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
            student_form.instance.is_student = True
                "ads": ads
            }
        )


class TestBudgetView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        We do not want them accessing the dbudget page because they are not assigned to an account.
        """
        response = self.client.get(reverse('account:budget'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access their budget page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:budget'))
        self.assertEqual(response.status_code, 200)


class TestBudgetJsonView(TestCase):        
    def setUp(self):
        self.client = Client()

    def test_unauthenticated_user(self):
        """ This tests if an unauthenticated user is immediately sent to the login page.
        An unauthenticated user has no need to access the ads page since it is not assigned to an account.
        """
        response = self.client.get(reverse('account:budgetJson'))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user(self):
        """This tests if an authenticated user is able to access the budgetJson page.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:budgetJson'))
        self.assertEqual(response.status_code, 200)

    def test_JSONResponse_GET(self):
        """This tests if an authenticated user is able to access the budgetJson page.
        It then checks to ensure that when BudgetView() is used, that a JSONResponse is being sent out.
        """
        customer = Customer(
            name="Elon Musk",
            email="elon@tesla.com",
            organization="Tesla",
            website="https://www.tesla.com/",
            billing_start_date=startBill
        )
        customer.save()
        self.client.force_login(customer)
        response = self.client.get(reverse('account:budgetJson'))
        today = date.today()
        first = today.replace(day=1)
        # lastMonth = first - datetime.timedelta(days=1)
        
        # firstLastMonth = lastMonth.replace(day=1)
        # prev2Month = firstLastMonth - datetime.timedelta(days=1)

        lastMonth = first - relativedelta(months=+1)
        prev2Month = lastMonth - relativedelta(months=+1)

        nextMonth = first + relativedelta(months=+1)

        next2Month = nextMonth + relativedelta(months=+1)

        month2Prev = {
            "month": prev2Month.month,
            "budget": 500.00,
            "service_fee": 15.00,
            "average_cpc": 7.00
        }

        month1Prev = {
            "month": lastMonth.month,
            "budget": 536.00,
            "service_fee": 15.00,
            "average_cpc": 8.00
        }

        currMonth = {
            "month": first.month,
            "budget": 579.00,
            "service_fee": 15.00,
            "average_cpc": 9.00
        }

        month1Next = {
            "month": nextMonth.month,
            "budget": 400.00,
            "service_fee": 15.00,
            "average_cpc": 7.00
        }

        month2Next = {
            "month": next2Month.month,
            "budget": 400.00,
            "service_fee": 15.00,
            "average_cpc": 7.00
        }

        month_data = {
            "month2Prev": month2Prev,
            "month1Prev": month1Prev,
            "currMonth": currMonth,
            "month1Next": month1Next,
            "month2Next": month2Next
        }
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                "month_data": month_data
            }
        )

class TestValidCustomer(TestCase):
    def setUp(self):
        self.client = Client()

    # Tests to see where the customer has access to is their current date is not past the Billing Start Date
    def test_NOT_past_BSD(self):
        """This tests if an account registered via POST request can delete their account via POST request
        """
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': startBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertRedirects(login_response, "/dashboard/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        # How do we make sure this redirect code is sending them to the dashboard and not the payment page
        self.assertEqual(login_response.status_code, 302)


    def test_IS_past_BSD_invalid_payment_no_customer_id(self):
        """This tests if an account registered via POST request can delete their account via POST request
        """
        lateStartBill = datetime.today() - relativedelta(days=+1)
        # print(lateStartBill)
        print("ENTERING BSD INVALID PAYMENT TEST")
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': lateStartBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertRedirects(login_response, "/payment/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        # How do we make sure this redirect code is sending them to the dashboard and not the payment page
        self.assertEqual(login_response.status_code, 302)


    def test_IS_past_BSD_invalid_payment_invalid_card(self):
        """This tests if an account registered via POST request can delete their account via POST request
        """
        lateStartBill = datetime.today() - relativedelta(days=+1)
        # print(lateStartBill)
        print("ENTERING BSD INVALID PAYMENT TEST")
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': lateStartBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertRedirects(login_response, "/payment/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        # How do we make sure this redirect code is sending them to the dashboard and not the payment page
        self.assertEqual(login_response.status_code, 302)


        credit_card_data = {
            "credit_card": {
                "number": "4000111111111115",
                "expiration_date": "12/34",
            },
            "payment_method_nonce": 'fake-valid-nonce',
            # "options": {
            #     'submit_for_settlement': True
            # }
        }
        payment_response = self.client.post(reverse("account:payment"), credit_card_data)
        self.assertRedirects(payment_response, "/checkout/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        self.assertEqual(payment_response.status_code, 500)


    def test_IS_past_BSD_valid_payment(self):
        """This tests if an account registered via POST request can delete their account via POST request
        """
        lateStartBill = datetime.today() - relativedelta(days=+1)
        # print(lateStartBill)\
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': lateStartBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertRedirects(login_response, "/payment/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        # How do we make sure this redirect code is sending them to the dashboard and not the payment page
        self.assertEqual(login_response.status_code, 302)

        credit_card_data = {
            "credit_card": {
                "number": "378282246310005",
                "expiration_date": "12/34",
            },
            "payment_method_nonce": 'fake-valid-nonce',
            "options": {
                'submit_for_settlement': True
            }
        }
        payment_response = self.client.post(reverse("account:payment"), credit_card_data)
        self.assertRedirects(payment_response, "/checkout/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        self.assertEqual(payment_response.status_code, 302)

    def test_payment_settings_add_valid_card(self):
        """This tests if an account registered via POST request can delete their account via POST request
        """
        lateStartBill = datetime.today() - relativedelta(days=+1)
        # print(lateStartBill)\
        # Send a POST request to "account:register"
        registration_data = {
            'name': "Elon Musk",
            'email': "elon@tesla.com",
            'organization': "Tesla",
            'website': "https://www.tesla.com/",
            'billing_start_date': lateStartBill,
            'password1': "Tesla-is-awesome-2020",
            'password2': "Tesla-is-awesome-2020"
        }
        register_response = self.client.post(reverse("account:register"), registration_data)
        self.assertEqual(register_response.status_code, 302)
        
        # Check if database saved Elon Musk
        customers = Customer.objects.all()
        self.assertTrue(len(customers) == 1)
        elon_musk = customers[0]
        
        # Check if information is saved correctly
        self.assertEqual(elon_musk.email, registration_data['email'])

        # Registered customer gives correct login credentials via a POST request
        login_response = self.client.post(reverse("account:login"), {
            'username': registration_data['email'],
            'password': registration_data['password1'],
        })
        self.assertRedirects(login_response, "/payment/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        # How do we make sure this redirect code is sending them to the dashboard and not the payment page
        self.assertEqual(login_response.status_code, 302)

        credit_card_data = {
            "credit_card": {
                "number": "378282246310005",
                "expiration_date": "12/34",
            },
            "payment_method_nonce": 'fake-valid-nonce',
            "options": {
                'submit_for_settlement': True
            }
        }
        payment_response = self.client.post(reverse("account:payment"), credit_card_data)
        self.assertRedirects(payment_response, "/checkout/", status_code=302, target_status_code=200, msg_prefix='', fetch_redirect_response=True)
        self.assertEqual(payment_response.status_code, 302)


        credit_card_data2 = {
            "credit_card": {
                "number": "4012000077777777",
                "expiration_date": "12/34",
            },
            "payment_method_nonce": 'fake-valid-nonce',
            "options": {
                'submit_for_settlement': True
            }
        }
        payment_settings_response = self.client.post(reverse("account:payment_settings"), credit_card_data2)
        self.assertEqual(payment_settings_response.status_code, 200)


# def test_subscription_made_unsuccessful(self):
#     credit_card_data = {
#         "credit_card": {
#             "number": "4000111111111115",
#             "expiration_date": "12/34",
#         },
#         "payment_method_nonce": 'fake-processor-declined-visa-nonce',
#         "options": {
#             'submit_for_settlement': True
#         }
#     }
#     response = self.client.post(reverse("account:payment"), credit_card_data)
#     self.assertEqual(response.status_code, 302)

    # def test_JSONResponse_POST(self):
    #     """This tests if an authenticated user is able to access the ads page.
    #     It then checks to ensure that when AdsView() is used, that a JSONResponse is being sent out.
    #     """
    #     customer = Customer(
    #         name="Elon Musk",
    #         email="elon@tesla.com",
    #         organization="Tesla",
    #         website="https://www.tesla.com/",
    #         billing_start_date=startBill
    #     )
    #     customer.save()
    #     self.client.force_login(customer)
    #     response = self.client.get(reverse('account:budget'))
    #     today = date.today()
    #     first = today.replace(day=1)
    #     # lastMonth = first - datetime.timedelta(days=1)
        
    #     # firstLastMonth = lastMonth.replace(day=1)
    #     # prev2Month = firstLastMonth - datetime.timedelta(days=1)

    #     lastMonth = first - relativedelta(months=+1)
    #     prev2Month = lastMonth - relativedelta(months=+1)

    #     nextMonth = first + relativedelta(months=+1)

    #     next2Month = nextMonth + relativedelta(months=+1)

    #     budgetJson_response = self.client.post(reverse("account:budgetJson"), {
    #         'budget0': 500.00,
    #         'budget1': 500.00,
    #         'budget2': 500.00,
    #     })
    #     self.assertEqual(login_response.status_code, 200)

    #     month2Prev = {
    #         "month":  prev2Month.month,
    #         "budget": 500.00,
    #         "service_fee": 15.00,
    #         "average_cpc": 7.00
    #     }

    #     month1Prev = {
    #         "month":  lastMonth.month,
    #         "budget": 536.00,
    #         "service_fee": 15.00,
    #         "average_cpc": 8.00
    #     }

    #     currMonth = {
    #         "month":  first.month,
    #         "budget": 500.00,
    #         "service_fee": 15.00,
    #         "average_cpc": 9.00
    #     }

    #     month1Next = {
    #         "month":  nextMonth.month,
    #         "budget": 500.00,
    #         "service_fee": 15.00,
    #         "average_cpc": 7.00
    #     }

    #     month2Next = {
    #         "month":  next2Month.month,
    #         "budget": 500.00,
    #         "service_fee": 15.00,
    #         "average_cpc": 7.00
    #     }

    #     month_data = {
    #         "month2Prev": month2Prev,
    #         "month1Prev": month1Prev,
    #         "currMonth": currMonth,
    #         "month1Next": month1Next,
    #         "month2Next": month2Next
    #     }
    #     self.assertEqual(response.status_code, 200)
    #     self.assertJSONEqual(
    #         str(response.content, encoding='utf8'),
    #         {
    #             "month_data": month_data
    #         }
    #     )

