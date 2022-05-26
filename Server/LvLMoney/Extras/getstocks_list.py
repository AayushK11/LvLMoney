import pandas as pd


def get_stocks():
    data=pd.read_csv("Databases\ind_nifty50list.csv")
    return data.values.tolist()