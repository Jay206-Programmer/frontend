from django.urls import path
from .views import *

urlpatterns = [

    path('demo/http/',HttpDemoClass.as_view()),
    
    path('demo/update/',UpdateClass.as_view()), # Websocket Demo
    
    path('demo/send_event/',SendEvent.as_view()), # SSE Demo
    
    path('demo/execute_pipeline/',ExecutePipeline.as_view()) # SSE Demo via model Training
]