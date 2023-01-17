import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import Router from './Router';
import './Translations/IMLocalize';

const App = () => {
  LogBox.ignoreAllLogs();
  const isDarkMode = true
  return (
    <>
      <Router />
    </>
  );
}

export default App;