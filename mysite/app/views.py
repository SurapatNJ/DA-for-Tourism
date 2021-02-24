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
from .models import signup_model, login_model
from .serializers import HeatmapSerializer, GridSerializer, tourist_placeSerializer, trip_title_apiSerializer, trip_detail_analysisSerializer
from .serializers import signup_Serializer, login_Serializer
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
            pop_tourism['days'] = pop_tourism.apply(lambda x: (dt.datetime(2020, int(x.date.split('-')[1]), int(x.date.split('-')[0]))-dt.datetime(2020,1,1)).days, axis=1)
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

    #Post tourist_place data
    def create(self, request):
        #Get input
        searchData = request.data
        user_id = searchData['user_id']
        trip_name = searchData['trip_name']
        city_code = searchData['city_code']
        start_trip_date = searchData['start_trip_date'] # start date
        end_trip_date = searchData['end_trip_date'] # end date
        hotel_id = searchData['hotel_id'] # hotal for trip

        trip_data = searchData['trip_data'] # trip details

        #check user_id
        user = list(User.objects.filter(id = int(user_id)))
        if user != []:
            new_trip = trip_title_api()
            new_trip.user_id = user_id
            new_trip.trip_name = trip_name
            new_trip.city_code = city_code
            new_trip.start_trip_date = start_trip_date
            new_trip.end_trip_date = end_trip_date
            new_trip.hotel_id = hotel_id
            new_trip.trip_data = trip_data
            new_trip.save()

            resp = {'id':new_trip.id, 'user_id':new_trip.user_id, 'trip_name':new_trip.trip_name, 'city_code':new_trip.city_code,
                    'start_trip_date':new_trip.start_trip_date, 'end_trip_date':new_trip.end_trip_date, 'hotel_id':new_trip.hotel_id, 'trip_data':new_trip.trip_data}

            return Response(resp)
        return Response('Error', status=status.HTTP_404_NOT_FOUND)


        

# trip_detail_analysis
class trip_detail_analysisViewSet(viewsets.ModelViewSet):
    #Set model 
    queryset = trip_detail_analysis.objects.all()
    serializer_class = trip_detail_analysisSerializer 

    #Post tourist_place data
    def create(self, request):
        #Get input
        searchData = request.data
        date_start = searchData['date_start'] # start datetime
        date_end = searchData['date_end'] # end datetime
        hotal_id = searchData['hotal_id'] # hotal for trip
        trip_data = searchData['trip_data'] # trip details

        #pop data in year
        _date_tourism = pd.read_csv(main_path + "/data_car_stop/all_date_tourism.csv", encoding='TIS620')
        hotal_list = pd.read_csv(main_path + "/data_car_stop/cbi_hotels_data.csv", encoding='utf8')

        #get trip_data to json
        jTrip = json.loads(trip_data)

        #Set json to dataframe pandas
        _trip_all = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked'))
        for t in jTrip:
           _trip_all = _trip_all.append(t, ignore_index=True)

        #filter date_tourism with hotal's position in 100 km^2
        hotal_data = hotal_list[hotal_list.Id == int(hotal_id)]
        date_tourism = _date_tourism[_date_tourism.lat >= float(hotal_data.Latitude) - 0.1][_date_tourism.lat <= float(hotal_data.Latitude) + 0.1]
        date_tourism = date_tourism[_date_tourism.lng >= float(hotal_data.Longtitude) - 0.1][_date_tourism.lng <= float(hotal_data.Longtitude) + 0.1]

        #Find time_period and place_list for random genetic
        trip_all = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip','time_period', 'place_list'))
        for index, row in _trip_all.iterrows():
            del index
            time_start = dt.datetime.strptime(row.datetime_start, '%Y-%m-%d %H:%M:%S')
            time_end = dt.datetime.strptime(row.datetime_end, '%Y-%m-%d %H:%M:%S')

            _y = time_start.year
            _m = time_start.month
            _d = time_start.day
            dTime = time_end - time_start

            row['time_trip'] = round(dTime.seconds/60,2)
            if time_start >= dt.datetime(_y,_m,_d,0) - dTime/2 and time_end < dt.datetime(_y,_m,_d,6) + dTime/2:
                row['time_period'] = 0
                row['place_list'] = date_tourism[date_tourism.pp_last_night > 0]
            elif time_start >= dt.datetime(_y,_m,_d,6) - dTime/2 and time_end < dt.datetime(_y,_m,_d,12) + dTime/2:
                row['time_period'] = 1
                row['place_list'] = date_tourism[date_tourism.pp_morning > 0]
            elif time_start >= dt.datetime(_y,_m,_d,12) - dTime/2 and time_end < dt.datetime(_y,_m,_d,16) + dTime/2:
                row['time_period'] = 2
                row['place_list'] = date_tourism[date_tourism.pp_afternoon > 0]
            elif time_start >= dt.datetime(_y,_m,_d,16) - dTime/2 and time_end < dt.datetime(_y,_m,_d,20) + dTime/2:
                row['time_period'] = 3
                row['place_list'] = date_tourism[date_tourism.pp_evening > 0]
            elif time_start >= dt.datetime(_y,_m,_d,20) - dTime/2 and time_end <= dt.datetime(_y,_m,_d,23,59) + dTime/2:
                row['time_period'] = 4
                row['place_list'] = date_tourism[date_tourism.pp_night > 0]
            trip_all = trip_all.append(row, ignore_index=True)
        del _trip_all
        
        trip_random_list = []
        for i in range(5):
            del i
            trip_random = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point'))
            for index, row in trip_all.iterrows():
                del index
                place_list = row.place_list
                if row.locked:
                    _place = place_list[place_list.poi == row.poi]
                else:
                    # random tourlist place in dataframe
                    _place = place_list.sample()
                    while _place.poi.max() in list(trip_random.poi):
                        _place = place_list.sample()

                _trip = {'datetime_start':row.datetime_start, 'datetime_end':row.datetime_end, 
                'poi':_place.poi.max(), 'lat':_place.lat.max(), 'lon':_place.lng.max(), 'locked': row.locked}
                _trip['time_trip'] = row.time_trip
                _trip['time_tour'] = _place.travel_time.max()
                
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

        #random mutation or crossover
        for i in range(5):
            rand_number = random.randint(0,1)
            if rand_number == 0:
                trip_random_list = mutation(trip_random_list, trip_all)
            elif rand_number == 1:
                trip_random_list = crossover(trip_random_list, trip_all)
            
        set_trip = trip_random_list[0]
        for trip_random in trip_random_list:
            #get distance between tourist place
            set_position = [(row.lat,row.lon) for index, row in set_trip.iterrows()]
            set_dist = []
            for i in range(len(set_position)-1):
                lat_1, lon_1 = set_position[i]
                lat_2, lon_2 = set_position[i+1]
                distance = math.sqrt(pow(lat_1-lat_2, 2) + pow(lon_1-lon_2, 2))
                set_dist.append(distance)
            _set_dist = [round(x*10,0) for x in set_dist]
            _set_time = [round((row.time_trip-row.time_tour)/60,0) for index, row in set_trip.iterrows()]

            trip_position = [(row.lat,row.lon) for index, row in trip_random.iterrows()]
            trip_dist = []
            for i in range(len(trip_position)-1):
                lat_1, lon_1 = trip_position[i]
                lat_2, lon_2 = trip_position[i+1]
                distance = math.sqrt(pow(lat_1-lat_2, 2) + pow(lon_1-lon_2, 2))
                trip_dist.append(distance)
            _trip_dist = [round(x*10,0) for x in trip_dist]
            _trip_time = [round((row.time_trip-row.time_tour)/60,0) for index, row in trip_random.iterrows()]

            set_pop = set_trip.pop_point.sum() - sum(_set_dist) - sum(_set_time)
            trip_pop = trip_random.pop_point.sum() - sum(_trip_dist) - sum(_trip_time)

            if set_pop < trip_pop:
                set_trip = trip_random

        resp = []
        for index, row in set_trip.iterrows():
            del index
            _data = {'datetime_start':row.datetime_start, 'datetime_end':row.datetime_end, 
            'poi':row.poi, 'lat':row.lat, 'lon':row.lon, 'locked':row.locked,
            'time_trip':row.time_trip, 'time_tour':row.time_tour, 'pop_point':row.pop_point}
            resp.append(_data)

        return Response(resp)

def mutation(datalist,trip_all):
    #random trip in list
    rand_trip_list = random.choice(datalist)
    #random time_period to change tourlist place
    rand_period = rand_trip_list[rand_trip_list.locked == False].sample()
    trip_period = trip_all[trip_all.datetime_start == rand_period.datetime_start.max()]

    _place = trip_period.place_list.max().sample()
    while _place.poi.max() in list(rand_trip_list.poi):
        _place = trip_period.place_list.max().sample()

    rand_period.poi = _place.poi.max()
    rand_period.lat = _place.lat.max()
    rand_period.lon = _place.lng.max()
    rand_period.time_tour = _place.travel_time.max()

    new_trip = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point'))
    for index, row in rand_trip_list.iterrows():
        del index
        if row.datetime_start == rand_period.datetime_start.max() :
            new_trip = new_trip.append(rand_period, ignore_index=True)
        else:
            new_trip = new_trip.append(row, ignore_index=True)

    new_datalist = datalist
    new_datalist.append(new_trip)
    return new_datalist

def crossover(datalist,trip_all):
    #random trip in list
    rand_trip_list1 = random.choice(datalist)
    rand_trip_list2 = random.choice(datalist)
    while rand_trip_list2.equals(rand_trip_list1):
        rand_trip_list2 = random.choice(datalist)

    rand_period = rand_trip_list1[rand_trip_list1.locked == False].sample().datetime_start.max()
    _trip1 = rand_trip_list1[rand_trip_list1.datetime_start == rand_period]
    _trip2 = rand_trip_list2[rand_trip_list2.datetime_start == rand_period]

    new_trip1 = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point'))
    for index, row in rand_trip_list1.iterrows():
        del index
        if row.datetime_start == rand_period :
            new_trip1 = new_trip1.append(_trip2, ignore_index=True)
        else:
            new_trip1 = new_trip1.append(row, ignore_index=True)

    new_trip2 = pd.DataFrame(columns=('datetime_start', 'datetime_end', 'poi', 'lat', 'lon', 'locked','time_trip', 'time_tour', 'pop_point'))
    for index, row in rand_trip_list2.iterrows():
        del index
        if row.datetime_start == rand_period :
            new_trip2 = new_trip2.append(_trip1, ignore_index=True)
        else:
            new_trip2 = new_trip2.append(row, ignore_index=True)

    new_datalist = datalist
    new_datalist.append(new_trip1)
    new_datalist.append(new_trip2)
    return new_datalist

    

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
        if email in list(user_all.email):
            resp = {'status':'Error' ,'text': "This email (" + email + ") is already in the system."} 
            return Response(resp)
        if not re.search(regex,email):  
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




    





