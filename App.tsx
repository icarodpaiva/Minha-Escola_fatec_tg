import React from "react"
import { AlertNotificationRoot } from "react-native-alert-notification"

import { AuthContextProvider, initialValue } from "./src/contexts/AuthContext"
import { RootStack } from "./src/navigation"

export default function App() {
  return (
    <AuthContextProvider {...initialValue}>
      <AlertNotificationRoot>
        <RootStack />
      </AlertNotificationRoot>
    </AuthContextProvider>
  )
}
