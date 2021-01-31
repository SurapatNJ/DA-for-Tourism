from django.conf import settings
from django.db import models
from django.utils import timezone

import datetime as dt
# Create your models here.

#API model
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

class tourist_place_detail(models.Model):
    lat_en = models.IntegerField(default=0)
    lng_en = models.IntegerField(default=0)
    lat_ws = models.IntegerField(default=0)
    lng_ws = models.IntegerField(default=0)
    datetime_start = models.DateTimeField(default=dt.datetime.now())
    datetime_end = models.DateTimeField(default=dt.datetime.now() + dt.timedelta(days=1))

#User System model
class User(models.Model):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    username = models.CharField(max_length=250, null=True, blank=True)
    password = models.CharField(max_length=250, null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    date_joined = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.email

class trip_titles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip_name = models.CharField(max_length=250, null=True, blank=True)
    city_code = models.CharField(max_length=250, null=True, blank=True)
    start_trip_date = models.DateField(blank=True, null=True)
    end_trip_date = models.DateField(blank=True, null=True)
    hotel_id = models.CharField(max_length=250, null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return str(self.email)

class trip_details(models.Model):
    trip_id = models.ForeignKey(trip_titles, on_delete=models.CASCADE)
    trip_date = models.DateField(blank=True, null=True)
    trip_t_start = models.TimeField(null=True, blank=True)
    trip_t_end = models.TimeField(null=True, blank=True)
    poi = models.CharField(max_length=250, null=True, blank=True)
    place_name = models.CharField(max_length=250, null=True, blank=True)
    lat = models.IntegerField(default=0)
    lng = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return str(self.trip_id) + "-" + str(self.trip_date)
