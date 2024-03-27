import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AuthStack } from "./AuthStack"
import { AppStack } from "./AppStack"

import type { NavigatorScreenParams } from "@react-navigation/native"
import type { AuthStackParamList } from "./AuthStack"
import type { AppStackParamList } from "./AppStack"

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  App: NavigatorScreenParams<AppStackParamList>
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Auth" component={AuthStack} />
        <Screen name="App" component={AppStack} />
      </Navigator>
    </NavigationContainer>
  )
}
