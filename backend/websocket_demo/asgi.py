"""
ASGI config for websocket_demo project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""
import os
from django.core.asgi import get_asgi_application
from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import django_eventstream
import ws.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'websocket_demo.settings')

application = ProtocolTypeRouter({
    'http': URLRouter([
        re_path(r'^events/', AuthMiddlewareStack(
            URLRouter(django_eventstream.routing.urlpatterns)
        ), { 'channels': ['test'] }),
        re_path(r'', get_asgi_application()),
    ]),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            ws.routing.websocket_urlpatterns
        )
    )
})
