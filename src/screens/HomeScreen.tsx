import React from "react"
import { View, Button, Text, Dimensions } from "react-native"

import { PersonalData } from "../components/PersonalData"
import { Classes } from "../components/Classes"

import { useAppContext } from "../contexts/AppContext"
import { useSubscribeTopics } from "../hooks/useSubscribeTopics"
import { useNotificationsListener } from "../hooks/useNotificationsListener"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">

const { height: screenHeight } = Dimensions.get("window")

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useSubscribeTopics()
  useNotificationsListener()
  const { hasNewNotification } = useAppContext()

  const handleNotifications = () => {
    navigation.navigate("Notifications")
  }

  return (
    <View>
      <View style={{ height: (screenHeight / 100) * 20 }}>
        <PersonalData />
      </View>

      <View style={{ height: (screenHeight / 100) * 70 }}>
        <Classes />
      </View>

      <View style={{ height: (screenHeight / 100) * 10 }}>
        {hasNewNotification && <Text>Há notificações não visualizadas</Text>}
        <View>
          <Button title="Notificações" onPress={handleNotifications} />
        </View>
      </View>
    </View>
  )
}
