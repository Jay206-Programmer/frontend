from django.urls import path
from .views import *

urlpatterns = [

    path('demo/http/',HttpDemoClass.as_view()),
    path('demo/update/',UpdateClass.as_view()),
    path('demo/send_event/',SendEvent.as_view())
]