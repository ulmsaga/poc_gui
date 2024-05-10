import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer  from './store';
// style
import 'styles/common.css';
import 'material-icons/css/material-icons.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-tree/lib/main.css';
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css";

import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger, thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <App /> 
    </PersistGate>
  </Provider>
);

reportWebVitals();
