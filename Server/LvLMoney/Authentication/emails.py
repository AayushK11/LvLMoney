from pathlib import Path
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import os
import codecs
import Security.config

BASE_PATH = Path(__file__).parent.parent
# WEBSITE_PATH = "http://localhost:3000/"
WEBSITE_PATH = "https://lvlmoney.netlify.app/"


def registration_email(name, email):
    message = MIMEMultipart("alternative")
    message["subject"] = "Welcome to LvLMoney"
    message["to"] = email
    message["from"] = Security.config.EMAILID

    htmlfile = codecs.open(os.path.join(BASE_PATH, "Emails\\RegisterEmail.html"), "r")
    htmlfile = htmlfile.read().format(fname=name, link=WEBSITE_PATH)
    message.attach(MIMEText(htmlfile, "html"))

    image = open(os.path.join(BASE_PATH, "Images\\Logos\\LvLMoney.png"), "rb")
    logo = MIMEImage(image.read(), _subtype="png")
    image.close()
    logo.add_header("Content-ID", "<image1>")
    message.attach(logo)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = Security.config.EMAILPASSWORD
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()


def forgot_password_email(name, email, username):
    message = MIMEMultipart("alternative")
    message["subject"] = "Forgot Password"
    message["to"] = email
    message["from"] = Security.config.EMAILID

    htmlfile = codecs.open(os.path.join(BASE_PATH, "Emails\\ForgotPassword.html"), "r")
    htmlfile = htmlfile.read().format(fname=name, link=WEBSITE_PATH, username=username)
    message.attach(MIMEText(htmlfile, "html"))

    image = open(os.path.join(BASE_PATH, "Images\\Logos\\LvLMoney.png"), "rb")
    logo = MIMEImage(image.read(), _subtype="png")
    image.close()
    logo.add_header("Content-ID", "<image1>")
    message.attach(logo)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = Security.config.EMAILPASSWORD
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()
