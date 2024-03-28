import { StyleSheet, Text, View } from "react-native"

import { Loading } from "../Loading"
import { QRCode } from "../QRCode"

import { useAuthContext } from "../../contexts/AuthContext"
import { usePersonalData } from "../../hooks/usePersonalData"

export const PersonalData = () => {
  const accessToken = useAuthContext().accessToken as string
  const { loadingPersonalData, personalData } = usePersonalData(accessToken)

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

  const { name, email, sr, document } = personalData

  return (
    <View style={styles.container}>
      <Text>Nome: {name}</Text>
      <Text>E-mail: {email}</Text>
      <Text>RA: {sr}</Text>
      <Text>CPF: {document}</Text>

      <QRCode size={100} value={sr} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
