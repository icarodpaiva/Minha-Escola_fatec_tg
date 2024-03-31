import React from "react"
import { View, Button, StyleSheet, Text } from "react-native"

import { PersonalData } from "../components/PersonalData"
import { Classes } from "../components/Classes"

import { useAuthContext } from "../contexts/AuthContext"
import { useAppContext } from "../contexts/AppContext"
import { useSubscribeTopics } from "../hooks/useSubscribeTopics"
import { useNotificationsListener } from "../hooks/useNotificationsListener"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const accessToken = useAuthContext().accessToken as string
  useSubscribeTopics(accessToken)
  useNotificationsListener()
  const { hasNewNotification } = useAppContext()

  const handleNotifications = () => {
    navigation.navigate("Notifications")
  }

  return (
    <View>
      <PersonalData />
      <Classes />

      {hasNewNotification && <Text>Há notificações não visualizadas</Text>}
      <View style={[styles.verticallySpaced]}>
        <Button title="Notificações" onPress={handleNotifications} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  }
})
