import "react-native-url-polyfill/auto"
import { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"

import Auth from "@/components/Auth"

import { useNotificationListener } from "@/hooks/useNotificationListener"
import { useSubscribeTopics } from "@/hooks/useSubscribeTopics"
import { requestUserPermission } from "@/utils/notifications/requestUserPermission"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/utils/supabase"

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  console.log("session", session)

  useNotificationListener()
  useSubscribeTopics(["3"])

  useEffect(() => {
    requestUserPermission()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Auth />

      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
