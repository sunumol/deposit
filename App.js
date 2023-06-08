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
import Clipboard from "@react-native-community/clipboard";
import { AppState } from "react-native";

const Store = createStore(baseReducer)

const App = () => {

  LogBox.ignoreAllLogs();

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState == "active") {
      Clipboard.setString("");
    }
  };
  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);
 
  return (
    <Provider store={Store}>
      <ForegroundHandler />
      <Router/>
    </Provider>
  );

}

export default App;