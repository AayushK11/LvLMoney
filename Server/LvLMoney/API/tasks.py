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
        hour="17",
        minute="35",
    )
    scheduler.add_job(
        Model.MarketSentiment.auto_mood.auto_train,
        day_of_week="mon-fri",
        trigger="cron",
        hour="17",
        minute="35",
    )
    scheduler.start()
