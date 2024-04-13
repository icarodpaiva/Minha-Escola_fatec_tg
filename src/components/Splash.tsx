import { View, Text, StyleSheet } from "react-native"

import Logo from "../assets/svgs/logo.svg"

import { theme } from "../configs/theme"

const {
  colors: { main, white },
  sizes: { xLarge, medium }
} = theme

export const Splash = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Minha Escola</Text>
      <Text style={styles.subtitle}>
        O que você procura sobre seu {"\n"} ensino, encontra aqui!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: main
  },

  title: {
    marginBottom: 6,
    color: white,
    fontSize: xLarge,
    textTransform: "uppercase"
  },

  subtitle: {
    color: white,
    fontSize: medium,
    textAlign: "center"
  }
})
