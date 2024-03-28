import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { HomeScreen } from "../screens"
import { NotificationsScreen } from "../screens/NotificationsScreen"

export type AppStackParamList = {
  Home: undefined
  Notifications: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>()

export const AppStack = () => {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Notifications" component={NotificationsScreen} />
    </Navigator>
  )
}
