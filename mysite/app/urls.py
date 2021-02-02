from django.urls import path, include
from rest_framework import routers
from .views import HeatmapViewSet, GridViewSet, tourist_placeViewSet, trip_title_apiViewSet, trip_detail_analysisViewSet

router = routers.DefaultRouter()
router.register(r'heatMap', HeatmapViewSet)
router.register(r'gridMap', GridViewSet)
router.register(r'tourist_place', tourist_placeViewSet)
router.register(r'trip_title_api', trip_title_apiViewSet)
router.register(r'trip_detail_analysis', trip_detail_analysisViewSet)

urlpatterns = [
    path('', include(router.urls))
]