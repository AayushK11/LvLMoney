from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import Model.auto_train
import Model.auto_mood


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        Model.auto_train.auto_train,
        day_of_week="mon-fri",
        trigger="cron",
        hour="11",
        minute="48",
    )
    scheduler.add_job(
        Model.auto_mood.auto_train,
        day_of_week="mon-fri",
        trigger="cron",
        hour="11",
        minute="48",
    )
    scheduler.start()
