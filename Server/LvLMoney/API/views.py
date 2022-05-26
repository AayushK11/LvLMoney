from rest_framework.decorators import api_view
from rest_framework.response import Response
import Authentication.register
import Authentication.login
import Authentication.forgotpassword
import Authentication.userdetails
import Support.google_sheets
import Model.Forecasting.auto_train
import Model.MarketSentiment.auto_mood
import Model.SectorRanking.auto_fetch
import Extras.getstocks_list


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


@api_view(["POST"])
def dashboard(request):
    if "UserImage" == request.data["Requirement"]:
        Image, Name = Authentication.userdetails.userimage(request.data)
        if str(Image) == "":
            return Response({"Image": "No Image", "Name": Name})
        else:
            return Response({"Image": Image.url, "Name": Name})


@api_view(["POST"])
def forecast(request):
    (
        Day,
        Week,
        Month,
        PrevClose,
        PrevDate,
        Company,
    ) = Model.Forecasting.auto_train.auto_train(request.data["TickerName"])
    if Company == "":
        Company = request.data["TickerName"]
    return Response(
        {
            "Day": (
                round(float(Day), 2) if "Insufficient data for" not in Day else Day
            ),
            "Week": (
                round(float(Week), 2) if "Insufficient data for" not in Week else Week
            ),
            "Month": (
                round(float(Month), 2)
                if "Insufficient data for" not in Month
                else Month
            ),
            "PrevClose": (
                round(float(PrevClose), 2)
                if "Insufficient data for" not in PrevClose
                else PrevClose
            ),
            "PrevDate": PrevDate,
            "Company": Company,
        }
    )


@api_view(["GET"])
def marketmood(request):
    Index, Day = Model.MarketSentiment.auto_mood.auto_train(requirement="Fetch")
    return Response({"Index": Index, "Day": Day})


@api_view(["GET"])
def sectorleaders(request):
    return Response(Model.SectorRanking.auto_fetch.sector_leaders("Fetch"))

@api_view(["GET"])
def getstocks(request):
    data=Extras.getstocks_list.get_stocks() 
    return Response({'data':data})
