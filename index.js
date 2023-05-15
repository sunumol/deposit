/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './Router/RootNavigation';
import PushNotification from 'react-native-push-notification';

PushNotification.requestPermissions();
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        if (remoteMessage.notification?.title === 'DATA_CONFIRMATION') {
   
          RootNavigation.navigate('Proceed',{status:true,AcyivityId: remoteMessage.notification?.data?.activityId});
        }
        if (remoteMessage.notification?.title === 'DATA_CORRECTION_REQUEST') {
          RootNavigation.navigate('CorrectionScreen', { AcyivityId: remoteMessage.notification?.data?.activityId });
        }
      }
    });
});

AppRegistry.registerComponent(appName, () => App);
