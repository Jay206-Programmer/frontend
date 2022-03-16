import json
from channels.generic.websocket import WebsocketConsumer
# from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class ChatConsumer(WebsocketConsumer):
    def connect(self):

        try:
            self.room_group_name = str(self.scope['url_route']['kwargs']['username'])
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()

        except Exception as exc:
            print(exc)

    def receive(self,event):
        try:
            self.room_group_name = "Game"
            async_to_sync(self.channel_layer.group_send)(
                "Game",
                {
                    'type': 'channel_message',
                    'message': event
                }
            )
        except Exception as exc:
            print(exc)

    def channel_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
