import React, { useState } from "react"
import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native"

import { Modal } from "../components/Modal"
import { InfoText } from "../components/InfoText"
import { Button } from "../components/Button"

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

  const handleCancelEdit = () => {
    setClassTitle(name ?? "")
    setClassDescription(description ?? "")
    setIsEditing(false)
  }

  const handleEdit = async () => {
    try {
      setIsEditing(false)

      await updateClassDetails(
        id,
        { name: classTitle, description: classDescription },
        accessToken
      )
      refetch()
    } catch {
      setClassTitle(name ?? "")
      setClassDescription(description ?? "")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.infosContainer}>
        <InfoText label="Tema da aula" value={classTitle} />
        <InfoText label="Descrição" value={classDescription} />
        <InfoText label="Matéria" value={subject} />
        <InfoText
          label={isStaff ? "Turma" : "Professor"}
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

      {isStaff && (
        <Button text="Editar detalhes de aula" onPress={handleToggleEdit} />
      )}

      <Modal
        visible={Boolean(isStaff && isEditing)}
        onCancel={handleCancelEdit}
        title="Editar detalhes de aula"
      >
        <Text style={styles.inputLabel}>Tema da aula:</Text>
        <TextInput
          value={classTitle}
          onChangeText={setClassTitle}
          placeholder="Tema da aula"
          placeholderTextColor={colors.darkGray}
          autoCapitalize="sentences"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Descrição:</Text>
        <TextInput
          value={classDescription}
          onChangeText={setClassDescription}
          placeholder="Descrição"
          placeholderTextColor={colors.darkGray}
          multiline={true}
          numberOfLines={3}
          autoCapitalize="sentences"
          style={styles.input}
        />

        <View style={styles.editButtonsContainer}>
          <Button text="Cancelar" onPress={handleCancelEdit} />
          <Button text="Confirmar" onPress={handleEdit} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  infosContainer: {
    flex: 1,
    marginBottom: 16
  },
  inputLabel: {
    marginBottom: 2,
    fontSize: sizes.medium,
    color: colors.darkestGray
  },
  input: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.white,
    color: colors.darkestGray,
    fontSize: sizes.medium
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})
