import React, { useEffect } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Notification, NotificationSkeleton } from "../components/Notification"
import { Button } from "../components/Button"

import { useAuthContext } from "../contexts/AuthContext"
import { useAppContext } from "../contexts/AppContext"
import { useNotifications } from "../hooks/useNotifications"
import { useNavigation } from "../hooks/useNavigation"

export const NotificationsScreen = () => {
  const { isStaff } = useAuthContext()
  const { setHasNewNotification } = useAppContext()
  const { loadingNotifications, notifications, refetch } = useNotifications()
  const { navigate } = useNavigation()

  useEffect(() => {
    AsyncStorage.setItem("hasNewNotification", "false").then(() => {
      setHasNewNotification(false)
    })
  }, [])

  const handleCreateNotification = () => {
    navigate("App", { screen: "CreateNotification", params: { refetch } })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.notificationsContainer}>
        {loadingNotifications
          ? Array.from({ length: 3 }).map((_, index) => (
              <NotificationSkeleton key={index} />
            ))
          : notifications?.map(notification => (
              <Notification key={notification.id} notification={notification} />
            ))}
      </ScrollView>

      {isStaff && (
        <Button text="Nova notificação" onPress={handleCreateNotification} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  notificationsContainer: {
    flex: 1,
    marginBottom: 16
  }
})
