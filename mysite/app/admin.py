from django.contrib import admin
from .models import trip_titles, trip_details

# Register your models here.
@admin.register(trip_titles)
class trip_titles(admin.ModelAdmin):
    list_display = ('id', 'user', 'trip_name', 'city_code', 'start_trip_date', 'end_trip_date', 'hotel_id', 'last_updated', 'created')
    list_filter = ('city_code', 'trip_name', 'user')

    search_fields = ('city_code', 'trip_name', 'user')
    ordering = ('id',)

    def get_queryset(self, request):
        return super(trip_titles,self).get_queryset(request).all()

@admin.register(trip_details)
class trip_details(admin.ModelAdmin):
    list_display = ('id', 'trip_id', 'datetime_start', 'datetime_end', 'poi', 'place_name', 'lat', 'lng', 'last_updated', 'created')
    list_filter = ('poi', 'trip_id')

    search_fields = ('trip_id', 'poi')
    ordering = ('id',)

    def get_queryset(self, request):
        return super(trip_details,self).get_queryset(request).all()