import React, { useState } from "react"
import { Alert, View, Button, StyleSheet, Text } from "react-native"
import QRCode from "react-native-qrcode-svg"

import { supabase } from "../configs/supabase"
import { Loading } from "../components/Loading"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type PersonalDataScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "PersonalData"
>

export const PersonalDataScreen = ({ route }: PersonalDataScreenProps) => {
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

  const { name, email, sr, document, course, semester } =
    route.params.personalData

  return (
    <>
      <Text>Nome: {name}</Text>
      <Text>E-mail: {email}</Text>
      <Text>RA: {sr}</Text>
      <Text>CPF: {document}</Text>
      <Text>Curso: {course}</Text>
      <Text>Semestre: {semester}</Text>

      <QRCode size={350} value={sr} />

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
