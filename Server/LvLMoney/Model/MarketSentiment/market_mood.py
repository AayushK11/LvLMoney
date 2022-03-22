from bs4 import BeautifulSoup
import requests
from nsepy import get_history
from datetime import datetime
from dateutil.relativedelta import *


def get_data():
    url = "https://www.tickertape.in/market-mood-index"
    response = requests.get(url, timeout=5)
    parser = BeautifulSoup(response.text, "html.parser")
    name = parser.find_all(class_="number")[0]
    name = list(name.stripped_strings)[0]
    return name


def get_last_data():
    data = get_history(
        "NIFTY",
        index=True,
        start=datetime.today() - relativedelta(days=7),
        end=datetime.today(),
    )
    return datetime.strftime(data.index.values[-1], "%d-%m-%Y")


def market_mood():
    return (get_data(), get_last_data())
