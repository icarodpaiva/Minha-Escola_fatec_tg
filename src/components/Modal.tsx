import {
  Modal as NativeModal,
  View,
  Text,
  Pressable,
  StyleSheet
} from "react-native"

import Close from "../assets/svgs/close.svg"

import { theme } from "../configs/theme"

import type { PropsWithChildren } from "react"

interface ModalProps {
  visible: boolean
  onCancel: () => void
  title: string
}

const { colors, sizes } = theme

export const Modal = ({
  visible,
  onCancel,
  title,
  children
}: PropsWithChildren<ModalProps>) => {
  return (
    <NativeModal visible={visible} onRequestClose={onCancel} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Pressable onPress={onCancel} style={styles.headerClose}>
              <Close width={24} height={24} />
            </Pressable>
          </View>

          {children}
        </View>
      </View>
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.overlay,
    padding: 16
  },
  content: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitle: {
    color: colors.darkestGray,
    fontSize: sizes.large,
    paddingBottom: 8
  },
  headerClose: {
    paddingBottom: 8
  }
})
