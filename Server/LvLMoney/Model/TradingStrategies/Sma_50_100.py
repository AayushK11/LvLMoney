import requests
import pandas as pd
import io
import requests
from nsepy import get_history
from datetime import datetime
from dateutil.relativedelta import *
import warnings
from API.models import AuthenticationDB
from Authentication.emails import sma_50_100_email

warnings.filterwarnings("ignore", category=RuntimeWarning)


def get_nifty100():
    url = "https://archives.nseindia.com/content/indices/ind_nifty100list.csv"
    response = requests.get(url).content
    return pd.read_csv(io.StringIO(response.decode("utf-8")))


def format_data(data):
    return data["Symbol"].values


def get_close(data):
    close = get_history(
        symbol=data,
        start=(datetime.today() - relativedelta(days=150)),
        end=datetime.today(),
    )
    return close["Close"].values


def get_sma(data, length):
    return round(data[-length:].mean(), 2)


def get_prevsma(data, length):
    return round(data[-length - 1 : -1].mean(), 2)


def iterate_and_calculate(data):
    Buy = []
    Sell = []

    for i in data:
        close_data = get_close(i)
        sma50 = get_sma(close_data, 50)
        sma100 = get_sma(close_data, 100)
        prev_sma50 = get_prevsma(close_data, 50)
        prev_sma100 = get_prevsma(close_data, 100)

        if prev_sma50 <= prev_sma100 and sma50 > sma100:
            Buy.append(i)
        elif prev_sma50 >= prev_sma100 and sma50 < sma100:
            Sell.append(i)

    return Buy, Sell


def format_output(Indices, Condition):
    if len(Indices) == 0:
        return "No {} Recommendations for Today".format(Condition)
    else:
        return "{} : ".format(Condition) + ", ".join(Indices)


def get_subscribed_users(Buy, Sell):
    Users = AuthenticationDB.objects.filter(Sma50100=True).values("Email")
    UserList = []
    for i in Users:
        UserList.append(i["Email"])

    Date = datetime.today().strftime("%d-%m-%y")

    sma_50_100_email(Buy, Sell, Date, UserList)


def find_new_stocks():
    print("--->Finding New Stocks Based on 50 / 100 SMA Crossover....")
    data = get_nifty100()
    data = format_data(data)
    Buy, Sell = iterate_and_calculate(data)
    Buy = format_output(Buy, "Buy")
    Sell = format_output(Sell, "Sell")
    get_subscribed_users(Buy, Sell)
