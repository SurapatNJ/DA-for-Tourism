from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Heatmap, gridMap, tourist_place_detail, trip_title_api, trip_detail_analysis
from .models import signup_model, login_model

class HeatmapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Heatmap
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws', 'date_start', 'date_end']

class GridSerializer(serializers.ModelSerializer):

    class Meta:
        model = gridMap
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws']

class tourist_placeSerializer(serializers.ModelSerializer):

    class Meta:
        model = tourist_place_detail
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws', 'date_start', 'date_end']

class trip_title_apiSerializer(serializers.ModelSerializer):

    class Meta:
        model = trip_title_api
        fields = ['id','user_id', 'trip_name', 'city_code', 'start_trip_date', 'end_trip_date', 'hotel_id', 'rating_point', 'trip_data', 'last_updated', 'created']

class trip_detail_analysisSerializer(serializers.ModelSerializer):

    class Meta:
        model = trip_detail_analysis
        fields = ['trip_type', 'date_start', 'date_end', 'hotal_id', 'trip_data']

class signup_Serializer(serializers.ModelSerializer):

    class Meta:
        model = signup_model
        fields = ['username', 'email', 'password', 'confirm_password']

class login_Serializer(serializers.ModelSerializer):

    class Meta:
        model = login_model
        fields = ['username', 'email', 'password']

