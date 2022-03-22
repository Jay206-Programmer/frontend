#* Library Imports
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
from django_eventstream import send_event

#* Relative Imports
from .keras_callbacks import SSECallback

class KerasModel:
    
    def _getData(self, dataset_name = 'pima-indians-diabetes.csv'):
        '''
            Used to get train & test datasets for given dataset name.
            
            Args:
            ----
            dataset_name (`String`): name of the dataset. (Stored in the dataset folder)
            
            Returns:
            -------
            X (`ndarray`): train data.
            y (`ndarray`): train target data.
        '''
        # load the dataset
        dataset = loadtxt(f'ws/datasets/{dataset_name}', delimiter=',')
        
        # split into input (X) and output (y) variables
        X = dataset[:,0:8]
        y = dataset[:,8]

        return X, y
    
    def _preprocessModel(self):
        '''
            Prepare & Compile the model.
            
            Args:
            -----
            None
            
            Returns:
            --------
            model (`keras.Sequential`): Compiled model
        '''
        
        # define the keras model
        model = Sequential()
        model.add(Dense(12, input_dim=8, activation='relu'))
        model.add(Dense(8, activation='relu'))
        model.add(Dense(1, activation='sigmoid'))

        # Compile the model
        model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

        return model
    
    def _trainModel(self, model, X, y, epochs = 150, batch_size = 10, callbacks = []):
        '''
            Accepts the trained model & trains it.
            
            Args:
            -----
            model (`keras.Sequential`): Compiled model
            X (`ndarray`): Training data
            Y (`ndarray`): Training Target data
            epochs (`Int`): Number of epochs. Default 150.
            batch_size (`Int`): Number of rows par batch. Default 10.
            
            Returns:
            --------
            None
        '''
        model.fit(X, y, epochs=epochs, batch_size=batch_size, callbacks=callbacks)
        
    def executePipeline(self, user, dataset_name = 'pima-indians-diabetes.csv',
                        epoch = 150, batch_size = 10):
        '''
            Executes model training pipeline for given dataset.
        '''
        
        X, y = self._getData(dataset_name=dataset_name)
        
        model = self._preprocessModel()
        
        SSEObject = SSECallback(user=user)
        self._trainModel(model= model, X= X, y= y, callbacks=[SSEObject])