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
import configureStore from './Redux/store';

const store = configureStore()

const App = () => {

  LogBox.ignoreAllLogs();

  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);

  return (
    <Provider store={store}>
      <ForegroundHandler />
      <Router />
    </Provider>
  );

}

export default App;