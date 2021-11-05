from rest_framework.decorators import api_view
from rest_framework.response import Response
import Authentication.check_duplicates


@api_view(["POST"])
def register(request):
    """
    This function takes in User Details and Registers him/her into the database.
    """
    if len(request.data.keys()) == 4 and "FirstName" in request.data.keys():
        if Authentication.check_duplicates.register_stage_one(request.data):
            return Response("Valid")
        else:
            return Response("Invalid")
