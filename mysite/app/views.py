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
        date_start = searchData['date_start'] # start datetime
        date_end = searchData['date_end'] # end datetime

        if lat_en > lat_ws and lng_en > lng_ws:
            #list of date for search file
            date1 = dt.datetime.strptime(date_start, "%Y-%m-%d")
            date2 = dt.datetime.strptime(date_end, "%Y-%m-%d")
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
                _df = pd.read_csv(filename, encoding='TIS620')
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
        date_start = searchData['date_start'] # start datetime
        date_end = searchData['date_end'] # end datetime

        if lat_en > lat_ws and lng_en > lng_ws:
            #Read all_popular tourist place
            _pop_tourism = pd.read_csv(r"G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop\all_popular.csv", encoding='TIS620')
            all_date_tourism = pd.read_csv(r"G:\.shortcut-targets-by-id\1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X\Project1_DA_Tourism\data_car_stop\all_date_tourism.csv", encoding='TIS620')
            pop_tourism = _pop_tourism[_pop_tourism.lat > lat_ws][_pop_tourism.lon > lng_ws][_pop_tourism.lat < lat_en][_pop_tourism.lon < lng_en].copy()
            del _pop_tourism
            poi_ = pop_tourism.sort_values('poi').poi.unique()

            #Set days in year
            pop_tourism['days'] = pop_tourism.apply(lambda x: (dt.datetime(2020, int(x.date.split('/')[1]), int(x.date.split('/')[0]))-dt.datetime(2020,1,1)).days, axis=1)
            day_s = (dt.datetime(2020, int(date_start[5:7]), int(date_start[8:10]))-dt.datetime(2020,1,1)).days
            day_e = (dt.datetime(2020, int(date_end[5:7]), int(date_end[8:10]))-dt.datetime(2020,1,1)).days

            _pop_tour = pop_tourism[pop_tourism.days >= day_s][pop_tourism.days <= day_e]
            all_date_pop_tour = []
            for poi in poi_:
                pop_poi = _pop_tour[_pop_tour.poi == poi]
                if not pop_poi[_pop_tour.pp_all > 0].empty :
                    pop_poi = pop_poi[_pop_tour.pp_all > 0]
                    travel_time = round(pop_poi.travel_time.mean(),2)
                else:
                    travel_time = round(0.0,2)
                pname_en = pop_poi.pname_en.max()
                pname_th = pop_poi.pname_th.max()
                lat = round(pop_poi.lat.mean(),3)
                lon = round(pop_poi.lon.mean(),3)
                
                pp_last_night = round(pop_poi.pp_last_night.mean(),0)
                pp_morning = round(pop_poi.pp_morning.mean(),0)
                pp_afternoon = round(pop_poi.pp_afternoon.mean(),0)
                pp_evening = round(pop_poi.pp_evening.mean(),0)
                pp_night = round(pop_poi.pp_night.mean(),0)
                pp_all = round(pop_poi.pp_all.mean(),0)
                
                data = {'poi':poi, 'pname_en':pname_en, 'pname_th':pname_th, 'lat':lat, 'lng':lon, 'travel_time':travel_time, 'pp_last_night':pp_last_night, 
                        'pp_morning':pp_morning, 'pp_afternoon':pp_afternoon, 'pp_evening':pp_evening, 'pp_night':pp_night, 'pp_all':pp_all}         
                data['pop_dayofweek'] = all_date_tourism[all_date_tourism.poi == poi].pop_dayofweek.max()
                data['pop_month'] = all_date_tourism[all_date_tourism.poi == poi].pop_month.max()
                data['pp_all_in_year'] = all_date_tourism[all_date_tourism.poi == poi].pp_all.max()
                data['travel_time'] = all_date_tourism[all_date_tourism.poi == poi].travel_time.max()
                all_date_pop_tour.append(data)

            return Response(all_date_pop_tour)
        else:
            #Error input
            return Response("Error!!! en <= ws")

    
    

