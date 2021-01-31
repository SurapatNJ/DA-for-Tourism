#django lib
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.core import serializers
from rest_framework import filters, viewsets, permissions, status, views
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Heatmap, gridMap, tourist_place_detail
from .serializers import HeatmapSerializer, GridSerializer, tourist_placeSerializer

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

# Heatmap 
class HeatmapViewSet(viewsets.ModelViewSet):
    #Set heatmap model 
    queryset = Heatmap.objects.all()
    serializer_class = HeatmapSerializer

    #Post position for heatmap in Time period
    def create(self, request):
        #Get input
        searchData = request.data
        lat_en = float(searchData['lat_en']) # lat east-north
        lng_en = float(searchData['lng_en']) # long east-north
        lat_ws = float(searchData['lat_ws']) # lat west-south
        lng_ws = float(searchData['lng_ws']) # long west-south
        datetime_start = searchData['datetime_start'] # start datetime
        datetime_end = searchData['datetime_end'] # end datetime

        if lat_en > lat_ws and lng_en > lng_ws:
            #list of date for search file
            date1 = dt.datetime.strptime(datetime_start, "%Y-%m-%dT%H:%M")
            date2 = dt.datetime.strptime(datetime_end, "%Y-%m-%dT%H:%M")
            date_all = [date1.date() + dt.timedelta(days=x) for x in range((date2.date()-date1.date()).days + 1)]
            _path = r'G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop_pname' # use your path
            all_files = []
            for d in date_all:
                _file = glob.glob(_path + "/pname_date_*" + str(d)[4:] + '.csv')
                if _file:
                    all_files.append(_file[0])
                del _file
            
            #Read all files pname_date_*
            df_ = []
            for filename in all_files:
                _df = pd.read_csv(filename)
                df_.append(_df[_df.stop_time > 30][_df.stop_time < 300].copy())
                del _df
            print("Reading Finish!!! ")
            
            #Create Dataframe
            _vdf = pd.concat(df_, axis=0, ignore_index=True)
            vdf = _vdf[_vdf.lat > lat_ws][_vdf.lon > lng_ws][_vdf.lat < lat_en][_vdf.lon < lng_en].copy()
            del  _vdf

            #response position for heatmap
            results = [{"lat": row['lat'], "lng": row['lon']} for index, row in vdf.iterrows()]
            return Response(results)
        else:
            #Error input
            return Response("Error!!! en <= ws")

# Grid for tourism place
class GridViewSet(viewsets.ModelViewSet):
    #Set grid model
    queryset = gridMap.objects.all()
    serializer_class = GridSerializer

    #Post Grid data
    def create(self, request):
        #Get input
        searchData = request.data
        lat_en = float(searchData['lat_en']) # lat east-north
        lng_en = float(searchData['lng_en']) # long east-north
        lat_ws = float(searchData['lat_ws']) # lat west-south
        lng_ws = float(searchData['lng_ws']) # long west-south

        if lat_en > lat_ws and lng_en > lng_ws:
            #Read tourism data
            _tourism = pd.read_csv(r"G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop\cbi_data.csv", encoding='TIS620')
            ghash_en = str(round(lat_en,3)) + "-" + str(round(lng_en,3)) #Set geohash east-north
            ghash_ws = str(round(lat_ws,3)) + "-" + str(round(lng_ws,3)) #Set geohash west-south
            tourism = _tourism[_tourism.ghash <= ghash_en][_tourism.ghash >= ghash_ws].copy() #tourism data in scope
            del _tourism

            #response Grid for tourism place
            results = []
            for index, row in tourism.iterrows():
                del index
                data = {'ghash':row['ghash'], 'poi':row['poi'], 'pname_en':row['pname_en'], 'pname_th':row['pname_th'], 'gtype':row['gtype']}
                results.append(data)
            return Response(results)
        else:
            #Error input
            return Response("Error!!! en <= ws")

# tourist place detail
class tourist_placeViewSet(viewsets.ModelViewSet):
    #Set heatmap model 
    queryset = tourist_place_detail.objects.all()
    serializer_class = tourist_placeSerializer

    #Post position for heatmap in Time period
    def create(self, request):
        #Get input
        searchData = request.data
        lat_en = float(searchData['lat_en']) # lat east-north
        lng_en = float(searchData['lng_en']) # long east-north
        lat_ws = float(searchData['lat_ws']) # lat west-south
        lng_ws = float(searchData['lng_ws']) # long west-south
        datetime_start = searchData['datetime_start'] # start datetime
        datetime_end = searchData['datetime_end'] # end datetime

        if lat_en > lat_ws and lng_en > lng_ws:
            #list of date for search file
            date1 = dt.datetime.strptime(datetime_start, "%Y-%m-%dT%H:%M")
            date2 = dt.datetime.strptime(datetime_end, "%Y-%m-%dT%H:%M")
            date_all = [date1.date() + dt.timedelta(days=x) for x in range((date2.date()-date1.date()).days + 1)]
            
            pop_tourism = pd.read_csv(r"G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop\all_popular.csv", encoding='latin1')
            poi_ = pop_tourism.sort_values('poi').poi.unique()

            results = []
            #response position for heatmap
            #results = [{"lat": row['lat'], "lng": row['lon']} for index, row in vdf.iterrows()]
            return Response(results)
        else:
            #Error input
            return Response("Error!!! en <= ws")

    
    

