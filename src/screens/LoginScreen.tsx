import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"

import { Button } from "../components/Button"
import Logo from "../assets/svgs/logo.svg"

import { supabase } from "../configs/supabase"
import { theme } from "../configs/theme"

const { colors, sizes } = theme

export const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    if (!email) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Preencha o e-mail",
        button: "Continuar"
      })
    }

    if (!password) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Preencha a senha",
        button: "Continuar"
      })
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Dados inválidos",
        button: "Continuar"
      })
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Escola</Text>
      <Logo />

      <View style={styles.formContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.formTitle}>Entrar</Text>
        </View>

        <View style={styles.sectionContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            placeholderTextColor={colors.darkGray}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.sectionContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={signIn}
            placeholder="Senha"
            placeholderTextColor={colors.darkGray}
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <Button text="Entrar" onPress={signIn} disabled={loading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.main
  },
  title: {
    marginBottom: 6,
    color: colors.white,
    fontSize: sizes.xLarge,
    lineHeight: sizes.xLarge,
    textTransform: "uppercase"
  },
  formContainer: {
    width: "100%",
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.lightGray,
    borderRadius: 8
  },
  sectionContainer: {
    marginBottom: 16
  },
  formTitle: {
    color: colors.darkestGray,
    fontSize: sizes.medium,
    lineHeight: sizes.medium
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.white,
    color: colors.darkestGray
  }
})
