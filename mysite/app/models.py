from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User, Group

import datetime as dt
# Create your models here.

#API model
#Stat
class Heatmap(models.Model):
    lat_en = models.IntegerField(default=0)
    lng_en = models.IntegerField(default=0)
    lat_ws = models.IntegerField(default=0)
    lng_ws = models.IntegerField(default=0)
    date_start = models.DateField(default=dt.datetime(2019,1,1))
    date_end = models.DateField(default=dt.datetime(2019,1,2))

class gridMap(models.Model):
    lat_en = models.IntegerField(default=0)
    lng_en = models.IntegerField(default=0)
    lat_ws = models.IntegerField(default=0)
    lng_ws = models.IntegerField(default=0)

class tourist_place_detail(models.Model):
    lat_en = models.IntegerField(default=0)
    lng_en = models.IntegerField(default=0)
    lat_ws = models.IntegerField(default=0)
    lng_ws = models.IntegerField(default=0)
    date_start = models.DateField(default=dt.datetime(2019,1,1))
    date_end = models.DateField(default=dt.datetime(2019,1,2))

#trip planner
class trip_title_api(models.Model):
    user_id = models.IntegerField(default=0)
    trip_name = models.CharField(max_length=100, null=True, blank=True)
    date_start = models.DateField(default=dt.datetime(2019,1,1))
    date_end = models.DateField(default=dt.datetime(2019,1,2))
    hotal_id = models.CharField(max_length=100, null=True, blank=True)
    trip_data = models.TextField(max_length=1000, null=True, blank=True)

class trip_detail_analysis(models.Model):
    date_start = models.DateField(default=dt.datetime(2019,1,1))
    date_end = models.DateField(default=dt.datetime(2019,1,2))
    hotal_id = models.CharField(max_length=100, null=True, blank=True)
    trip_data = models.TextField(max_length=1000, null=True, blank=True)

#User System model
class signup_model(models.Model):
    username = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    password = models.CharField(max_length=250, null=True, blank=True)
    confirm_password = models.CharField(max_length=250, null=True, blank=True)

class login_model(models.Model):
    username = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    password = models.CharField(max_length=250, null=True, blank=True)

#database model
class trip_titles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip_name = models.CharField(max_length=250, null=True, blank=True)
    city_code = models.CharField(max_length=250, null=True, blank=True)
    start_trip_date = models.DateField(default=dt.datetime(2019,1,1))
    end_trip_date = models.DateField(default=dt.datetime(2019,1,2))
    hotel_id = models.CharField(max_length=250, null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return str(self.trip_name)

class trip_details(models.Model):
    trip_id = models.ForeignKey(trip_titles, on_delete=models.CASCADE)
    datetime_start = models.DateField(default=dt.datetime(2019,1,1,9))
    datetime_end = models.DateField(default=dt.datetime(2019,1,1,12))
    poi = models.CharField(max_length=250, null=True, blank=True)
    place_name = models.CharField(max_length=250, null=True, blank=True)
    lat = models.IntegerField(default=0)
    lng = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return str(self.trip_id) + "-" + str(self.datetime_start)


