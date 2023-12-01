import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const {AUTHORIZED, PROVISIONAL} = messaging.AuthorizationStatus;

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled = authStatus === AUTHORIZED || authStatus === PROVISIONAL;

  if (enabled) {
    await getFCMToken();
  }
};

const getFCMToken = async () => {
  try {
    const storageFcmToken = await AsyncStorage.getItem('fcmToken');

    if (!storageFcmToken) {
      const fcmToken = await messaging().getToken();

      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  } catch (error) {
    console.error('Error getting fcmToken', error);
  }
};
