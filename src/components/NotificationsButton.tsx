import { Pressable, StyleSheet } from "react-native"

import Notification from "../assets/svgs/notification.svg"
import NotificationWithAlert from "../assets/svgs/notificationWithAlert.svg"

import { useAppContext } from "../contexts/AppContext"
import { useNavigation } from "../hooks/useNavigation"

export const NotificationsButton = () => {
  const { hasNewNotification } = useAppContext()
  const { navigate } = useNavigation()

  const handleNotifications = () => {
    navigate("App", { screen: "Notifications" })
  }

  return (
    <Pressable onPress={handleNotifications} style={styles.container}>
      {hasNewNotification ? <NotificationWithAlert /> : <Notification />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end"
  }
})
