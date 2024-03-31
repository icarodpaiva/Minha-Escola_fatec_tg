import React from "react"
import { AppRegistry, Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"
import AsyncStorage from "@react-native-async-storage/async-storage"

import App from "./App"

import { name as appName } from "./app.json"

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage.notification) {
    await AsyncStorage.setItem("hasNewNotification", "true")
  }
})

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (Platform.OS === "ios" && isHeadless) {
    return null
  }

  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
