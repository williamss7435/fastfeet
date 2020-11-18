import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './modules/rootReducers';

const persistedReducer = persistReducer(
    {
        key: 'fastfeet',
        storage: AsyncStorage,
    },
    rootReducer,
);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export {store, persistor};
