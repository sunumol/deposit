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



const App = () => {

  LogBox.ignoreAllLogs();

  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);

  return (
    <Provider>
      <ForegroundHandler />
      <Router />
    </Provider>
  );

}

export default App;