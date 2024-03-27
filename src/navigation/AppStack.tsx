import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { HomeScreen } from "../screens"

export type AppStackParamList = {
  Home: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>()

export const AppStack = () => {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  )
}
