import { Pressable, Text, StyleSheet } from "react-native"

import { useAuthContext } from "../contexts/AuthContext"
import { useNavigation } from "../hooks/useNavigation"

import type { Class as IClass } from "../hooks/useClasses"

interface ClassProps {
  groupClass: IClass
  refetch: () => void
}

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
      <Text>Matéria: {subject}</Text>

      {isStaff ? (
        <Text>Turma: {group_name}</Text>
      ) : (
        <Text>Professor: {teacher}</Text>
      )}

      <Text>Início as: {start_time}</Text>
      <Text>Prédio: {building}</Text>
      <Text>Andar: {floor}</Text>
      <Text>Sala de aula: {classroom}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
