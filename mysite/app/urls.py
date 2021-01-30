from django.urls import path, include
from rest_framework import routers
from .views import HeatmapViewSet, GridViewSet

router = routers.DefaultRouter()
router.register(r'heatMap', HeatmapViewSet)
router.register(r'gridMap', GridViewSet)

urlpatterns = [
    path('', include(router.urls))
]