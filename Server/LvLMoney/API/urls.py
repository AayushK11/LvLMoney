from django.urls import path
from API import views

urlpatterns = [
    path("register/", views.register),
    path("login/", views.login),
    path("forgotpassword/", views.forgotpassword),
    path("contactus/", views.contactus),
    path("dashboard/", views.dashboard),
    path("forecast/", views.forecast),
    path("marketmood/", views.marketmood),
    path("sectorleaders/", views.sectorleaders),
]
