from django.db import models

# Create your models here.
class AuthenticationDB(models.Model):
    UserImage = models.ImageField(upload_to="UserImages", null=True, blank=True)

    Username = models.CharField("Username", max_length=64, unique=True)
    Password = models.CharField("Password", max_length=64)

    FirstName = models.CharField("First Name", max_length=20)
    LastName = models.CharField("Last Name", max_length=20)
    Email = models.EmailField("Email ID", max_length=30)
    PhoneNumber = models.CharField("Phone Number", max_length=10)

    TwoFactorEnabled = models.BooleanField("Two Factor Enabled?", default=False)

    Sma50100 = models.BooleanField("SMA 50 / 100 Strategy", default=False)

    PortfolioValue = models.FloatField("Portfolio Value", default=0.0)
    InvestedValue = models.FloatField("Invested Value", default=0.0)

    DayProjectedValue = models.FloatField("Day Projected Value", default=0.0)
    WeekProjectedValue = models.FloatField("Week Projected Value", default=0.0)
    MonthProjectedValue = models.FloatField("Month Projected Value", default=0.0)

    Portfolio = models.TextField("Portfolio", default="")