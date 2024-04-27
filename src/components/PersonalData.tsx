import { Pressable, StyleSheet, Text, View } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import QRCode from "react-native-qrcode-svg"

import Profile from "../assets/svgs/profile.svg"

import { theme } from "../configs/theme"
import { useAuthContext } from "../contexts/AuthContext"
import { usePersonalData } from "../hooks/usePersonalData"
import { useNavigation } from "../hooks/useNavigation"

const { colors, sizes } = theme

export const PersonalData = () => {
  const { loadingPersonalData, personalData } = usePersonalData()
  const { navigate } = useNavigation()

  if (loadingPersonalData) {
    return <PersonalDataSkeleton />
  }

  if (!personalData) {
    return null
  }

  const { name, course, registration } = personalData

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

const PersonalDataSkeleton = () => {
  const { isStaff } = useAuthContext()

  return (
    <SkeletonPlaceholder backgroundColor={colors.gray}>
      <SkeletonPlaceholder.Item style={styles.container}>
        <SkeletonPlaceholder.Item width={40} height={40} borderRadius={40} />

        <SkeletonPlaceholder.Item style={styles.dataContainer}>
          <SkeletonPlaceholder.Item height={styles.name.fontSize} />

          <SkeletonPlaceholder.Item
            height={styles.info.fontSize}
            marginTop={styles.info.marginTop}
          />

          {!isStaff && (
            <SkeletonPlaceholder.Item
              height={styles.info.fontSize}
              marginTop={styles.info.marginTop}
            />
          )}
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item width={40} height={40} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
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
