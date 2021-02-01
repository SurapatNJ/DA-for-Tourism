from django.urls import path, include
from rest_framework import routers
from .views import HeatmapViewSet, GridViewSet, tourist_placeViewSet

router = routers.DefaultRouter()
router.register(r'heatMap', HeatmapViewSet)
router.register(r'gridMap', GridViewSet)
router.register(r'tourist_place', tourist_placeViewSet)

urlpatterns = [
    path('', include(router.urls))
]