import os
import warnings

warnings.filterwarnings("ignore")
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
from nsepy import get_history, get_index_pe_history
from datetime import datetime
from dateutil.relativedelta import *
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from keras.callbacks import EarlyStopping

scalerTable = MinMaxScaler(feature_range=(0, 1))
scalerClose = MinMaxScaler(feature_range=(0, 1))
pca = PCA(n_components=1)


def get_data():
    data = get_nifty()
    data = get_indiavix(data)
    data = get_nifty_pe(data)
    data = data.dropna()
    # data.reset_index(inplace=True, drop=True)
    return data


def get_nifty():
    nifty = get_history(
        symbol="NIFTY",
        start=(datetime.today() - relativedelta(days=60)),
        end=datetime.today(),
        index=True,
    )
    nifty.rename(
        columns={
            "Open": "NiftyOpen",
            "Close": "NiftyClose",
            "High": "NiftyHigh",
            "Low": "NiftyLow",
            "Volume": "NiftyVolume",
        },
        inplace=True,
    )
    nifty.drop(columns={"Turnover"}, inplace=True)
    return nifty


def get_indiavix(data):
    indiavix = get_history(
        symbol="INDIAVIX",
        start=(datetime.today() - relativedelta(days=60)),
        end=datetime.today(),
        index=True,
    )
    indiavix.drop(columns={"Change", "%Change"}, inplace=True)
    data = pd.concat([data, indiavix], axis=1, sort=False)
    data.rename(
        columns={
            "Open": "IndiaVixOpen",
            "High": "IndiaVixHigh",
            "Low": "IndiaVixLow",
            "Close": "IndiaVixClose",
            "Previous": "IndiaVixPreviousClose",
        },
        inplace=True,
    )
    return data


def get_nifty_pe(data):
    niftype = get_index_pe_history(
        symbol="NIFTY",
        start=(datetime.today() - relativedelta(days=60)),
        end=datetime.today(),
    )
    niftype.drop(columns={"Div Yield"}, inplace=True)
    data = pd.concat([data, niftype], axis=1, sort=False)
    data.rename(
        columns={
            "P/E": "Nifty P/E",
            "P/B": "Nifty P/B",
        },
        inplace=True,
    )
    return data


def normalize_data(data):
    data[list(data.columns)] = scalerTable.fit_transform(data[data.columns.tolist()])
    data = pca.fit_transform(data)
    return data


def normalize_y(data):
    return scalerClose.fit_transform(np.reshape(data.values, (-1, 1)))


def iterate_data_x(data):
    x_data = []

    for i in range(5, len(data)):
        x_data.append(data[i - 5 : i, 0])

    x_data = np.array(x_data)

    x_data = np.reshape(x_data, (x_data.shape[0], x_data.shape[1], 1))
    return x_data


def iterate_data_y(data):
    return np.array(data[5:])


def generate_model(X_data, Y_data):
    model = Sequential()
    model.add(LSTM(units=128, return_sequences=True))
    model.add(LSTM(units=64, return_sequences=True))
    model.add(LSTM(units=32, return_sequences=False))
    model.add(Dense(units=16))
    model.add(Dense(units=1))

    es = EarlyStopping(monitor="loss", mode="min", verbose=0, patience=15)
    model.compile(optimizer="adam", loss="mean_absolute_error")

    model.fit(X_data, Y_data, batch_size=16, epochs=500, verbose=0, callbacks=[es])

    return model


def future_replace(X_data, Y_data):
    X_data = np.delete(X_data[-1], 0)
    X_data = np.append(X_data, Y_data[0])
    X_data = np.array(X_data)
    X_data = np.reshape(X_data, (1, X_data.shape[0], 1))
    return X_data


def calculate_mood(PrevVix, Vix):
    DifferencePercent = Vix - PrevVix
    DifferencePercent = DifferencePercent - (-5) / (5 - (-5)) * (100 - 0) + 0
    return round(DifferencePercent, 2)


def market_mood():
    data = get_data()
    IndiaVixClose = data["IndiaVixClose"]
    PrevDate = data.index[-1]

    data = normalize_data(data.drop("IndiaVixClose", axis=1))
    IndiaVixClose = normalize_y(IndiaVixClose)

    X_data = iterate_data_x(data)
    Y_data = iterate_data_y(IndiaVixClose)

    model = generate_model(X_data, Y_data)

    X_pred = future_replace(X_data, Y_data[-1])
    Y_pred = model.predict(X_pred)

    return (
        str(
            calculate_mood(
                scalerClose.inverse_transform(Y_pred)[0][0],
                scalerClose.inverse_transform(np.reshape(IndiaVixClose[-1], (-1, 1)))[
                    0
                ][0],
            )
        ),
        str(PrevDate),
    )
