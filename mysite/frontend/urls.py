from django.urls import path
from .views import index


urlpatterns = [
    path('', index),
    path('offers/', index),
    path('classes/', index),
    path('login/', index),
    path('register/', index),
    path('class/<str:resource_key>/', index),
    path('classesnew/', index),
    path('myvideos/', index),
    path('about/', index),
    path('user/', index),
    path('checkout/<str:currency>/<str:duration>/', index),
    path('moviepage/', index),
]
