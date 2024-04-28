import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput
} from "react-native"
import { Dialog, ALERT_TYPE } from "react-native-alert-notification"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

import { Loading } from "../components/Loading"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"

import { theme } from "../configs/theme"
import { useAuthContext } from "../contexts/AuthContext"
import { useGroups } from "../hooks/useGroups"
import { useNavigation } from "../hooks/useNavigation"
import { createNotification } from "../api/createNotification"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

const { colors, sizes } = theme

type CreateNotificationScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "CreateNotification"
>

export const CreateNotificationScreen = ({
  route
}: CreateNotificationScreenProps) => {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<number[]>([])
  const [isChoosingGroups, setIsChoosingGroups] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const { accessToken } = useAuthContext()
  const { loadingGroups, groups } = useGroups()
  const { goBack } = useNavigation()

  const handleToggleChooseGroups = () => {
    setIsChoosingGroups(prevState => !prevState)
  }

  const handleCancel = () => {
    setSelectedGroups([])
    setIsChoosingGroups(false)
  }

  const handleSelectGroup = (id: number) => {
    setSelectedGroups(prevSelectedGroups => {
      if (prevSelectedGroups.includes(id)) {
        return prevSelectedGroups.filter(groupId => groupId !== id)
      } else {
        return [...prevSelectedGroups, id]
      }
    })
  }

  const handleSend = async () => {
    try {
      if (selectedGroups.length === 0) {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Selecione as turmas",
          button: "Continuar"
        })
      }

      setIsSending(true)

      await createNotification(
        { topics: selectedGroups, title, message },
        accessToken
      )
      route.params.refetch()

      goBack()
    } catch {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Falha no envio, tente novamente",
        button: "Continuar"
      })
    } finally {
      setIsSending(false)
    }
  }

  if (isSending) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.inputLabel}>Título:</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
          placeholderTextColor={colors.darkGray}
          autoCapitalize="sentences"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Mensagem:</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Mensagem"
          placeholderTextColor={colors.darkGray}
          multiline={true}
          numberOfLines={3}
          autoCapitalize="sentences"
          style={styles.input}
        />

        <Button text="Selecionar turmas" onPress={handleToggleChooseGroups} />

        <Modal
          visible={isChoosingGroups}
          onCancel={handleToggleChooseGroups}
          title="Selecionar turmas"
        >
          <ScrollView>
            {loadingGroups
              ? Array.from({ length: 5 }).map((_, index) => (
                  <GroupSkeleton key={index} />
                ))
              : groups?.map(({ id, name, subject }) => (
                  <Pressable
                    key={id}
                    onPress={() => handleSelectGroup(id)}
                    style={[
                      styles.group,
                      selectedGroups.includes(id) && styles.selectedGroup
                    ]}
                  >
                    <Text
                      style={[
                        styles.groupText,
                        selectedGroups.includes(id) && styles.selectedGroupText
                      ]}
                    >
                      {subject}
                    </Text>
                    <Text
                      style={[
                        styles.groupText,
                        selectedGroups.includes(id) && styles.selectedGroupText
                      ]}
                    >
                      {name}
                    </Text>
                  </Pressable>
                ))}
          </ScrollView>

          <View style={styles.editButtonsContainer}>
            <Button text="Cancelar" onPress={handleCancel} />
            <Button text="Confirmar" onPress={handleToggleChooseGroups} />
          </View>
        </Modal>
      </View>

      <Button text="Enviar notificação" onPress={handleSend} />
    </View>
  )
}

const GroupSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={theme.colors.gray}>
      <SkeletonPlaceholder.Item style={styles.group}>
        <SkeletonPlaceholder.Item
          height={styles.groupText.lineHeight}
          marginBottom={styles.groupText.marginBottom}
        />

        <SkeletonPlaceholder.Item
          height={styles.groupText.lineHeight}
          marginBottom={styles.groupText.marginBottom}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between"
  },
  inputLabel: {
    marginBottom: 2,
    fontSize: sizes.medium,
    lineHeight: sizes.medium,
    color: colors.darkestGray
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.white,
    color: colors.darkestGray,
    fontSize: sizes.medium,
    lineHeight: sizes.medium
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16
  },
  group: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginTop: 8,
    padding: 8,
    paddingBottom: 0
  },
  selectedGroup: {
    borderColor: colors.main,
    backgroundColor: colors.main
  },
  groupText: {
    marginBottom: 8,
    color: colors.darkestGray,
    fontSize: sizes.medium,
    lineHeight: sizes.medium
  },
  selectedGroupText: {
    color: colors.white
  }
})
