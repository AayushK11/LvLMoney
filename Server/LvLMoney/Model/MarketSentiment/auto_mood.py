import requests
from bs4 import BeautifulSoup
import pandas as pd
import io
import requests
import os
import sqlite3
import Model.MarketSentiment.market_mood


def table_create(connection):
    connection.execute(
        """CREATE TABLE MARKETMOOD ( 
            MOODINDEX VARCHAR(50), 
            PREVDATE VARCHAR(50));"""
    )


def database_init():
    open("Databases//mooddb.sqlite3", "a").close()
    con = sqlite3.connect("Databases//mooddb.sqlite3")
    table_create(con)
    con.close()


def add_prediction(MoodIndex, PrevDate):
    con = sqlite3.connect("Databases//mooddb.sqlite3")
    con.execute("""DELETE FROM MARKETMOOD;""")
    con.execute(
        """INSERT INTO MARKETMOOD (MOODINDEX ,PREVDATE) 
        VALUES ('{}','{}')""".format(
            MoodIndex, PrevDate
        )
    )
    con.commit()
    con.close()


def read_from_db():
    con = sqlite3.connect("Databases//mooddb.sqlite3")
    cur = con.cursor()
    cur.execute("""SELECT * FROM MARKETMOOD""")
    row = cur.fetchall()
    con.close()

    return row[0]


def auto_train(requirement=None):
    if "mooddb.sqlite3" in os.listdir("Databases"):
        pass
    else:
        database_init()

    if requirement == None:
        print("---->Starting Auto-Update -- Mood")
        MoodIndex, PrevDate = Model.MarketSentiment.market_mood.market_mood()
        add_prediction(MoodIndex, PrevDate)
        print("---->Auto-Update Complete -- Mood")
    else:
        return read_from_db()
