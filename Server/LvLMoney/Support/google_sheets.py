from pathlib import Path
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

BASE_PATH = Path(__file__).resolve().parent.parent


def insert_into_spreadsheet(request):
    try:
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ]

        creds = ServiceAccountCredentials.from_json_keyfile_name(
            os.path.join(BASE_PATH, "Security\\GoogleSheets.json"), scope
        )

        client = gspread.authorize(creds)
        sheet = client.open("Contact Us").sheet1

        values = [
            request["FirstName"],
            request["LastName"],
            request["Email"],
            request["PhoneNo"],
            request["Issue"],
        ]

        sheet.append_row(values)
        return True
    except:
        return False
