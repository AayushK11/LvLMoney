from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import Model.auto_train


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        Model.auto_train.auto_train, trigger="cron", hour="18", minute="00"
    )
    scheduler.start()
