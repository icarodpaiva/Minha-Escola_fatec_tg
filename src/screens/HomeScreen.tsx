import React, { useState } from "react"
import { View, Button, StyleSheet, Alert } from "react-native"

import { Loading } from "../components/Loading"

import { supabase } from "../configs/supabase"
import { useAuthContext } from "../contexts/AuthContext"
import { usePersonalData } from "../hooks/usePersonalData"
import { useClasses } from "../hooks/useClasses"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const accessToken = useAuthContext().accessToken as string
  const { loadingPersonalData, personalData } = usePersonalData(accessToken)
  const { loadingClasses, classes } = useClasses(accessToken)

  const handleNotifications = () => {
    navigation.navigate("Notifications")
  }

  // TO-DO: Move this to PersonalDataScreen
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      Alert.alert(error.message)
    }

    setLoading(false)
  }
  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sair" onPress={handleLogout} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Notificações" onPress={handleNotifications} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  }
})
