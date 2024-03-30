import React, { useState } from "react"
import { Alert, View, Button, StyleSheet } from "react-native"

import { PersonalData } from "../components/PersonalData"

import { supabase } from "../configs/supabase"
import { Loading } from "../components/Loading"

export const PersonalDataScreen = () => {
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
    <>
      <PersonalData />

      <View style={[styles.verticallySpaced]}>
        <Button title="Sair" onPress={handleLogout} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  }
})
