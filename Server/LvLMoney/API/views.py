from rest_framework.decorators import api_view
from rest_framework.response import Response
import Authentication.register
import Authentication.login


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
