import React from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

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
    <ScrollView>
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
