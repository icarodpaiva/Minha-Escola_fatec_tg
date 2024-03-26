import { PermissionsAndroid, Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"

const { AUTHORIZED, PROVISIONAL } = messaging.AuthorizationStatus

export const requestUserPermission = async () => {
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
