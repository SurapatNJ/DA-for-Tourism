#django lib
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.core import serializers
from rest_framework import filters, viewsets, permissions, status, views
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Heatmap, gridMap
from .serializers import HeatmapSerializer, GridSerializer

#anaconda lib 
import numpy as np
import pandas as pd
from os import path
import pickle
import glob
import time
import datetime as dt
from random import random

# Create your views here.


class HeatmapViewSet(viewsets.ModelViewSet):
    queryset = Heatmap.objects.all()
    serializer_class = HeatmapSerializer

    def create(self, request):
        searchData = request.data
        lat_en = float(searchData['lat_en'])
        lng_en = float(searchData['lng_en'])
        lat_ws = float(searchData['lat_ws'])
        lng_ws = float(searchData['lng_ws'])
        datetime_start = searchData['datetime_start']
        datetime_end = searchData['datetime_end']

        if lat_en > lat_ws and lng_en > lng_ws:

            pd.set_option('display.max_columns', None)

            #list of date for search file
            date1 = dt.datetime.strptime(datetime_start, "%Y-%m-%dT%H:%M")
            date2 = dt.datetime.strptime(datetime_end, "%Y-%m-%dT%H:%M")
            date_all = [date1.date() + dt.timedelta(days=x) for x in range((date2.date()-date1.date()).days + 1)]

            _path = r'G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop_pname' # use your path
            all_files = []

            for d in date_all:
                _file = glob.glob(_path + "/pname_date_" + str(d) + '.csv')
                if _file:
                    all_files.append(_file[0])
                del _file
            
            df_ = []
            for filename in all_files:
                _df = pd.read_csv(filename)
                df_.append(_df[_df.stop_time > 30][_df.stop_time < 180][_df.time_stamp >= str(date1)][_df.time_stamp <= str(date2)].copy())
                del _df
                
            print("Reading Finish!!! ")
            
            _vdf = pd.concat(df_, axis=0, ignore_index=True)
            vdf = _vdf[_vdf.lat > lat_ws][_vdf.lon > lng_ws][_vdf.lat < lat_en][_vdf.lon < lng_en].copy()
            del  _vdf
            yourdata = [{"lat": row['lat'], "lng": row['lon']} for index, row in vdf.iterrows()]

            
            #results = HeatmapSerializer(yourdata, many=True).data
            return Response(yourdata)
        else:
            return Response("Error!!! en <= ws")

class GridViewSet(viewsets.ModelViewSet):
    queryset = gridMap.objects.all()
    serializer_class = GridSerializer

    def create(self, request):
        searchData = request.data
        lat_en = float(searchData['lat_en'])
        lng_en = float(searchData['lng_en'])
        lat_ws = float(searchData['lat_ws'])
        lng_ws = float(searchData['lng_ws'])
        lat_c = float(searchData['lat_c'])
        lng_c = float(searchData['lng_c'])
        datetime_start = searchData['datetime_start']
        datetime_end = searchData['datetime_end']

        if lat_en < lat_ws and lng_en < lng_ws:

            pd.set_option('display.max_columns', None)

            #list of date for search file
            date1 = dt.datetime.strptime(datetime_start, "%Y-%m-%dT%H:%M")
            date2 = dt.datetime.strptime(datetime_end, "%Y-%m-%dT%H:%M")
            date_all = [date1.date() + dt.timedelta(days=x) for x in range((date2.date()-date1.date()).days + 1)]

            _path = r'G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop_pname' # use your path
            all_files = []

            for d in date_all:
                _file = glob.glob(_path + "/pname_date_" + str(d) + '.csv')
                if _file:
                    all_files.append(_file[0])
                del _file
            
            df_ = []
            for filename in all_files:
                _df = pd.read_csv(filename)
                df_.append(_df[_df.stop_time > 30][_df.time_stamp >= str(date1)][_df.time_stamp <= str(date2)].copy())
                del _df
                
            print("Reading Finish!!! ")
            
            _vdf = pd.concat(df_, axis=0, ignore_index=True)
            vdf_heatMap = _vdf[_vdf.lat > lat_en][_vdf.lon > lng_en][_vdf.lat < lat_ws][_vdf.lon < lng_ws].copy()
            vdf = vdf_heatMap[vdf_heatMap.pname != '-']
            del  _vdf
            #yourdata = [row for index, row in vdf.iterrows()]
            
            _tourism = pd.read_csv(r"G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop\cbi_data.csv", encoding='latin-1')
            
            ghash_en = str(round(lat_en,3)) + "-" + str(round(lng_en,3))
            ghash_ws = str(round(lat_ws,3)) + "-" + str(round(lng_ws,3))
            tourism = _tourism[_tourism.ghash >= ghash_en][_tourism.ghash <= ghash_ws].copy()
            del _tourism

            yourdata = []
            for index, row in tourism.iterrows():
                lat_t, lon_t = row['ghash'].split('-')
                count_car = 0
                if row['gtype'] == 100:
                    count_car = vdf[vdf.lat > float(lat_t)][vdf.lat < float(lat_t)+0.001][vdf.lon > float(lon_t)][vdf.lon < float(lon_t)+0.001].vid.count()
                    data = {'ghash':row['ghash'], 'count_car':count_car, 'pname':row['pname_en'], 'gtype':row['gtype']}
                    yourdata.append(data)
                elif row['gtype'] == 1000:
                    count_car = vdf[vdf.lat > float(lat_t)][vdf.lat < float(lat_t)+0.01][vdf.lon > float(lon_t)][vdf.lon < float(lon_t)+0.01].vid.count()
                    data = {'ghash':row['ghash'], 'count_car':count_car, 'pname':row['pname_en'], 'gtype':row['gtype']}
                    yourdata.append(data)

            #yourdata = [row for index, row in tourism.iterrows()]

            #results = HeatmapSerializer(yourdata, many=True).data
            return Response(yourdata)
        else:
            return Response("Error!!! en >= ws")