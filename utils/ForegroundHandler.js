import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import * as RootNavigation from '../Router/RootNavigation';

export default ForegroundHandler = () => {

  useEffect(() => {
    ///Foreground Message Handling

    PushNotification.popInitialNotification((notification) => {
      console.log('Initial Notification', notification);
    });
    
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      const { messageId, notification } = remoteMessage;
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: token => {
          console.log('TOKEN:', token,'----------------',remoteMessage);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: notification => {
          console.log('NOTIFICATION:', notification);
          if(notification?.title !== 'DATA_CONFIRMATION' || notification?.title !== 'DATA_CORRECTION_REQUEST')
          PushNotification.localNotification({
            channelId: 'MDChannelID',
            messageId: messageId,
            title: notification.title,
            message: notification.body,
            playSound: true,
            soundName: 'default',
            vibrate: true,
          });
          if (notification?.title === 'DATA_CONFIRMATION') {
            RootNavigation.navigate('Proceed', { status: true });
          }
          if (notification?.title === 'DATA_CORRECTION_REQUEST') {
            RootNavigation.navigate('CorrectionScreen', { AcyivityId: notification?.data?.activityId });
          }
          // if (notification.userInteraction) {
          //   if (notification?.title === 'DATA_CONFIRMATION') {
          //     RootNavigation.navigate('Proceed', { status: true });
          //   }
          //   if (notification?.title === 'DATA_CORRECTION_REQUEST') {
          //     RootNavigation.navigate('CorrectionScreen', { AcyivityId: notification?.data?.activityId });
          //   }
          // }
        },

        onRegistrationError: err => {
          console.error(err?.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        popInitialNotification: false,
        requestPermissions: true

      });

    });
    return unSubscribe;

  }, []);

  return null;

};
