import { useEffect } from "react"
import { PermissionsAndroid, Platform, Alert } from "react-native"
import messaging from "@react-native-firebase/messaging"
import AsyncStorage from "@react-native-async-storage/async-storage"

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

const quitStateNotification = async (callback: () => void) => {
  const remoteMessage = await messaging().getInitialNotification()

  if (remoteMessage) {
    callback()
  }
}

const backgroundNotification = (callback: () => void) => {
  messaging().onNotificationOpenedApp(_remoteMessage => {
    callback()
  })
}

const foregroundNotification = (callback: () => Promise<void>) => {
  return messaging().onMessage(async remoteMessage => {
    if (remoteMessage.notification) {
      await callback()

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
    const unsubscribe = foregroundNotification(newNotification)

    return unsubscribe
  }, [])
}
