import React, { useState } from "react"
import { View, Button, StyleSheet, Alert } from "react-native"

import { Loading } from "../components/Loading"

import { supabase } from "../configs/supabase"

export const HomeScreen = () => {
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
