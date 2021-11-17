import requests
from bs4 import BeautifulSoup
import pandas as pd
import io
import requests
import os
import sqlite3
import model_creation


def get_nifty50():
    url = "https://archives.nseindia.com/content/indices/ind_nifty50list.csv"
    response = requests.get(url).content
    return pd.read_csv(io.StringIO(response.decode("utf-8")))


def table_create(connection):
    connection.execute(
        "CREATE TABLE TICKERS (CODE VARCHAR(250) NOT NULL, COMPANY VARCHAR(50) NOT NULL, PREDICTIONDAY VARCHAR(50), PREDICTIONWEEK VARCHAR(50), PREDICTIONMONTH VARCHAR(50));"
    )


def table_addition(connection, data):
    for i in data.iterrows():
        connection.execute(
            "INSERT INTO TICKERS (CODE ,COMPANY) VALUES ('{}','{}')".format(
                i[1][2].replace("'", ""), i[1][0].replace("'", "")
            )
        )
        connection.commit()


def database_init():
    open("Databases//tickerdb.sqlite3", "a").close()
    data = get_nifty50()

    con = sqlite3.connect("Databases//tickerdb.sqlite3")
    table_create(con)

    table_addition(con, data)
    con.close()


def search_and_add(ticker):
    con = sqlite3.connect("Databases//tickerdb.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT * FROM TICKERS WHERE CODE = '{}'".format(ticker))
    rows = cur.fetchall()

    if len(rows) == 0:
        return add_new_ticker(ticker, con)
    else:
        return rows


def add_new_ticker(ticker, connection):
    response = requests.get(
        "https://finance.yahoo.com/quote/{ticker}.NS?p={ticker}.NS".format(
            ticker=ticker
        ),
        timeout=5,
    ).content
    parser = BeautifulSoup(response, "html.parser")
    name = list(parser.find_all(class_="D(ib) Fz(18px)")[0].stripped_strings)[0]
    name = name.split(" (")[0]

    connection.execute(
        "INSERT INTO TICKERS (CODE ,COMPANY) VALUES ('{}','{}')".format(
            ticker.replace("'", ""), name.replace("'", "")
        )
    )
    connection.commit()
    return [(ticker, name, None, None, None)]

    con.close()


def add_prediction(Code, PredictionDay, PredictionWeek, PredictionMonth):
    con = sqlite3.connect("Databases//tickerdb.sqlite3")
    cur = con.cursor()
    cur.execute(
        "UPDATE TICKERS SET PREDICTIONDAY='{PredictionDay}', PREDICTIONWEEK='{PredictionWeek}', PREDICTIONMONTH='{PredictionMonth}' WHERE CODE='{Code}'".format(
            PredictionDay=PredictionDay,
            PredictionWeek=PredictionWeek,
            PredictionMonth=PredictionMonth,
            Code=Code,
        )
    )
    con.commit()
    con.close()


def db_train():
    con = sqlite3.connect("Databases//tickerdb.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT * FROM TICKERS")
    rows = cur.fetchall()
    for i in rows:
        Code = i[0]
        Company = i[1]
        PredictionDay = model_creation.start_train(Code, "Day")
        PredictionWeek = model_creation.start_train(Code, "Week")
        PredictionMonth = model_creation.start_train(Code, "Month")
        print(Code, Company, PredictionDay, PredictionWeek, PredictionMonth)
        add_prediction(Code, PredictionDay, PredictionWeek, PredictionMonth)
    con.close()


def auto_train(ticker=None):
    if "tickerdb.sqlite3" in os.listdir("Databases"):
        pass
    else:
        database_init()

    if ticker == None:
        db_train()
    else:
        Code, Company, PredictionDay, PredictionWeek, PredictionMonth = search_and_add(
            ticker
        )[0]
        print(Code, Company, PredictionDay, PredictionWeek, PredictionMonth)
        if PredictionDay == None:
            PredictionDay = model_creation.start_train(Code, "Day")
            PredictionWeek = model_creation.start_train(Code, "Week")
            PredictionMonth = model_creation.start_train(Code, "Month")
            add_prediction(Code, PredictionDay, PredictionWeek, PredictionMonth)
            return PredictionDay, PredictionWeek, PredictionMonth
        return PredictionDay, PredictionWeek, PredictionMonth


auto_train()