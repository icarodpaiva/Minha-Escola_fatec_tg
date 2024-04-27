import { Pressable, Text, View, StyleSheet } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

import { theme } from "../configs/theme"
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigation } from "../hooks/useNavigation"

import type { Class as IClass } from "../hooks/useClasses"

interface ClassProps {
  groupClass: IClass
  refetch: () => void
}

const { colors, sizes } = theme

export const Class = ({ groupClass, refetch }: ClassProps) => {
  const { isStaff } = useAuthContext()
  const { navigate } = useNavigation()

  const {
    subject,
    group_name,
    teacher,
    start_time,
    location: { building, floor, classroom }
  } = groupClass

  const handleClass = () => {
    navigate("App", { screen: "Class", params: { groupClass, refetch } })
  }

  return (
    <Pressable onPress={handleClass} style={styles.container}>
      <Text style={styles.subject}>{subject}</Text>

      <View style={styles.infosContainer}>
        <Text style={styles.info}>
          {classroom}, {floor > 0 ? `${floor}º Andar` : "Térreo"}, {building}
        </Text>

        <Text style={styles.info}>{start_time}</Text>
      </View>

      <Text style={[styles.info, styles.capitalize]}>
        {isStaff ? `Turma: ${group_name}` : `Prof: ${teacher}`}
      </Text>
    </Pressable>
  )
}

export const ClassSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={colors.gray}>
      <SkeletonPlaceholder.Item style={styles.container}>
        <SkeletonPlaceholder.Item
          height={styles.subject.lineHeight}
          marginRight={styles.info.marginRight}
          marginBottom={styles.subject.marginBottom}
        />

        <SkeletonPlaceholder.Item style={styles.infosContainer}>
          <SkeletonPlaceholder.Item
            flex={1}
            height={styles.info.lineHeight}
            marginRight={styles.info.marginRight}
          />

          <SkeletonPlaceholder.Item
            width={50}
            height={styles.info.lineHeight}
            marginRight={styles.info.marginRight}
          />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          height={styles.info.lineHeight}
          marginRight={styles.info.marginRight}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.main,
    marginVertical: 1,
    paddingVertical: 8
  },
  subject: {
    marginBottom: 10,
    color: colors.darkestGray,
    fontSize: sizes.medium,
    lineHeight: sizes.medium
  },
  infosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  info: {
    marginRight: 10,
    color: colors.darkGray,
    fontSize: sizes.small,
    lineHeight: sizes.small
  },
  capitalize: {
    textTransform: "capitalize"
  }
})
