import React, { useEffect } from "react"
import { ScrollView, Button, Text, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Loading } from "../components/Loading"
import { Notification } from "../components/Notification"

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

  if (loadingNotifications) {
    return <Loading />
  }

  const handleCreateNotification = () => {
    navigate("App", { screen: "CreateNotification", params: { refetch } })
  }

  return (
    <ScrollView style={styles.container}>
      {isStaff && (
        <Button
          title="Enviar nova notificação"
          onPress={handleCreateNotification}
        />
      )}

      {!notifications || notifications.length === 0 ? (
        <Text>Sem notificações</Text>
      ) : (
        <>
          {notifications.map(notification => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16
  }
})
