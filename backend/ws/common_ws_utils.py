from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class WSUtils:
    
    def send_message(self,username,message):
        channel_layer = get_channel_layer()
        room_group_name = username
    
        async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            'type': 'channel_message',
            'message': message
        }
    )
    