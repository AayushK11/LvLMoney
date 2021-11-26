from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import Model.Forecasting.auto_train
import Model.MarketSentiment.auto_mood


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        Model.Forecasting.auto_train.auto_train,
        day_of_week="mon-fri",
        trigger="cron",
        hour="18",
        minute="02",
    )
    scheduler.add_job(
        Model.MarketSentiment.auto_mood.auto_train,
        day_of_week="mon-fri",
        trigger="cron",
        hour="11",
        minute="48",
    )
    scheduler.start()
