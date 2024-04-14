import { Pressable, Text, StyleSheet } from "react-native"

import { theme } from "../configs/theme"

const { colors, sizes } = theme

interface ButtonProps {
  text: string
  onPress: () => void
  disabled?: boolean
}

export const Button = ({ text, onPress, disabled }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.main
  },
  text: {
    color: colors.white,
    fontSize: sizes.medium,
    textAlign: "center"
  }
})
