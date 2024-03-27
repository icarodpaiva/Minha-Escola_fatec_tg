import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { LoginScreen } from "../screens"

export type AuthStackParamList = {
  Login: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>()

export const AuthStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
    </Navigator>
  )
}
