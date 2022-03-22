import keras
from django_eventstream import send_event

class SSECallback(keras.callbacks.Callback):

    def __init__(self, user):
        '''
            User defines the channel on which the message will be sent.
            Each user has their own channel with the same name.
        '''
        self.user = user
        
    def on_epoch_end(self, epoch, logs=None):
        '''
            Sends epoch metrics to the client via Server Sent Event
        '''
        # Sending metrics to the 'user' channel
        send_event(f"{self.user}", 'message', {"epoch": epoch,"data": logs})