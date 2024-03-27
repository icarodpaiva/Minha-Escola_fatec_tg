import { useEffect } from "react"
import { Alert } from "react-native"
import messaging from "@react-native-firebase/messaging"

export const useNotificationListener = () => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Message handled in the background!", remoteMessage)
    })

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

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      )
    })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
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
