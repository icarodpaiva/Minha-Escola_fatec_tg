import { Text, StyleSheet } from "react-native"

import { theme } from "../configs/theme"

const { colors, sizes } = theme

interface InfoTextProps {
  label: string
  value?: string | number | null
  capitalize?: boolean
}

export const InfoText = ({ label, value, capitalize }: InfoTextProps) => {
  if (!value) {
    return null
  }

  return (
    <Text style={styles.info}>
      {label}:{" "}
      <Text style={[styles.infoValue, capitalize && styles.capitalize]}>
        {value}
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  info: {
    marginTop: 8,
    color: colors.darkGray,
    fontSize: sizes.medium,
    lineHeight: sizes.medium
  },
  infoValue: {
    color: colors.darkestGray,
    fontSize: sizes.large,
    lineHeight: sizes.large
  },
  capitalize: {
    textTransform: "capitalize"
  }
})
