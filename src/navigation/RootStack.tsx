import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Loading } from "../components/Loading"
import { AuthStack } from "./AuthStack"
import { AppStack } from "./AppStack"

import { useAuthContext } from "../contexts/AuthContext"

import type { NavigatorScreenParams } from "@react-navigation/native"
import type { AuthStackParamList } from "./AuthStack"
import type { AppStackParamList } from "./AppStack"

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  App: NavigatorScreenParams<AppStackParamList>
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const RootStack = () => {
  const { loading, accessToken } = useAuthContext()

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {!accessToken ? (
          <Screen name="Auth" component={AuthStack} />
        ) : (
          <Screen name="App" component={AppStack} />
        )}
      </Navigator>
    </NavigationContainer>
  )
}
