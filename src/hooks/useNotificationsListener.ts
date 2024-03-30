import { useEffect } from "react"
import { PermissionsAndroid, Platform, Alert } from "react-native"
import messaging from "@react-native-firebase/messaging"

const { AUTHORIZED, PROVISIONAL } = messaging.AuthorizationStatus

const requestUserPermission = async () => {
  if (Platform.OS === "android" || Platform.OS === "ios") {
    const authStatus =
      Platform.OS === "ios"
        ? await messaging().requestPermission()
        : await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          )

    const enabled =
      Platform.OS === "ios"
        ? authStatus === AUTHORIZED || authStatus === PROVISIONAL
        : authStatus === PermissionsAndroid.RESULTS.GRANTED

    if (enabled) {
      console.log("Notification permission accepted")
    } else {
      console.log("Notification permission denied")
    }
  }
}

const quitStateNotification = async () => {
  const remoteMessage = await messaging().getInitialNotification()

  if (remoteMessage) {
    console.log(
      "Notification caused app to open from quit state:",
      remoteMessage.notification
    )
  }
}

const backgroundNotification = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    )
  })
}

const foregroundNotification = () => {
  return messaging().onMessage(remoteMessage => {
    if (remoteMessage.notification) {
      const { title, body: message } = remoteMessage.notification

      Alert.alert(
        JSON.stringify({
          title,
          message
        })
      )
    }
  })
}

export const useNotificationsListener = () => {
  useEffect(() => {
    requestUserPermission()
    quitStateNotification()
    backgroundNotification()
    const unsubscribe = foregroundNotification()

    return unsubscribe
  }, [])
}
