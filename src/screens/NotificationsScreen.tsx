import React, { useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, Button } from "react-native"
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

  if (!notifications?.length) {
    return (
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {isStaff && <Button title="Enviar nova notificação" />}

        <Text>Sem notificações</Text>
      </View>
    )
  }

  const handleCreateNotification = () => {
    navigate("App", { screen: "CreateNotification", params: { refetch } })
  }

  return (
    <ScrollView>
      {isStaff && (
        <Button
          title="Enviar nova notificação"
          onPress={handleCreateNotification}
        />
      )}

      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  }
})
