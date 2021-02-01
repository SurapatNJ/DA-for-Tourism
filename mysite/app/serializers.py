from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Heatmap, gridMap, tourist_place_detail

class HeatmapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Heatmap
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws', 
        'date_start', 'date_end']

class GridSerializer(serializers.ModelSerializer):

    class Meta:
        model = gridMap
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws']

class tourist_placeSerializer(serializers.ModelSerializer):

    class Meta:
        model = tourist_place_detail
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws', 
        'date_start', 'date_end']
        