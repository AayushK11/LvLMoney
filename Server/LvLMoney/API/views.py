from rest_framework.decorators import api_view
from rest_framework.response import Response
import Authentication.register
import Authentication.login
import Authentication.forgotpassword
import Support.google_sheets


@api_view(["POST"])
def register(request):
    """
    This function takes in User Details and Registers him/her into the database.
    """
    if len(request.data.keys()) == 2 and "EmailID" in request.data.keys():
        if Authentication.register.register_stage_one(request.data):
            return Response("Valid")
        else:
            return Response("Invalid")
    elif len(request.data.keys()) == 6 and "Username" in request.data.keys():
        if Authentication.register.register_stage_two(request.data):
            return Response("Valid")
        else:
            return Response("Invalid")
    elif len(request.data.keys()) == 2 and "Username" in request.data.keys():
        return Response(Authentication.register.register_stage_three(request.data))
    elif len(request.data.keys()) == 3 and "TOTP" in request.data.keys():
        if Authentication.register.register_stage_four(request.data):
            return Response("Valid")
        else:
            return Response("Invalid")
    return Response("Invalid Keys")


@api_view(["POST"])
def login(request):
    """
    This funtion takes in User Details and logs him/her in.
    """
    if len(request.data.keys()) == 2 and "Username" in request.data.keys():
        Status, TwoFA = Authentication.login.login_stage_one(request.data)
        return Response({"Status": Status, "TwoFA": TwoFA})
    if len(request.data.keys()) == 3 and "TwoFA" in request.data.keys():
        if Authentication.login.login_stage_two(request.data):
            return Response({"Status": True})
        return Response({"Status": False})
    return Response("Invalid Keys")


@api_view(["POST"])
def forgotpassword(request):
    """
    This funtion takes in User Details and logs him/her in.
    """
    if len(request.data.keys()) == 2 and "Email" in request.data.keys():
        Status = Authentication.forgotpassword.forgot_password_stage_one(request.data)
        if Status == "2FA":
            return Response({"Status": Status})
        elif Status == "Email":
            return Response({"Status": True})
        return Response({"Status": False})
    if len(request.data.keys()) == 3 and "TwoFA" in request.data.keys():
        Status = Authentication.forgotpassword.forgot_password_stage_two(request.data)
        return Response({"Status": Status})
    if len(request.data.keys()) == 3 and "NewPassword" in request.data.keys():
        Status = Authentication.forgotpassword.forgot_password_stage_three(request.data)
        return Response({"Status": Status})
    return Response({"Status": False})


@api_view(["POST"])
def contactus(request):
    """
    This funtion takes in User Details and places it in a google form
    """
    return Response(Support.google_sheets.insert_into_spreadsheet(request.data))
