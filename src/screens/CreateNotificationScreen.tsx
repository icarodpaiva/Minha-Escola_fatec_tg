import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  TextInput
} from "react-native"

import { Loading } from "../components/Loading"

import { useAuthContext } from "../contexts/AuthContext"
import { useGroups } from "../hooks/useGroups"
import { useNavigation } from "../hooks/useNavigation"
import { createNotification } from "../api/createNotification"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type CreateNotificationScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "CreateNotification"
>

export const CreateNotificationScreen = ({
  route
}: CreateNotificationScreenProps) => {
  const [selectedGroups, setSelectedGroups] = useState<number[]>([])
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const { accessToken } = useAuthContext()
  const { loadingGroups, groups } = useGroups()
  const { goBack } = useNavigation()

  if (loadingGroups) {
    return <Loading />
  }

  if (!groups?.length) {
    return (
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>
          Não há turmas a serem selecionadas, contate o administrador.
        </Text>
      </View>
    )
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
      await createNotification(
        { topics: selectedGroups, title, message },
        accessToken
      )

      route.params.refetch()
      goBack()
    } catch {
      setSelectedGroups([])
      setTitle("")
      setMessage("")
    }
  }

  return (
    <View>
      <ScrollView>
        <Text>Turmas:</Text>

        {groups.map(({ id, name, subject }) => (
          <Pressable
            key={id}
            onPress={() => handleSelectGroup(id)}
            style={
              selectedGroups.includes(id) ? styles.selectedGroup : undefined
            }
          >
            <Text>{subject}</Text>
            <Text>{name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text>Título:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        autoCapitalize="sentences"
      />

      <Text>Mensagem:</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Mensagem"
        autoCapitalize="sentences"
      />

      <Button title="Enviar notificação" onPress={handleSend} />
    </View>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  },
  selectedGroup: {
    borderWidth: 1,
    borderColor: "red"
  }
})
