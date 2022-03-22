import hashlib
import pyotp
import pyqrcode
import base64


def hash_details(parameter):
    parameter = str(parameter) + str(parameter)
    parameter = hashlib.sha256(parameter.encode()).hexdigest()
    return parameter


def create_two_factor(Username, Email):
    EncodedText = Username + Username
    EncodedText = base64.b32encode(bytes(EncodedText, "ascii"))
    TimeOTP = pyotp.totp.TOTP(EncodedText).provisioning_uri(
        name=Email, issuer_name="LvLMoney"
    )
    return TimeOTP


def two_factor_now(Username):
    EncodedText = Username + Username
    EncodedText = base64.b32encode(bytes(EncodedText, "ascii"))
    totp = pyotp.TOTP(EncodedText)
    return totp.now()
