import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import Router from './Router';
import './Translations/IMLocalize';
import {
  requestUserPermission,
  NotificationServices,
} from './utils/PushNotifications';
import ForegroundHandler from './utils/ForegroundHandler';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { baseReducer } from './Redux/Reducer';

const Store = createStore(baseReducer)

const App = () => {

  LogBox.ignoreAllLogs();

  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);

  return (
    <Provider store={Store}>
      <ForegroundHandler />
      <Router />
    </Provider>
  );

}

export default App;