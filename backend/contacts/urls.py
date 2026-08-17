from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, RegisterView

router = DefaultRouter()

router.register(
    r'contacts',
    ContactViewSet,
    basename='contact'
)

urlpatterns = [
    path(
        'register/', 
        RegisterView.as_view(), 
        name='register'),
]

urlpatterns += router.urls