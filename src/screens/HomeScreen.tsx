import React from "react"
import { View, Button, StyleSheet } from "react-native"

import { useNavigation } from "../hooks/useNavigation"

export const HomeScreen = () => {
  const { navigate } = useNavigation()

  const handleNavigate = () => {
    navigate("Auth", { screen: "Login" })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Voltar para o login" onPress={handleNavigate} />
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
