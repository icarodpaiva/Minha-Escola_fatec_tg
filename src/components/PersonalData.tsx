import { Pressable, StyleSheet, Text, View } from "react-native"
import QRCode from "react-native-qrcode-svg"

import { Loading } from "./Loading"

import Profile from "../assets/svgs/profile.svg"

import { theme } from "../configs/theme"
import { usePersonalData } from "../hooks/usePersonalData"
import { useNavigation } from "../hooks/useNavigation"

const { colors, sizes } = theme

export const PersonalData = () => {
  const { loadingPersonalData, personalData } = usePersonalData()
  const { navigate } = useNavigation()

  if (loadingPersonalData) {
    return <Loading />
  }

  if (!personalData) {
    return null
  }

  const { name, course, registration, document } = personalData

  const handlePersonalData = () => {
    navigate("App", { screen: "PersonalData", params: { personalData } })
  }

  return (
    <Pressable onPress={handlePersonalData} style={styles.container}>
      <Profile width={40} height={40} />

      <View style={styles.dataContainer}>
        <Text numberOfLines={2} style={styles.name}>
          {name}
        </Text>

        <Text style={styles.info}>Matrícula: {registration}</Text>

        {course && <Text style={styles.info}>Curso: {course}</Text>}
      </View>

      <QRCode size={40} value={registration} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8
  },
  dataContainer: {
    flex: 1,
    marginHorizontal: 12
  },
  name: {
    color: colors.darkestGray,
    fontSize: sizes.medium,
    textTransform: "capitalize"
  },
  info: {
    marginTop: 6,
    color: colors.darkGray,
    fontSize: sizes.small
  }
})
