import React, { useState } from "react"
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Pressable,
  StyleSheet
} from "react-native"
import QRCode from "react-native-qrcode-svg"

import Profile from "../assets/svgs/profile.svg"

import { theme } from "../configs/theme"
import { supabase } from "../configs/supabase"

import { Loading } from "../components/Loading"
import { InfoText } from "../components/InfoText"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type PersonalDataScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "PersonalData"
>

const { width } = Dimensions.get("window")
const { colors, sizes } = theme

export const PersonalDataScreen = ({ route }: PersonalDataScreenProps) => {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  const { name, email, document, sr, course, semester } =
    route.params.personalData

  return (
    <View style={styles.container}>
      <ScrollView style={styles.infosContainer}>
        <Profile width={80} height={80} />

        <InfoText label="Nome" value={name} capitalize />
        <InfoText label="E-mail" value={email} />
        <InfoText label="CPF" value={document} />
        <InfoText label="RA" value={sr} />
        <InfoText label="Curso" value={course} />
        <InfoText label="Semestre" value={`${semester}º`} />

        <View style={styles.qrCodeContainer}>
          <QRCode value={sr ?? document} size={width - 32} quietZone={16} />
        </View>
      </ScrollView>

      <Pressable onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  infosContainer: {
    flex: 1
  },
  qrCodeContainer: {
    marginTop: 8
  },
  button: {
    borderRadius: 48,
    marginTop: 16,
    padding: 8,
    backgroundColor: colors.main
  },
  buttonText: {
    color: colors.white,
    fontSize: sizes.medium,
    textAlign: "center"
  }
})
