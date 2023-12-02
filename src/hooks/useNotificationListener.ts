import {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const useNotificationListener = () => {
  useEffect(() => {
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

    const unsubscribeOpenedAppNotification =
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
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
