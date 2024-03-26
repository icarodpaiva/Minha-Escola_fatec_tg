import { useEffect } from "react"

import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import { requestUserPermission } from "@/utils/notifications/requestUserPermission"
import { useNotificationListener } from "@/hooks/useNotificationListener"

export default function App() {
  useNotificationListener()

  useEffect(() => {
    requestUserPermission()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Teste666</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
