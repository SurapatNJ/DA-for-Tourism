#django lib
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import check_password
from django.core import serializers
from rest_framework import filters, viewsets, permissions, status, views
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, RangeFilter
from .models import Heatmap, gridMap, tourist_place_detail, trip_title_api, trip_detail_analysis
from .models import signup_model, login_model, rating_analysis
from .serializers import HeatmapSerializer, GridSerializer, tourist_placeSerializer, trip_title_apiSerializer, trip_detail_analysisSerializer
from .serializers import signup_Serializer, login_Serializer, rating_analysisSerializer
#anaconda lib 
import numpy as np
import pandas as pd
from os import path
import pickle
import glob
import time
import datetime as dt
import random
import re #for validating
import json
import math


# Create your views here.
#main_path = r'G:/.shortcut-targets-by-id/1-YxyJafS8Gh2naQK5PO5DlwZGcPbKd-X/Project1_DA_Tourism/'
main_path = 'database'

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
            _path = main_path + "/data_car_stop_pname" # use your path
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
            return Response("Error!!! en <= ws", status=status.HTTP_404_NOT_FOUND)

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
            _tourism = pd.read_csv(main_path + "/data_car_stop/cbi_data.csv", encoding='TIS620')
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
            return Response("Error!!! en <= ws", status=status.HTTP_404_NOT_FOUND)

# tourist place detail
class tourist_placeViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = tourist_place_detail.objects.all()
    serializer_class = tourist_placeSerializer

    #Post tourist_place data
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
            _pop_tourism = pd.read_csv(main_path + "/data_car_stop/all_popular.csv", encoding='TIS620')
            all_date_tourism = pd.read_csv(main_path + "/data_car_stop/all_date_tourism.csv", encoding='TIS620')
            pop_tourism = _pop_tourism[_pop_tourism.lat > lat_ws][_pop_tourism.lon > lng_ws][_pop_tourism.lat < lat_en][_pop_tourism.lon < lng_en].copy()
            del _pop_tourism
            poi_ = pop_tourism.sort_values('poi').poi.unique()

            #Set days in year
            pop_tourism['days'] = pop_tourism.apply(lambda x: (dt.datetime(2020, int(x.date.split('-')[1]), int(x.date.split('-')[2]))-dt.datetime(2020,1,1)).days, axis=1)
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
            return Response("Error!!! en <= ws", status=status.HTTP_404_NOT_FOUND)

    
# trip_title_api
class trip_title_apiViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = trip_title_api.objects.all()
    serializer_class = trip_title_apiSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user_id']

    #Get All Data
    def list(self, request):
        user_id = ""
        try:
            user_id = request.query_params['user_id']
        except:
            user_id = ""

        tta_all = trip_title_api.objects.all()
        if user_id != "":
            tta_all = trip_title_api.objects.filter(user_id=user_id)

        resp = []
        for tta in tta_all:
            trip_data = tta.trip_data
            try:
                trip_data = json.loads(tta.trip_data)
            except:
                trip_data = tta.trip_data
            
            _data = {'id':tta.id, 'user_id':tta.user_id, 'trip_name':tta.trip_name, 'city_code':tta.city_code, 
                    'start_trip_date':tta.start_trip_date, 'end_trip_date':tta.end_trip_date, 
                    'hotel_id':tta.hotel_id, 'trip_data':trip_data,
                    'last_updated':tta.last_updated, 'created':tta.created}
            resp.append(_data)

        return Response(resp)

    #Get 1 Data
    def retrieve(self, request, pk):
        tta_all = trip_title_api.objects.filter(id = pk)
        if list(tta_all) == []:
            return Response("not found this trip", status=status.HTTP_404_NOT_FOUND)

        tta = tta_all[0]
        trip_data = json.loads(tta.trip_data)

        df = pd.DataFrame(columns=('date', 'start', 'end', 'poi'))
        for t in trip_data:
            _date = t['datetime_start'][:10]
            _data = {'date':_date, 'start':t['datetime_start'][11:16], 'end':t['datetime_end'][11:16], 'poi':t['poi']}
            df = df.append(_data, ignore_index=True)

        date_state = 0
        set_date = df.date.unique()
        count_trip = 0

        useState = []
        for d in set_date:
            date_trip = df[df.date == d]
            trips = []
            for index, row in date_trip.iterrows():
                _t = {'id':index - count_trip, 'start':row.start,  'end':row.end,  'place':row.poi}
                trips.append(_t)
            _tripInDate = {'id':date_state, 'trips':trips}
            useState.append(_tripInDate)
            date_state = date_state + 1
            count_trip = count_trip + date_trip.poi.count()
            
        resp = []
        for tta in tta_all:
            trip_data = tta.trip_data
            try:
                trip_data = json.loads(tta.trip_data)
            except:
                trip_data = tta.trip_data
            _data = {'id':tta.id, 'user_id':tta.user_id, 'trip_name':tta.trip_name, 'city_code':tta.city_code, 
                    'start_trip_date':tta.start_trip_date, 'end_trip_date':tta.end_trip_date, 
                    'hotel_id':tta.hotel_id, 'trip_data':useState,
                    'last_updated':tta.last_updated, 'created':tta.created}
            resp.append(_data)

        return Response(resp[0])


    #Post tourist_place data
    def create(self, request):
        #Get input
        searchData = request.data
        user_id = searchData['user_id']
        trip_name = searchData['trip_name']
        city_code = searchData['city_code']
        start_trip_date = searchData['start_trip_date'] # start datetime
        end_trip_date = searchData['end_trip_date'] # end datetime
        hotel_id = searchData['hotel_id'] # hotel for trip
        trip_data = searchData['trip_data'] # trip details

        if user_id == '':
            return Response("not found this user", status=status.HTTP_404_NOT_FOUND)

        tta = trip_title_api(user_id = user_id)
        tta.trip_name = trip_name
        tta.city_code = city_code
        tta.start_trip_date = start_trip_date
        tta.end_trip_date = end_trip_date
        tta.hotel_id = hotel_id
        tta.trip_data = str(trip_data)
        tta.save()

        resp = []
        trip_data = tta.trip_data
        try:
            trip_data = json.loads(tta.trip_data)
        except:
            trip_data = tta.trip_data
        _data = {'id':tta.id, 'user_id':tta.user_id, 'trip_name':tta.trip_name, 'city_code':tta.city_code, 
        'start_trip_date':tta.start_trip_date, 'end_trip_date':tta.end_trip_date, 
        'hotel_id':tta.hotel_id, 'trip_data':trip_data,
        'last_updated':tta.last_updated, 'created':tta.created}
        resp.append(_data)

        return Response(resp[0])

    def update(self, request, pk):
        searchData = request.data
        user_id = searchData['user_id']
        trip_name = searchData['trip_name']
        city_code = searchData['city_code']
        start_trip_date = searchData['start_trip_date'] # start datetime
        end_trip_date = searchData['end_trip_date'] # end datetime
        hotel_id = searchData['hotel_id'] # hotel for trip
        trip_data = searchData['trip_data'] # trip details

        if user_id == '':
            return Response("not found this user", status=status.HTTP_404_NOT_FOUND)

        tta = trip_title_api.objects.filter(id = pk)
        if list(tta) != []:
            tta = tta[0]
        else:
            return Response("not found this trip", status=status.HTTP_404_NOT_FOUND)
        tta.trip_name = trip_name
        tta.city_code = city_code
        tta.start_trip_date = start_trip_date
        tta.end_trip_date = end_trip_date
        tta.hotel_id = hotel_id
        tta.trip_data = str(trip_data)
        tta.save()

        resp = []
        trip_data = tta.trip_data
        try:
            trip_data = json.loads(tta.trip_data)
        except:
            trip_data = tta.trip_data
        _data = {'id':tta.id, 'user_id':tta.user_id, 'trip_name':tta.trip_name, 'city_code':tta.city_code, 
        'start_trip_date':tta.start_trip_date, 'end_trip_date':tta.end_trip_date, 
        'hotel_id':tta.hotel_id, 'trip_data':trip_data,
        'last_updated':tta.last_updated, 'created':tta.created}
        resp.append(_data)

        return Response(resp[0])







# trip_title_api
class rating_analysisViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = rating_analysis.objects.all()
    serializer_class = rating_analysisSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['rating_point']  

# trip_detail_analysis
class trip_detail_analysisViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = trip_detail_analysis.objects.all()
    serializer_class = trip_detail_analysisSerializer 

    #Post tourist_place data
    def create(self, request):
        #Get input
        searchData = request.data
        trip_type = searchData['trip_type']
        date_start = searchData['date_start'] # start datetime
        date_end = searchData['date_end'] # end datetime
        hotel_id = searchData['hotel_id'] # hotel for trip
        trip_data = searchData['trip_data'] # trip details
        date_analysis = searchData['date_analysis'] # date for random trip

        #pop data in year
        _date_tourism = pd.read_csv(main_path + "/data_car_stop/all_date_tourism.csv", encoding='TIS620')
        hotel_list = pd.read_csv(main_path + "/data_car_stop/cbi_hotels_data.csv", encoding='utf8')
        _trip_type_list = pd.read_csv(main_path + "/data_car_stop/poi_category.csv", encoding='TIS620')

        #get trip_data to json
        jTrip = trip_data

        #get trip type
        jTrip_type = []
        if trip_type != "":
            jTrip_type = trip_type
        trip_type_list = _trip_type_list.loc[_trip_type_list['pcat_1'].isin(jTrip_type) | _trip_type_list['pcat_2'].isin(jTrip_type) | _trip_type_list['pcat_3'].isin(jTrip_type)]

        #Set json to dataframe pandas
        _trip_all = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'trip_type', 'poi', 'lat', 'lon', 'locked'))
        for t in jTrip:
           _trip_all = _trip_all.append(t, ignore_index=True)

        #filter date_tourism with hotel's position in 100 km^2
        hotel_data = hotel_list[hotel_list.Id == int(hotel_id)]
        date_tourism = _date_tourism[_date_tourism.lat >= float(hotel_data.Latitude) - 0.2][_date_tourism.lat <= float(hotel_data.Latitude) + 0.2]
        date_tourism = date_tourism[_date_tourism.lng >= float(hotel_data.Longtitude) - 0.2][_date_tourism.lng <= float(hotel_data.Longtitude) + 0.2]

        #Find time_period and place_list for random genetic
        trip_all = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip','time_period', 'place_list', 'place_type'))
        for index, row in _trip_all.iterrows():
            del index
            if row.datetime_start != "" and row.datetime_end != "":
                time_start = dt.datetime.strptime(row.datetime_start, '%Y-%m-%d %H:%M:%S')
                time_end = dt.datetime.strptime(row.datetime_end, '%Y-%m-%d %H:%M:%S')

                _y = time_start.year
                _m = time_start.month
                _d = time_start.day
                dTime = time_end - time_start

                if date_analysis != "":
                    if str(time_start.date()) != date_analysis:
                        row['locked'] = True

                row['time_trip'] = round(dTime.seconds/60,2)
                if time_start >= dt.datetime(_y,_m,_d,0) - dTime/2 and time_end < dt.datetime(_y,_m,_d,6) + dTime/2:
                    row['time_period'] = 0
                    place_list = date_tourism[date_tourism.pp_last_night > 0]
                    row['place_list'] = place_list
                elif time_start >= dt.datetime(_y,_m,_d,6) - dTime/2 and time_end < dt.datetime(_y,_m,_d,12) + dTime/2:
                    row['time_period'] = 1
                    place_list = date_tourism[date_tourism.pp_morning > 0]
                    row['place_list'] = place_list
                elif time_start >= dt.datetime(_y,_m,_d,12) - dTime/2 and time_end < dt.datetime(_y,_m,_d,16) + dTime/2:
                    row['time_period'] = 2
                    place_list = date_tourism[date_tourism.pp_afternoon > 0]
                    row['place_list'] = place_list
                elif time_start >= dt.datetime(_y,_m,_d,16) - dTime/2 and time_end < dt.datetime(_y,_m,_d,20) + dTime/2:
                    row['time_period'] = 3
                    place_list = date_tourism[date_tourism.pp_evening > 0]
                    row['place_list'] = place_list
                elif time_start >= dt.datetime(_y,_m,_d,20) - dTime/2 and time_end <= dt.datetime(_y,_m,_d,23,59) + dTime/2:
                    row['time_period'] = 4
                    place_list = date_tourism[date_tourism.pp_night > 0]
                    row['place_list'] = place_list
                if row.trip_type != "":
                    Trip_type = [row.trip_type]
                    trip_type_inline = _trip_type_list.loc[_trip_type_list['pcat_1'].isin(Trip_type) | _trip_type_list['pcat_2'].isin(Trip_type) | _trip_type_list['pcat_3'].isin(Trip_type)]
                    row['place_type'] = trip_type_inline.loc[trip_type_inline['poi'].isin(list(place_list.poi))]
                else:
                    row['place_type'] = trip_type_list.loc[trip_type_list['poi'].isin(list(place_list.poi))]
                trip_all = trip_all.append(row, ignore_index=True)
        del _trip_all

        trip_random_list = []
        _sample =  trip_all[trip_all.locked == False].poi.count()
        
        # จำนวนตัวอย่างที่สุ่ม
        sample = 16
        if _sample < 4:
            sample = 2 ** _sample
        for i in range(sample):
            trip_random = pd.DataFrame(columns=('No','datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point','pop_point_all'))
            for index, row in trip_all.iterrows():
                del index
                place_list = row.place_list
                place_type = row.place_type
                if row.locked:
                    if row.poi != "":
                        _place = place_list[place_list.poi == row.poi]
                        _trip = {'datetime_start':row.datetime_start, 'datetime_end':row.datetime_end, 
                        'poi':row.poi, 'lat':row.lat, 'lon':row.lon, 'locked': row.locked}
                        if _place.empty:
                            _trip['time_tour'] = 0
                            _trip['pop_point'] = 0
                        else:
                            _trip['time_tour'] = _place.travel_time.max()
                        _trip['time_trip'] = row.time_trip
                        
                    else:
                        _trip = {'datetime_start':row.datetime_start, 'datetime_end':row.datetime_end, 
                        'poi':row.poi, 'lat':row.lat, 'lon':row.lon, 'locked': row.locked}
                        _trip['time_trip'] = row.time_trip
                        _trip['time_tour'] = 0
                        _trip['pop_point'] = 0

                else:
                    # random tourlist place in dataframe
                    place_type = place_type.query("poi not in " + str(list(trip_random.poi)))
                    place_list = place_list.query("poi not in " + str(list(trip_random.poi)))
                    
                    if not place_type.empty:
                        _place_type = place_type.sample()
                        _place = place_list[place_list.poi == _place_type.poi.max()]
                    else:
                        _place = place_list.sample()

                    _trip = {'datetime_start':row.datetime_start, 'datetime_end':row.datetime_end, 
                    'poi':_place.poi.max(), 'lat':_place.lat.max(), 'lon':_place.lng.max(), 'locked': row.locked}
                    _trip['time_trip'] = row.time_trip
                    _trip['time_tour'] = _place.travel_time.max()

                _trip['No'] = i
                _trip['pop_point_all'] = 0

                if (row.poi != "" or not row.locked) and not _place.empty:
                    if row.time_period == 0:
                        _trip['pop_point'] = _place.pp_last_night.max()
                    elif row.time_period == 1:
                        _trip['pop_point'] = _place.pp_morning.max()
                    elif row.time_period == 2:
                        _trip['pop_point'] = _place.pp_afternoon.max()
                    elif row.time_period == 3:
                        _trip['pop_point'] = _place.pp_evening.max()
                    elif row.time_period == 4:
                        _trip['pop_point'] = _place.pp_night.max()        
                trip_random = trip_random.append(_trip, ignore_index=True)
            trip_random_list.append(trip_random)

        #return Response(trip_random_list)

        #random mutation or crossover
        while len(trip_random_list) > 1:
            trip_random_list = crossover(trip_random_list, trip_all)
            trip_random_list = mutation(trip_random_list, trip_all)

        set_trip = trip_random_list[0]
        resp = []
        for index, row in set_trip.iterrows():
            del index
            if row.poi != "":
                row.locked = True
            else:
                row.locked = False

            _data = {'datetime_start':row.datetime_start, 'datetime_end':row.datetime_end, 
            'poi':row.poi, 'lat':row.lat, 'lon':row.lon, 'locked':row.locked,
            'time_trip':row.time_trip, 'time_tour':row.time_tour, 'pop_point':row.pop_point}
            resp.append(_data)

        return Response(resp)

def mutation(datalist,trip_all):
    #random trip in list
    data_all = datalist
    if random.randint(0, 1):
        rand_trip = datalist[0]
        for d in datalist:
            if d.pop_point_all.max() < rand_trip.pop_point_all.max():
                rand_trip = d

        #random time_period to change tourlist place
        rand_period = rand_trip[rand_trip.locked == False].sample()
        trip_period = trip_all[trip_all.datetime_start == rand_period.datetime_start.max()]

        place_list = trip_period.place_list.max().query("poi not in " + str(list(rand_trip.poi)))
        if not place_list.empty:
            _place = place_list.sample()
        else:
            return data_all

        rand_period.No = rand_trip.No.max()
        rand_period.poi = _place.poi.max()
        rand_period.lat = _place.lat.max()
        rand_period.lon = _place.lng.max()
        rand_period.time_tour = _place.travel_time.max()

        new_trip = pd.DataFrame(columns=('No','datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point','pop_point_all'))
        for index, row in rand_trip.iterrows():
            del index
            if row.datetime_start == rand_period.datetime_start.max() :
                new_trip = new_trip.append(rand_period, ignore_index=True)
            else:
                new_trip = new_trip.append(row, ignore_index=True)

        data_gen = [new_trip, rand_trip]

        set_trip = data_gen[0]
        for trip_random in data_gen:
            #get distance between tourist place
            set_position = [(row.lat,row.lon) for index, row in set_trip.iterrows()]
            set_dist = []
            for i in range(len(set_position)-1):
                lat_1, lon_1 = set_position[i]
                lat_2, lon_2 = set_position[i+1]
                if lat_1 == '':
                    lat_1 = 0
                if lon_1 == '':
                    lon_1 = 0
                if lat_2 == '':
                    lat_2 = 0
                if lon_2 == '':
                    lon_2 = 0
                distance = math.sqrt(pow(lat_1-lat_2, 2) + pow(lon_1-lon_2, 2))
                set_dist.append(distance)
            _set_dist = [round(x*10,0) for x in set_dist]
            _set_time = [round((row.time_trip-row.time_tour)/60,0) for index, row in set_trip.iterrows()]

            trip_position = [(row.lat,row.lon) for index, row in trip_random.iterrows()]
            trip_dist = []
            for i in range(len(trip_position)-1):
                lat_1, lon_1 = trip_position[i]
                lat_2, lon_2 = trip_position[i+1]
                if lat_1 == '':
                    lat_1 = 0
                if lon_1 == '':
                    lon_1 = 0
                if lat_2 == '':
                    lat_2 = 0
                if lon_2 == '':
                    lon_2 = 0
                distance = math.sqrt(pow(lat_1-lat_2, 2) + pow(lon_1-lon_2, 2))
                trip_dist.append(distance)
            _trip_dist = [round(x*10,0) for x in trip_dist]
            _trip_time = [round((row.time_trip-row.time_tour)/60,0) for index, row in trip_random.iterrows()]

            set_pop = set_trip.pop_point.sum() - sum(_set_dist) - sum(_set_time)
            trip_pop = trip_random.pop_point.sum() - sum(_trip_dist) - sum(_trip_time)

            if set_pop < trip_pop:
                set_trip = trip_random
            set_trip['pop_point_all'] = set_pop
        
        data_all = [i for i in datalist if rand_trip['No'].max() not in i['No'].values]
        data_all.append(set_trip)
    return data_all

def crossover(datalist,trip_all):
    data_all = datalist
    data_new_gen = []
    while len(data_all) > 0:
        #random 2 sample trip in list
        rand_trip_list = random.sample(data_all,2)

        for rand_trip in rand_trip_list:
            data_all = [i for i in data_all if rand_trip['No'].max() not in i['No'].values]

        _trip1_ = rand_trip_list[0]
        _trip2_ = rand_trip_list[1]
        rand_period = trip_all[trip_all.locked == False].sample()
        _trip1 = _trip1_[_trip1_.datetime_start == rand_period.datetime_start.max()]
        _trip2 = _trip2_[_trip2_.datetime_start == rand_period.datetime_start.max()]

        place_list1 = rand_period.place_list.max().query("poi not in " + str(list(_trip1_.poi)))
        place_list2 = rand_period.place_list.max().query("poi not in " + str(list(_trip2_.poi)))

        new_trip1 = pd.DataFrame(columns=('No', 'datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point','pop_point_all'))
        if _trip2.poi.max() not in place_list1.poi:
            new_trip1 = _trip1_
        else:
            for index, row in _trip1_.iterrows():
                del index
                _trip2['No'] = row.No
                if row.datetime_start == rand_period.datetime_start.max() :
                    new_trip1 = new_trip1.append(_trip2, ignore_index=True)
                else:
                    new_trip1 = new_trip1.append(row, ignore_index=True)

        new_trip2 = pd.DataFrame(columns=('No', 'datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point','pop_point_all'))
        if _trip1.poi.max() not in place_list2.poi:
            new_trip2 = _trip2_
        else:
            for index, row in _trip2_.iterrows():
                del index
                _trip1['No'] = row.No
                if row.datetime_start == rand_period.datetime_start.max() :
                    new_trip2 = new_trip2.append(_trip1, ignore_index=True)
                else:
                    new_trip2 = new_trip2.append(row, ignore_index=True)
        
        #data gen1 + gen2
        data_gen = rand_trip_list
        data_gen.append(new_trip1)
        data_gen.append(new_trip2)

        set_trip = data_gen[0]
        for trip_random in data_gen:
            #get distance between tourist place
            set_position = [(row.lat,row.lon) for index, row in set_trip.iterrows()]
            set_dist = []
            for i in range(len(set_position)-1):
                lat_1, lon_1 = set_position[i]
                lat_2, lon_2 = set_position[i+1]
                if lat_1 == '':
                    lat_1 = 0
                if lon_1 == '':
                    lon_1 = 0
                if lat_2 == '':
                    lat_2 = 0
                if lon_2 == '':
                    lon_2 = 0

                distance = math.sqrt(pow(lat_1-lat_2, 2) + pow(lon_1-lon_2, 2))
                set_dist.append(distance)
            _set_dist = [round(x*10,0) for x in set_dist]
            _set_time = [round((row.time_trip-row.time_tour)/60,0) for index, row in set_trip.iterrows()]

            trip_position = [(row.lat,row.lon) for index, row in trip_random.iterrows()]
            trip_dist = []
            for i in range(len(trip_position)-1):
                lat_1, lon_1 = trip_position[i]
                lat_2, lon_2 = trip_position[i+1]
                if lat_1 == '':
                    lat_1 = 0
                if lon_1 == '':
                    lon_1 = 0
                if lat_2 == '':
                    lat_2 = 0
                if lon_2 == '':
                    lon_2 = 0
                distance = math.sqrt(pow(lat_1-lat_2, 2) + pow(lon_1-lon_2, 2))
                trip_dist.append(distance)
            _trip_dist = [round(x*10,0) for x in trip_dist]
            _trip_time = [round((row.time_trip-row.time_tour)/60,0) for index, row in trip_random.iterrows()]

            set_pop = set_trip.pop_point.sum() - sum(_set_dist) - sum(_set_time)
            trip_pop = trip_random.pop_point.sum() - sum(_trip_dist) - sum(_trip_time)

            if set_pop < trip_pop:
                set_trip = trip_random
            
            set_trip['pop_point_all'] = set_pop
        data_new_gen.append(set_trip)

    return data_new_gen

    

#User System
class signupViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = signup_model.objects.all()
    serializer_class = signup_Serializer 

    #Post tourist_place data
    def create(self, request):
        #Get input
        searchData = request.data
        username = searchData['username']
        email = searchData['email']
        password = searchData['password']
        confirm_password = searchData['confirm_password']

        user_list = User.objects.all()
        user_all = pd.DataFrame(list(user_list.values()))

        if username == '':
            resp = {'status':'Error' ,'text': "The given username must be set"} 
            return Response(resp)

        #check username
        if username in list(user_all.username):
            resp = {'status':'Error' ,'text': "This user (" + username + ") is already in the system."} 
            return Response(resp)

        #check email
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        regex2 = '^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'
        if email in list(user_all.email):
            resp = {'status':'Error' ,'text': "This email (" + email + ") is already in the system."} 
            return Response(resp)
        if not re.search(regex2,email):
            resp = {'status':'Error' ,'text': email + " is Invalid Email."} 
            return Response(resp)  

        #check password
        if password == '' or confirm_password == '':
            resp = {'status':'Error' ,'text': "Please enter Password and Confirmation password"} 
            return Response(resp)
        if password == confirm_password:
            user = User.objects.create_user(username, email, password)
            resp = {'status':'Success' ,'user_id': user.id, 'username': user.username, 'email': user.email} 
            return Response(resp)
        else:
            resp = {'status':'Error' ,'text': "Password and confirmation password do not match."} 
            return Response(resp)

class loginViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = login_model.objects.all()
    serializer_class = login_Serializer 

    #Post tourist_place data
    def create(self, request):
        #Get input
        searchData = request.data
        username = searchData['username']
        email = searchData['email']
        password = searchData['password']

        user_list = User.objects.all()
        user_all = pd.DataFrame(list(user_list.values()))
        
        #check username
        if username in list(user_all.username) or email in list(user_all.email):
            user_id = user_all[user_all.username == username].id.max()
            _user = User.objects.get(id = user_id)

            #check password
            if password == '':
                resp = {'status':'Error' ,'text': "Please enter Password."} 
                return Response(resp, status=status.HTTP_404_NOT_FOUND)

            if not check_password(password, _user.password):
                resp = {'status':'Error' ,'text': "That is not the correct Password."}
                return Response(resp, status=status.HTTP_404_NOT_FOUND)
            else:
                resp = {'status':'Success' ,'user_id': _user.id, 'username': _user.username, 'email': _user.email} 
                return Response(resp)
        else:
            resp = {'status':'Error' ,'text': "not found that user."}
            return Response(resp, status=status.HTTP_404_NOT_FOUND)




    





