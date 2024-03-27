import { useEffect } from "react"
import { Alert } from "react-native"
import messaging from "@react-native-firebase/messaging"

export const useNotificationListener = () => {
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          )
        }
      })

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      )
    })

    const unsubscribe = messaging().onMessage(remoteMessage => {
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

    return unsubscribe
  }, [])
}
