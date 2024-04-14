import { Pressable, StyleSheet, Text, View } from "react-native"

import { Loading } from "./Loading"
import { QRCode } from "./QRCode"

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

  const { name, course, sr, document } = personalData

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
        {sr && <Text style={styles.info}>RA: {sr}</Text>}
        {course && <Text style={styles.info}>Curso: {course}</Text>}
      </View>

      <QRCode size={40} value={sr ?? document} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 8
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
