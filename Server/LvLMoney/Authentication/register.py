from API.models import AuthenticationDB
import Authentication.security
import Authentication.emails


def register_stage_one(request):
    """
    This function handles the checks for email and phone number duplicates in the database
    """
    if validate_field("Email", request["EmailID"]) and validate_field(
        "PhoneNo", request["PhoneNumber"]
    ):
        return True
    return False


def register_stage_two(request):
    """
    This function handles the checks for Username duplicates in the database.
    If Unique, hashes and adds all user details to database.
    """
    if validate_field("Username", request["Username"]):
        AuthenticationDB.objects.create(
            Username=Authentication.security.hash_details(request["Username"]),
            Password=Authentication.security.hash_details(request["Password"]),
            FirstName=request["FirstName"],
            LastName=request["LastName"],
            Email=request["EmailID"],
            PhoneNumber=request["PhoneNumber"],
        )
        Authentication.emails.registration_email(
            request["FirstName"], request["EmailID"]
        )
        return True
    return False


def register_stage_three(request):
    """
    This function handles the checks if the User has TwoFA enabled Previously.
    If it isnt enabled, returns a provisioning link
    """
    if validate_field("TwoFA", request["Username"]):
        ProvisionLink = Authentication.security.create_two_factor(
            Authentication.security.hash_details(request["Username"]),
            Authentication.security.hash_details(request["Password"]),
            AuthenticationDB.objects.get(
                Username=Authentication.security.hash_details(request["Username"])
            ).Email,
        )
        return ProvisionLink
    return False


def register_stage_four(request):
    """
    This function checks if the TOTP code is correct.
    If correct, TwoFA is enabled.
    """
    if request["TOTP"] == Authentication.security.two_factor_now(
        Authentication.security.hash_details(request["Username"]),
        Authentication.security.hash_details(request["Password"]),
    ):
        AuthenticationDB.objects.filter(
            Username=Authentication.security.hash_details(request["Username"])
        ).update(TwoFactorEnabled=True)
        return True
    return False


def validate_field(Component, Value):
    """
    This function checks for duplicates in the database
    """
    if Component == "Email" and AuthenticationDB.objects.filter(Email=Value).exists():
        return False
    elif (
        Component == "PhoneNo"
        and AuthenticationDB.objects.filter(PhoneNumber=Value).exists()
    ):
        return False
    elif (
        Component == "Username"
        and AuthenticationDB.objects.filter(
            Username=Authentication.security.hash_details(Value)
        ).exists()
    ):
        return False
    elif (
        Component == "TwoFA"
        and AuthenticationDB.objects.filter(
            Username=Authentication.security.hash_details(Value)
        ).exists()
    ) == True:
        if (
            AuthenticationDB.objects.get(
                Username=Authentication.security.hash_details(Value)
            ).TwoFactorEnabled
            == True
        ):
            return False
        return True
    return False
