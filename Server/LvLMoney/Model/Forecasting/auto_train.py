import requests
from bs4 import BeautifulSoup
import pandas as pd
import io
import requests
import os
import sqlite3
import Model.Forecasting.model_creation


def get_nifty50():
    url = "https://archives.nseindia.com/content/indices/ind_nifty50list.csv"
    response = requests.get(url).content
    df = pd.read_csv(io.StringIO(response.decode("utf-8")))
    removeElements = ["HDFCLIFE", "SBILIFE"]
    df = df[~df["Symbol"].isin(removeElements)]
    return df


def table_create(connection):
    connection.execute(
        """CREATE TABLE TICKERS (
            CODE VARCHAR(250) NOT NULL, 
            COMPANY VARCHAR(50) NOT NULL, 
            PREDICTIONDAY VARCHAR(50), 
            PREDICTIONWEEK VARCHAR(50), 
            PREDICTIONMONTH VARCHAR(50),
            PREVCLOSE VARCHAR(50),
            PREVDATE VARCHAR(50));"""
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
    cur.execute("SELECT * FROM TICKERS WHERE CODE = '{}'".format(ticker.upper()))
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
    name = ""
    try:
        name = list(parser.find_all(class_="D(ib) Fz(18px)")[0].stripped_strings)[0]
        name = name.split(" (")[0]
    except:
        pass

    connection.execute(
        "INSERT INTO TICKERS (CODE ,COMPANY) VALUES ('{}','{}')".format(
            ticker.replace("'", "").upper(), name.replace("'", "")
        )
    )
    connection.commit()
    return [(ticker, name, None, None, None, None, None)]

    con.close()


def add_prediction(
    Code, PredictionDay, PredictionWeek, PredictionMonth, PrevClose, PrevDate
):
    con = sqlite3.connect("Databases//tickerdb.sqlite3")
    cur = con.cursor()
    cur.execute(
        """UPDATE TICKERS SET 
        PREDICTIONDAY='{PredictionDay}', 
        PREDICTIONWEEK='{PredictionWeek}', 
        PREDICTIONMONTH='{PredictionMonth}',
        PREVCLOSE='{PrevClose}',
        PREVDATE='{PrevDate}' 
        WHERE CODE='{Code}'""".format(
            PredictionDay=PredictionDay,
            PredictionWeek=PredictionWeek,
            PredictionMonth=PredictionMonth,
            PrevClose=PrevClose,
            PrevDate=PrevDate,
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
        print("---->Training {}".format(Code))
        (
            [PredictionDay, PredictionWeek, PredictionMonth],
            PrevClose,
            PrevDate,
        ) = Model.Forecasting.model_creation.start_train(Code)
        add_prediction(
            Code, PredictionDay, PredictionWeek, PredictionMonth, PrevClose, PrevDate
        )
    con.close()


def clear_temp_values():
    con = sqlite3.connect("Databases//tickerdb.sqlite3")
    cur = con.cursor()
    cur.execute(
        """DELETE FROM TICKERS WHERE 
        PREDICTIONDAY LIKE 'Insufficient data%' AND 
        PREDICTIONWEEK LIKE 'Insufficient data%' AND 
        PREDICTIONMONTH LIKE 'Insufficient data%';"""
    )
    con.commit()


def auto_train(ticker=None):
    if "tickerdb.sqlite3" in os.listdir("Databases"):
        pass
    else:
        database_init()

    if ticker == None:
        print("---->Starting Auto-Update -- Stocks")
        db_train()
        clear_temp_values()
        print("---->Auto-Update Stocks Complete -- Stocks")
    else:
        (
            Code,
            Company,
            PredictionDay,
            PredictionWeek,
            PredictionMonth,
            PrevClose,
            PrevDate,
        ) = search_and_add(ticker)[0]
        if PredictionDay == None:
            print("---->Learning New Ticker")
            (
                [PredictionDay, PredictionWeek, PredictionMonth],
                PrevClose,
                PrevDate,
            ) = Model.Forecasting.model_creation.start_train(Code)
            add_prediction(
                Code,
                PredictionDay,
                PredictionWeek,
                PredictionMonth,
                PrevClose,
                PrevDate,
            )
            return (
                PredictionDay,
                PredictionWeek,
                PredictionMonth,
                str(PrevClose),
                str(PrevDate),
                str(Company),
            )
        return (
            PredictionDay,
            PredictionWeek,
            PredictionMonth,
            str(PrevClose),
            str(PrevDate),
            str(Company),
        )
