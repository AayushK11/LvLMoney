from pathlib import Path
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import os
import codecs

# import LvLMoney.config

BASE_PATH = Path(__file__).parent.parent
# WEBSITE_PATH = "http://localhost:3000/"
WEBSITE_PATH = "https://lvlmoney.netlify.app/"


def registration_email(name, email):
    message = MIMEMultipart("alternative")
    message["subject"] = "Welcome to LvLMoney"
    message["to"] = email
    message["from"] = "lvlmoney2021@gmail.com"

    htmlfile = codecs.open(os.path.join(BASE_PATH, "Emails\\RegisterEmail.html"), "r")
    htmlfile = htmlfile.read().format(fname=name, link=WEBSITE_PATH)
    message.attach(MIMEText(htmlfile, "html"))

    image = open(os.path.join(BASE_PATH, "Media\\Logos\\LvLMoney.png"), "rb")
    logo = MIMEImage(image.read(), _subtype="png")
    image.close()
    logo.add_header("Content-ID", "<image1>")
    message.attach(logo)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "lvlmoney"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()


def forgot_password_email(name, email, username):
    message = MIMEMultipart("alternative")
    message["subject"] = "Forgot Password"
    message["to"] = email
    message["from"] = "lvlmoney2021@gmail.com"

    htmlfile = codecs.open(os.path.join(BASE_PATH, "Emails\\ForgotPassword.html"), "r")
    htmlfile = htmlfile.read().format(fname=name, link=WEBSITE_PATH, username=username)
    message.attach(MIMEText(htmlfile, "html"))

    image = open(os.path.join(BASE_PATH, "Media\\Logos\\LvLMoney.png"), "rb")
    logo = MIMEImage(image.read(), _subtype="png")
    image.close()
    logo.add_header("Content-ID", "<image1>")
    message.attach(logo)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "lvlmoney"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()


def sma_50_100_email(buy, sell, date, emaillist):
    message = MIMEMultipart("alternative")
    message["Subject"] = "Stock Recommendations for {}".format(date)
    message["To"] = "lvlmoney2021@gmail.com"
    message["From"] = "lvlmoney2021@gmail.com"

    htmlfile = codecs.open(os.path.join(BASE_PATH, "Emails\\TradingStrategy.html"), "r")
    htmlfile = htmlfile.read().format(
        link=WEBSITE_PATH,
        date=date,
        Buy=buy,
        Sell=sell,
        strategy="50 / 100 SMA Crossover",
    )
    message.attach(MIMEText(htmlfile, "html"))

    image = open(os.path.join(BASE_PATH, "Media\\Logos\\LvLMoney.png"), "rb")
    logo = MIMEImage(image.read(), _subtype="png")
    image.close()
    logo.add_header("Content-ID", "<image1>")
    message.attach(logo)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "lvlmoney"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], [message["to"]] + emaillist, message.as_string())
    server.quit()
