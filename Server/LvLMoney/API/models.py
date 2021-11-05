from django.db import models

# Create your models here.
class AuthenticationDB(models.Model):
    Username = models.CharField("Username", max_length=64, unique=True)
    Password = models.CharField("Password", max_length=64)

    FirstName = models.CharField("First Name", max_length=20)
    LastName = models.CharField("Last Name", max_length=20)
    Email = models.EmailField("Email ID", max_length=30)
    PhoneNumber = models.CharField("Phone Number", max_length=10)

    TwoFactorEnabled = models.BooleanField("Two Factor Enabled?", default=False)
