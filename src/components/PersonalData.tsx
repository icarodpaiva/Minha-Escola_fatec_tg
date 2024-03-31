import { Pressable, StyleSheet, Text, View } from "react-native"

import { Loading } from "./Loading"
import { QRCode } from "./QRCode"

import { useAuthContext } from "../contexts/AuthContext"
import { usePersonalData } from "../hooks/usePersonalData"
import { useNavigation } from "../hooks/useNavigation"

export const PersonalData = () => {
  const accessToken = useAuthContext().accessToken as string
  const { loadingPersonalData, personalData } = usePersonalData(accessToken)
  const { navigate } = useNavigation()

  if (loadingPersonalData) {
    return <Loading />
  }

  if (!personalData) {
    return (
      <View style={styles.container}>
        <Text>Falha ao recuperar dados pessoais</Text>
      </View>
    )
  }

  const { name, email, sr } = personalData

  const handlePersonalData = () => {
    navigate("App", { screen: "PersonalData", params: { personalData } })
  }

  return (
    <Pressable onPress={handlePersonalData} style={styles.container}>
      <Text>Nome: {name}</Text>
      <Text>E-mail: {email}</Text>
      <Text>RA: {sr}</Text>

      <QRCode size={100} value={sr} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
