import React from "react"
import { AppRegistry, Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"

import App from "./App"

import { name as appName } from "./app.json"

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.info("Message handled in the background!", remoteMessage)
})

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (Platform.OS === "ios" && isHeadless) {
    return null
  }

  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
