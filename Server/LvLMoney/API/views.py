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
import Extras.get_indices
import Extras.stock_details


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
    return Response({"Index": float(Index), "Day": Day})


@api_view(["GET"])
def sectorleaders(request):
    return Response(Model.SectorRanking.auto_fetch.sector_leaders("Fetch"))


@api_view(["GET"])
def getstocks(request):
    data = Extras.getstocks_list.get_stocks()
    return Response({"data": data})


@api_view(["GET"])
def getIndices(request):
    data = Extras.get_indices.get_major_indices()
    return Response(data)


@api_view(["POST"])
def search(request):
    """
    This function returns the stock details.
    """
    if request.data["purpose"] == "Search":
        requestedStock = request.data["stock"]
        if requestedStock in Extras.stock_details.return_symbols():
            (Day, Week, Month, Last, _, _) = Model.Forecasting.auto_train.auto_train(
                requestedStock
            )
            logo = Extras.stock_details.return_logo(requestedStock)
            company = Extras.stock_details.return_company(requestedStock)
            return Response(
                {
                    "message": "Found",
                    "logo": logo,
                    "company": company,
                    "day": Day,
                    "week": Week,
                    "month": Month,
                    "last": Last,
                }
            )
        else:
            return Response({"message": "Stock Does Not Exist"})
    else:
        try:
            requestedStock = request.data["stockCode"]
            if requestedStock in Extras.stock_details.return_symbols():
                email = request.data["email"]

                (
                    Day,
                    Week,
                    Month,
                    Last,
                    Date,
                    _,
                ) = Model.Forecasting.auto_train.auto_train(requestedStock)
                logo = Extras.stock_details.return_logo(requestedStock)
                company = Extras.stock_details.return_company(requestedStock)

                quantity = 0
                buying_price = 0
                user = Authentication.userdetails.userportfolio(email)

                for i in user.Portfolio.split(";"):
                    if i.split(",")[0] == requestedStock:
                        quantity = i.split(",")[1]
                        buying_price = i.split(",")[2]

                Change = 0
                try:
                    Change = round(
                        ((float(Last) - float(buying_price)) / float(buying_price))
                        * 100,
                        2,
                    )
                except ZeroDivisionError:
                    Change = 0

                DayChange = 0
                try:
                    DayChange = round(
                        ((float(Day) - float(Last)) / float(Last)) * 100,
                        2,
                    )
                except ZeroDivisionError:
                    DayChange = 0

                WeekChange = 0
                try:
                    WeekChange = round(
                        ((float(Week) - float(Last)) / float(Last)) * 100,
                        2,
                    )
                except ZeroDivisionError:
                    WeekChange = 0

                MonthChange = 0
                try:
                    MonthChange = round(
                        ((float(Month) - float(Last)) / float(Last)) * 100,
                        2,
                    )
                except ZeroDivisionError:
                    MonthChange = 0

                return Response(
                    {
                        "message": "Success",
                        "stock": requestedStock,
                        "company": company,
                        "logo": logo,
                        "quantity": quantity,
                        "buyingprice": str(round(float(buying_price), 2)),
                        "Change": Change,
                        "Day": Day,
                        "DayChange": DayChange,
                        "Week": Week,
                        "WeekChange": WeekChange,
                        "Month": Month,
                        "MonthChange": MonthChange,
                        "Last": Last,
                        "Date": Date,
                    }
                )
            else:
                return Response({"message": "Stock Does Not Exist"})
        except IndexError:
            return Response({"message": "Stock Does Not Exist"})


@api_view(["POST"])
def addstock(request):
    """
    This function adds a stock to user Portfolio.
    """
    try:
        quantity = int(request.data["quantity"])
        stock = request.data["stock"]
        buying_price = float(request.data["buyingprice"])

        user = Authentication.userdetails.userportfolio(request.data["email"])

        Portfolio = user.Portfolio.split(";")

        for i in Portfolio:
            if i.split(",")[0] == stock:
                Portfolio_temp = user.Portfolio.split(";")
                Portfolio_temp.remove("")

                for i in range(len(Portfolio_temp)):
                    if Portfolio_temp[i].split(",")[0] == stock:

                        quantity_update = int(Portfolio_temp[i].split(",")[1]) + int(
                            quantity
                        )
                        old_value = float(Portfolio_temp[i].split(",")[2]) * int(
                            Portfolio_temp[i].split(",")[1]
                        )
                        new_value = float(buying_price) * int(quantity)
                        new_average = (old_value + new_value) / quantity_update

                        Portfolio_temp[i] = (
                            stock
                            + ","
                            + str(quantity_update)
                            + ","
                            + str(new_average)
                            + ";"
                        )

                        user.Portfolio = ";".join(Portfolio_temp)

                        user.save()

                        return Response({"message": "Added to Portfolio"})

        else:
            if stock in Extras.stock_details.return_symbols():

                user.Portfolio += (
                    str(stock) + "," + str(quantity) + "," + str(buying_price) + ";"
                )
                user.save()

                return Response({"message": "Added to Portfolio"})

            else:
                return Response({"message": "Stock Does Not Exist"})
    except:
        return Response({"message": "User Does Not Exist"})


@api_view(["POST"])
def removestock(request):
    """
    This function removes a stock from user Portfolio.
    """
    try:
        stock = request.data["stock"]
        email = request.data["email"]

        user = Authentication.userdetails.userportfolio(email)

        Portfolio_temp = user.Portfolio.split(";")
        Portfolio_temp.remove("")

        for i in range(len(Portfolio_temp)):
            if Portfolio_temp[i].split(",")[0] == stock:

                Portfolio_temp[i] = ""

        user.Portfolio = ";".join(Portfolio_temp)
        user.save()

        return Response({"message": "Removed from Portfolio"})
    except:
        return Response({"message": "User Does Not Exist"})


@api_view(["POST"])
def loginFolio(request):
    """
    This function takes in User Details and Logs him/her into the database.
    """
    try:
        if Authentication.login.login_folio(
            request.data["email"], request.data["password"]
        ):
            user = Authentication.userdetails.userportfolio(request.data["email"])
            Portfolio = user.Portfolio.split(";")

            arr_main = []
            dict_main = {}
            user.PortfolioValue = 0.0
            user.DayProjectedValue = 0.0
            user.WeekProjectedValue = 0.0
            user.MonthProjectedValue = 0.0
            user.InvestedValue = 0.0

            for i in range(len(Portfolio)):
                if Portfolio[i] != "":
                    (
                        Day,
                        Week,
                        Month,
                        Last,
                        Date,
                        _,
                    ) = Model.Forecasting.auto_train.auto_train(
                        Portfolio[i].split(",")[0]
                    )

                    dict_main["Symbol"] = Portfolio[i].split(",")[0]
                    dict_main["Quantity"] = Portfolio[i].split(",")[1]
                    dict_main["Invested"] = round(
                        float(Portfolio[i].split(",")[2])
                        * float(Portfolio[i].split(",")[1]),
                        2,
                    )

                    dict_main["Company"] = Extras.stock_details.return_company(
                        Portfolio[i].split(",")[0]
                    )
                    dict_main["Logo"] = Extras.stock_details.return_logo(
                        Portfolio[i].split(",")[0]
                    )

                    dict_main["LastClose"] = Last
                    dict_main["Gain"] = round(
                        (
                            float(dict_main["LastClose"])
                            - float(Portfolio[i].split(",")[2])
                        )
                        * int(Portfolio[i].split(",")[1]),
                        2,
                    )
                    dict_main["Change"] = round(
                        (dict_main["Gain"] / dict_main["Invested"]) * 100, 2
                    )

                    user.PortfolioValue += round(
                        float(Last) * int(Portfolio[i].split(",")[1]), 2
                    )
                    user.DayProjectedValue += round(
                        float(Day) * int(Portfolio[i].split(",")[1]), 2
                    )
                    user.WeekProjectedValue += round(
                        float(Week) * int(Portfolio[i].split(",")[1]), 2
                    )
                    user.MonthProjectedValue += round(
                        float(Month) * int(Portfolio[i].split(",")[1]), 2
                    )
                    user.InvestedValue += round(
                        float(Portfolio[i].split(",")[2])
                        * int(Portfolio[i].split(",")[1]),
                        2,
                    )

                    arr_main.append(dict_main)
                    dict_main = {}

            change = 0.0
            try:
                change = user.PortfolioValue - user.InvestedValue
                change = change / user.InvestedValue
                change = change * 100
                change = round(change, 2)
            except ZeroDivisionError:
                change = 0.0

            medium = 0.0
            try:
                medium = user.WeekProjectedValue - user.InvestedValue
                medium = medium / user.InvestedValue
                medium = medium * 100
                medium = medium - change
                medium = round(medium, 2)
            except ZeroDivisionError:
                medium = 0.0

            long = 0.0
            try:
                long = user.MonthProjectedValue - user.InvestedValue
                long = long / user.InvestedValue
                long = long * 100
                long = long - change
                long = round(long, 2)
            except ZeroDivisionError:
                long = 0.0

            user.save()

            print(round(user.PortfolioValue, 2), arr_main)

            return Response(
                {
                    "message": "Login Successful",
                    "firstname": user.FirstName,
                    "lastname": user.LastName,
                    "portfoliovalue": round(user.PortfolioValue, 2),
                    "investedvalue": round(user.InvestedValue, 2),
                    "portfolio": arr_main,
                    "change": change,
                    "medium": medium,
                    "long": long,
                }
            )
        else:
            return Response({"message": "Login Unsuccessful"})
    except:
        return Response({"message": "Login Unsuccessful"})
