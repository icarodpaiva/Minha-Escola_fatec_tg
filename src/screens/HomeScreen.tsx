import React from "react"
import { View, StyleSheet } from "react-native"

import { PersonalData } from "../components/PersonalData"
import { Classes } from "../components/Classes"
import { NotificationsButton } from "../components/NotificationsButton"

import { theme } from "../configs/theme"
import { useSubscribeTopics } from "../hooks/useSubscribeTopics"
import { useNotificationsListener } from "../hooks/useNotificationsListener"

export const HomeScreen = () => {
  useSubscribeTopics()
  useNotificationsListener()

  return (
    <View style={styles.container}>
      <PersonalData />
      <Classes />
      <NotificationsButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.lightGray
  }
})
