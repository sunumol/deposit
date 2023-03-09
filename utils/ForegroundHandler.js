import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default ForegroundHandler = () => {

  useEffect(() => {

    ///Foreground Message Handling
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      const { messageId, notification } = remoteMessage;
      console.log('Notification in Foreground --->', remoteMessage);
      PushNotification.localNotification({
        channelId: 'MDChannelID',
        messageId: messageId,
        title: notification.title,
        message: notification.body,
        playSound: true,
        soundName: 'default',
        vibrate: true,
      });
    });
    return unSubscribe;

  }, []);

  return null;

};
