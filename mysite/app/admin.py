from django.contrib import admin
from .models import trip_title_api
# Register your models here.
@admin.register(trip_title_api)
class trip_title_api(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'trip_name', 'city_code', 'start_trip_date', 'end_trip_date', 'hotel_id', 'trip_data', 'last_updated', 'created')
    list_filter = ('city_code', 'trip_name', 'user_id','hotel_id')

    search_fields = ('city_code', 'trip_name', 'user_id', 'hotel_id')
    ordering = ('id',)

    def get_queryset(self, request):
        return super(trip_title_api,self).get_queryset(request).all()