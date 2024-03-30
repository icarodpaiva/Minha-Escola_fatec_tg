import { Pressable, Text, StyleSheet } from "react-native"

import { useNavigation } from "../hooks/useNavigation"

import type { Class as IClass } from "../hooks/useClasses"

interface ClassProps {
  groupClass: IClass
}

export const Class = ({ groupClass }: ClassProps) => {
  const { navigate } = useNavigation()

  const {
    subject,
    teacher,
    date,
    start_time,
    end_time,
    location: { building, floor, classroom }
  } = groupClass

  const handleClass = () => {
    navigate("App", { screen: "Class", params: { groupClass } })
  }

  return (
    <Pressable onPress={handleClass} style={styles.container}>
      <Text>Matéria: {subject}</Text>
      <Text>Professor: {teacher}</Text>
      <Text>Data: {date}</Text>
      <Text>Início as: {start_time}</Text>
      <Text>Término as: {end_time}</Text>
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
