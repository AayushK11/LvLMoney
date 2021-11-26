import requests
from bs4 import BeautifulSoup
import pandas as pd
import io
import requests
import os
import sqlite3
import json


def get_index_constituents(index):
    url = "https://archives.nseindia.com/content/indices/ind_nifty{}list.csv".format(
        index
    )
    response = requests.get(url, timeout=5).content
    return pd.read_csv(io.StringIO(response.decode("utf-8")))


def get_market_cap(ticker):
    url = "https://www.google.com/finance/quote/{}:NSE".format(ticker)
    response = requests.get(url, timeout=5).content
    parser = BeautifulSoup(response, "html.parser")

    MarketCap = list(parser.find_all(class_="P6K39c")[3].stripped_strings)[0]
    MarketCap = MarketCap.split(" ")[0]
    if MarketCap[-1] == "T":
        MarketCap = float(MarketCap[:-1]) * 100000
    elif MarketCap[-1] == "B":
        MarketCap = float(MarketCap[:-1]) * 100
    return MarketCap


def database_init():
    open("Databases//sectordb.sqlite3", "a").close()
    con = sqlite3.connect("Databases//sectordb.sqlite3")
    table_create(con)
    con.close()


def table_create(connection):
    connection.execute(
        """CREATE TABLE SECTORLEADERS ( 
            SYMBOL VARCHAR(50), 
            SECTOR VARCHAR(50));"""
    )


def reset_table():
    con = sqlite3.connect("Databases//sectordb.sqlite3")
    con.execute("""DELETE FROM SECTORLEADERS;""")
    con.commit()
    con.close()


def table_insert(symbol, index):
    con = sqlite3.connect("Databases//sectordb.sqlite3")
    con.execute(
        """INSERT INTO SECTORLEADERS (SYMBOL ,SECTOR) 
        VALUES ('{}','{}')""".format(
            symbol, index
        )
    )
    con.commit()
    con.close()


def sector_leaders(requirement=None):
    if "sectordb.sqlite3" in os.listdir("Databases"):
        pass
    else:
        database_init()

    if requirement == None:
        reset_table()
        indices = [
            "auto",
            "bank",
            "finance",
            "fmcg",
            "it",
            "media",
            "metal",
            "pharma",
            "realty",
        ]
        print("---->Starting Auto-Update -- Sector Leaders")
        for i in indices:
            print("---->Finding Sector Leaders for {} Sector".format(i))
            data = get_index_constituents(i)
            data["Market Cap"] = data.apply(
                lambda x: get_market_cap(x["Symbol"]), axis=1
            )
            data.sort_values(by="Market Cap", ascending=False, inplace=True)
            data = data[:5]
            data.apply(lambda x: table_insert(x["Symbol"], x["Industry"]), axis=1)
        print("---->Auto-Update Complete -- Sector Leaders")
