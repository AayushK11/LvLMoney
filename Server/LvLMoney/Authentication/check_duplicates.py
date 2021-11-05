from API.models import AuthenticationDB
import re


def register_stage_one(request):
    """
    This function handles the checks for email and phone number duplicates in the database
    """
    if validate_field(request["EmailID"]) and validate_field(request["PhoneNumber"]):
        return True
    return False


def validate_field(Value):
    """
    This function checks for duplicates in the database
    """
    if AuthenticationDB.objects.filter(Email=Value).exists():
        return False
    elif AuthenticationDB.objects.filter(PhoneNumber=Value).exists():
        return False
    return True
