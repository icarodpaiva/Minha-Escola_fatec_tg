import React, { useState } from "react"
import { View, TextInput, Button, Text } from "react-native"

import { useAuthContext } from "../contexts/AuthContext"
import { updateClassDetails } from "../api/updateClassDetails"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type ClassScreenProps = NativeStackScreenProps<AppStackParamList, "Class">

export const ClassScreen = ({ route }: ClassScreenProps) => {
  const { accessToken, isStaff } = useAuthContext()

  const { groupClass, refetch } = route.params

  const {
    id,
    name,
    description,
    subject,
    group_name,
    teacher,
    date,
    start_time,
    end_time,
    location: { building, floor, classroom }
  } = groupClass

  const [classTitle, setClassTitle] = useState(name ?? "")
  const [classDescription, setClassDescription] = useState(description ?? "")
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleEdit = () => {
    setIsEditing(prevState => !prevState)
  }

  const handleEdit = async () => {
    try {
      await updateClassDetails(
        id,
        { name: classTitle, description: classDescription },
        accessToken
      )
      refetch()
    } catch {
      setClassTitle(name ?? "")
      setClassDescription(description ?? "")
    } finally {
      setIsEditing(false)
    }
  }

  return (
    <View>
      {isStaff ? (
        <>
          {isEditing ? (
            <>
              <TextInput
                value={classTitle}
                onChangeText={setClassTitle}
                placeholder="Definir tema da aula"
                autoCapitalize="sentences"
              />
              <TextInput
                value={classDescription}
                onChangeText={setClassDescription}
                placeholder="Definir descrição da aula"
                autoCapitalize="sentences"
              />

              <Button title="Cancelar" onPress={handleToggleEdit} />
              <Button title="Confirmar alterações" onPress={handleEdit} />
            </>
          ) : (
            <>
              <Text>Tema da aula: {classTitle}</Text>
              <Text>Descrição: {classDescription}</Text>
              <Button
                title={"Editar detalhes de aula"}
                onPress={handleToggleEdit}
              />
            </>
          )}
        </>
      ) : (
        <>
          {name && <Text>Tema da aula: {name}</Text>}
          {description && <Text>Descrição: {description}</Text>}
        </>
      )}

      <Text>Matéria: {subject}</Text>

      {isStaff ? (
        <Text>Turma: {group_name}</Text>
      ) : (
        <Text>Professor: {teacher}</Text>
      )}

      <Text>Data: {date}</Text>
      <Text>Início as: {start_time}</Text>
      <Text>Término as: {end_time}</Text>
      <Text>Prédio: {building}</Text>
      <Text>Andar: {floor}</Text>
      <Text>Sala de aula: {classroom}</Text>
    </View>
  )
}
