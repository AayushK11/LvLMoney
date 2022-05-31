import requests
import re


def get_major_indices():
    link= [
        'https://www.google.com/finance/quote/NIFTY_50:INDEXNSE',
        'https://www.google.com/finance/quote/NIFTY_BANK:INDEXNSE',
        'https://www.google.com/finance/quote/SENSEX:INDEXBOM',
    ]

    values = {"NIFTY50":0, "NIFTYBANK":0, "SENSEX":0}

    for i in link:
        r = requests.get(i)
        t = r.text
        x = re.search("class=\"YMlKec fxKbKc\".*[0-9]+,[0-9]*\\.[0-9]+", t)
        y=re.findall('[0-9]+,[0-9]*\.[0-9]+',str(x))
        # values.append(y[0])
        if "NIFTY_50" in i:
            values["NIFTY50"] = y[0]
        elif "NIFTY_BANK" in i:
            values["NIFTYBANK"] = y[0]
        elif "SENSEX" in i:
            values["SENSEX"] = y[0]

    return values