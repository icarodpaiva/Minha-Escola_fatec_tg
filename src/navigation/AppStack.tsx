import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AppContextProvider, initialValue } from "../contexts/AppContext"
import {
  HomeScreen,
  PersonalDataScreen,
  ClassScreen,
  NotificationsScreen
} from "../screens"

import type { PersonalData } from "../hooks/usePersonalData"
import type { Class } from "../hooks/useClasses"

export type AppStackParamList = {
  Home: undefined
  PersonalData: { personalData: PersonalData }
  Class: { groupClass: Class; refetch: () => void }
  Notifications: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>()

export const AppStack = () => {
  return (
    <AppContextProvider {...initialValue}>
      <Navigator>
        <Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="PersonalData"
          component={PersonalDataScreen}
          options={{ headerTitle: "Dados Pessoais" }}
        />
        <Screen
          name="Class"
          component={ClassScreen}
          options={{ headerTitle: "Detalhes da aula" }}
        />
        <Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ headerTitle: "Notificações" }}
        />
      </Navigator>
    </AppContextProvider>
  )
}
