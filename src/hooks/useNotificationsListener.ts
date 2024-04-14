import { useEffect } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import { useAppContext } from "../contexts/AppContext"
import { useNavigation } from "./useNavigation"

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

const quitStateNotification = async (navigateToNotifications: () => void) => {
  const remoteMessage = await messaging().getInitialNotification()

  if (remoteMessage) {
    navigateToNotifications()
  }
}

const backgroundNotification = (navigateToNotifications: () => void) => {
  messaging().onNotificationOpenedApp(_remoteMessage => {
    navigateToNotifications()
  })
}

const foregroundNotification = (
  newNotification: () => Promise<void>,
  navigateToNotifications: () => void
) => {
  return messaging().onMessage(async remoteMessage => {
    if (remoteMessage.notification) {
      await newNotification()

      const { title, body: message } = remoteMessage.notification

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title,
        textBody: message,
        onPress: navigateToNotifications,
        autoClose: true
      })
    }
  })
}

export const useNotificationsListener = () => {
  const { setHasNewNotification } = useAppContext()
  const { navigate } = useNavigation()

  const navigateToNotifications = () => {
    navigate("App", { screen: "Notifications" })
  }

  const newNotification = async () => {
    await AsyncStorage.setItem("hasNewNotification", "true")
    setHasNewNotification(true)
  }

  useEffect(() => {
    requestUserPermission()
    quitStateNotification(navigateToNotifications)
    backgroundNotification(navigateToNotifications)
    const unsubscribe = foregroundNotification(
      newNotification,
      navigateToNotifications
    )

    return unsubscribe
  }, [])
}
