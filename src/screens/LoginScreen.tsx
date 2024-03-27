import React, { useState } from "react"
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Button,
  TextInput
} from "react-native"

import { supabase } from "../configs/supabase"
import { useNavigation } from "../hooks/useNavigation"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AuthStackParamList } from "../navigation/AuthStack"

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", state => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">

export const LoginScreen = ({}: Readonly<LoginScreenProps>) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { navigate } = useNavigation()

  async function signInWithEmail() {
    setLoading(true)

    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    console.log("data", data)

    if (error) {
      Alert.alert(error.message)
    }

    setLoading(false)
  }

  const handleNavigate = () => {
    navigate("App", { screen: "Home" })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          // label="Email"
          // leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          // label="Password"
          // leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Entrar" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Navegar para home"
          disabled={loading}
          onPress={handleNavigate}
        />
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
