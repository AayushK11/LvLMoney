import os
import warnings

warnings.filterwarnings("ignore")
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
from nsepy import get_history, get_index_pe_history
from datetime import datetime
from dateutil.relativedelta import *
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM

# Parameters Required : Close, Prev Close Price, Volume, 50DMA, RSI14, VWAP, India Vix
scalerTable = MinMaxScaler(feature_range=(0, 1))
scalerClose = MinMaxScaler(feature_range=(0, 1))
pca = PCA(n_components=1)


def get_data(symbol):
    data = get_ohlc(symbol)
    data = data.filter(["Date", "Prev Close", "VWAP", "Volume", "Close"])
    data = calculate_dma(data)
    data = calculate_rsi(data)
    data = get_indiavix(data)
    data = data.iloc[49:]
    data.reset_index(inplace=True, drop=True)
    return data


def get_ohlc(symbol):
    return get_history(
        symbol=symbol,
        start=(datetime.today() - relativedelta(days=415)),
        end=datetime.today(),
    )


def calculate_dma(data):
    data["50DMA"] = data.iloc[:, 0].rolling(window=50).mean()
    return data


def calculate_rsi(data):
    close_delta = data["Close"].diff()
    up = close_delta.clip(lower=0)
    down = -1 * close_delta.clip(upper=0)

    ma_up = up.rolling(window=14).mean()
    ma_down = down.rolling(window=14).mean()

    rsi = ma_up / ma_down
    rsi = 100 - (100 / (1 + rsi))

    data["RSI14"] = rsi
    return data


def get_indiavix(data):
    indiavix = get_history(
        symbol="INDIAVIX",
        start=(datetime.today() - relativedelta(days=415)),
        end=datetime.today(),
        index=True,
    )
    indiavix.dropna(inplace=True)
    data["IndiaVix"] = indiavix.Close
    return data


def perform_pca(data):
    data[list(data.columns)] = scalerTable.fit_transform(data[data.columns.tolist()])
    return pca.fit_transform(data)


def format_X(data):
    x_data = []
    for i in range(7, len(data)):
        x_data.append(data[i - 7 : i, 0])

    x_data = np.array(x_data)
    x_data = np.reshape(x_data, (x_data.shape[0], x_data.shape[1], 1))
    return x_data


def format_Y(data):
    return np.array(data[7:])


def generate_model(X_data, Y_data):
    model = Sequential()
    model.add(
        LSTM(
            units=64,
            return_sequences=True,
            input_shape=(X_data.shape[1], X_data.shape[2]),
        )
    )
    model.add(LSTM(units=64, return_sequences=False))
    model.add(Dense(units=16))
    model.add(Dense(units=1))

    model.compile(optimizer="adam", loss="mean_squared_error")

    model.fit(X_data, Y_data, batch_size=32, epochs=50)

    return model


def pop_and_replace(X_data, Y_data):
    X_data = np.delete(X_data[-1], 0)
    X_data = np.append(X_data, Y_data[-1])
    X_data = np.array(X_data)
    print(X_data)
    X_data = np.reshape(X_data, (1, X_data.shape[0], 1))
    return X_data


if __name__ == "__main__":
    symbol = "ZOMATO"
    data = get_data(symbol)

    X_data = perform_pca(
        data.filter(["Prev Close", "VWAP", "Volume", "50DMA", "RSI14", "IndiaVix"])
    )
    Y_data = scalerClose.fit_transform(np.reshape(data["Close"].values, (-1, 1)))

    X_data = format_X(X_data)
    Y_data = format_Y(Y_data)

    model = generate_model(X_data, Y_data)
    model.save("model.h5")

    X_data = pop_and_replace(X_data, Y_data)

    Y_pred = scalerClose.inverse_transform(model.predict(X_data))
    print("{} will be {:.2f} tomorrow".format(symbol, Y_pred[0][0]))
