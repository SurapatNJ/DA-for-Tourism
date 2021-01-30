from django.conf import settings
from django.db import models

import datetime as dt
# Create your models here.
class Heatmap(models.Model):
    lat_en = models.IntegerField(default=0)
    lng_en = models.IntegerField(default=0)
    lat_ws = models.IntegerField(default=0)
    lng_ws = models.IntegerField(default=0)
    datetime_start = models.DateTimeField(default=dt.datetime.now())
    datetime_end = models.DateTimeField(default=dt.datetime.now() + dt.timedelta(days=1))

class gridMap(models.Model):
    lat_en = models.IntegerField(default=0)
    lng_en = models.IntegerField(default=0)
    lat_ws = models.IntegerField(default=0)
    lng_ws = models.IntegerField(default=0)
    lat_c = models.IntegerField(default=0)
    lng_c = models.IntegerField(default=0)
    datetime_start = models.DateTimeField(default=dt.datetime.now())
    datetime_end = models.DateTimeField(default=dt.datetime.now() + dt.timedelta(days=1))


    