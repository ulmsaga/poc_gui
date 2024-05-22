import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import drawer from './reducers/drawer';
import menu from './reducers/menu';
import user from './reducers/user';
import loading from './reducers/loading';
import message from './reducers/message';
import popup from './reducers/popup';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['drawer', 'menu', 'user', 'loading', 'message', 'popup']
};

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ drawer, menu, user, loading, message, popup });

export default persistReducer(persistConfig, reducers);
