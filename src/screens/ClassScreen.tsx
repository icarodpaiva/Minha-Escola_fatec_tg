import React, { useState } from "react"
import { ScrollView, TextInput, Button, StyleSheet } from "react-native"

import { InfoText } from "../components/InfoText"

import { theme } from "../configs/theme"
import { useAuthContext } from "../contexts/AuthContext"
import { updateClassDetails } from "../api/updateClassDetails"
import { formatDate } from "../utils/formatDate"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type ClassScreenProps = NativeStackScreenProps<AppStackParamList, "Class">

const { colors, sizes } = theme

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
    <ScrollView style={styles.container}>
      {!isEditing ? (
        <>
          <InfoText label="Tema da aula" value={name} />
          <InfoText label="Descrição" value={description} />
        </>
      ) : (
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
      )}

      {isStaff && (
        <Button title="Editar detalhes de aula" onPress={handleToggleEdit} />
      )}

      <InfoText label="Matéria" value={subject} />
      <InfoText
        label={isStaff ? "Turma:" : "Professor"}
        value={isStaff ? group_name : teacher}
        capitalize
      />
      <InfoText label="Data" value={formatDate(date, true)} capitalize />
      <InfoText label="Início as" value={start_time} />
      <InfoText label="Término as" value={end_time} />
      <InfoText label="Sala de aula" value={classroom} />
      <InfoText
        label="Andar"
        value={floor > 0 ? `${floor}º Andar` : "Térreo"}
      />
      <InfoText label="Prédio" value={building} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  info: {
    marginTop: 8,
    color: colors.darkGray,
    fontSize: sizes.medium
  },
  infoValue: {
    color: colors.darkestGray,
    fontSize: sizes.large
  },
  capitalize: {
    textTransform: "capitalize"
  }
})
