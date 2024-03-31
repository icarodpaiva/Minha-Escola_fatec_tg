import React, { useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Loading } from "../components/Loading"
import { Notification } from "../components/Notification"

import { useAuthContext } from "../contexts/AuthContext"
import { useAppContext } from "../contexts/AppContext"
import { useNotifications } from "../hooks/useNotifications"

export const NotificationsScreen = () => {
  const accessToken = useAuthContext().accessToken as string
  const { loadingNotifications, notifications } = useNotifications(accessToken)

  const { setHasNewNotification } = useAppContext()

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
