import React, { useState } from "react"
import { View, Button, StyleSheet, Alert } from "react-native"

import { Loading } from "../components/Loading"
import { PersonalData } from "../components/PersonalData/PersonalData"
import { Classes } from "../components/Classes/Classes"

import { supabase } from "../configs/supabase"
import { useAuthContext } from "../contexts/AuthContext"
import { useSubscribeTopics } from "../hooks/useSubscribeTopics"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const accessToken = useAuthContext().accessToken as string
  useSubscribeTopics(accessToken)

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
    <View>
      <PersonalData />
      <Classes />

      <View style={[styles.verticallySpaced]}>
        <Button title="Sair" onPress={handleLogout} />
      </View>

      <View style={[styles.verticallySpaced]}>
        <Button title="Notificações" onPress={handleNotifications} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  }
})
