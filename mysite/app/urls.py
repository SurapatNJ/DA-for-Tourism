from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_swagger.views import get_swagger_view
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views
from .views import HeatmapViewSet, GridViewSet, tourist_placeViewSet, trip_title_apiViewSet, trip_detail_analysisViewSet
from .views import signupViewSet, loginViewSet, rating_analysisViewSet

router = routers.DefaultRouter()
router.register(r'heatMap', HeatmapViewSet)
router.register(r'gridMap', GridViewSet)
router.register(r'tourist_place', tourist_placeViewSet)
router.register(r'trip_title_api', trip_title_apiViewSet)
router.register(r'trip_detail_analysis', trip_detail_analysisViewSet)
router.register(r'rating_analysis', rating_analysisViewSet)
router.register(r'signup', signupViewSet)
router.register(r'login', loginViewSet)

schema_view = get_swagger_view(title='Tourism API')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(r'docs/', include_docs_urls(title='Tourism API')),
    path('schema/', TemplateView.as_view(
        template_name='schema.yml',
    ), name='schema'),
    path('swagger/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'schema'}
    ), name='swagger-ui'),
    path('token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh')
]