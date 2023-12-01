import {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const useNotificationListener = () => {
  useEffect(() => {
    const unsubscribeOpenedAppNotification =
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribeForegroundNotification = messaging().onMessage(
      async remoteMessage => {
        Alert.alert(JSON.stringify(remoteMessage));
      },
    );

    return () => {
      unsubscribeOpenedAppNotification();
      unsubscribeForegroundNotification();
    };
  }, []);
};
