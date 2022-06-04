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
        prev=re.search('class=\"P6K39c\".*[0-9]+,[0-9]*\\.[0-9]+', t)

        y=re.findall('[0-9]+,[0-9]*\.[0-9]+',str(x))
        indice_value=re.sub("[^\d\.]", "", y[0])

        prevC=re.findall('[0-9]+,[0-9]*\.[0-9]+',str(prev))
        prev_close=re.sub("[^\d\.]", "", prevC[0])

        # values.append(y[0])
        if "NIFTY_50" in i:
            values["NIFTY50"] = float(indice_value)
            values["NIFTY50_prev"] = float(prev_close)
        elif "NIFTY_BANK" in i:
            values["NIFTYBANK"] = float(indice_value)
            values["NIFTYBANK_prev"] = float(prev_close)
        elif "SENSEX" in i:
            values["SENSEX"] = float(indice_value)
            values["SENSEX_prev"] = float(prev_close)

    return values