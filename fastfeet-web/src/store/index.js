import {createStore} from 'redux';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import Reducers from './modules/Reducers';

const persistedReducer = persistReducer({key: 'fastfeet', storage, whitelist: ['auth']}, Reducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};