import React from "react"
import { View, Text, StyleSheet } from "react-native"

import { Loading } from "../components/Loading"

import { useAuthContext } from "../contexts/AuthContext"
import { useNotifications } from "../hooks/useNotifications"
import { Notification } from "../components/Notification/Notification"

export const NotificationsScreen = () => {
  const accessToken = useAuthContext().accessToken as string
  const { loadingNotifications, notifications } = useNotifications(accessToken)

  if (loadingNotifications) {
    return <Loading />
  }

  if (!notifications?.length) {
    return (
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>Sem notificações</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  }
})
