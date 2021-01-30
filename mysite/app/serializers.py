from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Heatmap, gridMap

class HeatmapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Heatmap
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws', 
        'datetime_start', 'datetime_end']

class GridSerializer(serializers.ModelSerializer):

    class Meta:
        model = gridMap
        fields = ['lat_en', 'lng_en', 'lat_ws', 'lng_ws', 
        'lat_c', 'lng_c', 'datetime_start', 'datetime_end']