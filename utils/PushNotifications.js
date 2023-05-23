import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../Router/RootNavigation';

export const requestUserPermission = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old FCM Token --> ', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('New Generate FCM Token ===> ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const NotificationServices = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    
    if (remoteMessage.notification?.title === 'DATA_CONFIRMATION') {
      RootNavigation.navigate('Proceed',{status:true});
    }
    if (remoteMessage.notification?.title === 'DATA_CORRECTION_REQUEST') {
      RootNavigation.navigate('CorrectionScreen', { AcyivityId: remoteMessage.notification?.data?.activityId });
    }
  });

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
      if (remoteMessage.notification?.title === 'DATA_CONFIRMATION') {
        RootNavigation.navigate('Proceed',{status:true});
      }
      if (remoteMessage.notification?.title === 'DATA_CORRECTION_REQUEST') {
        RootNavigation.navigate('CorrectionScreen', { AcyivityId: remoteMessage.notification?.data?.activityId });
      }
    }
  });
  
};
