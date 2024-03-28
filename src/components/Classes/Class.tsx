import { Text, View, StyleSheet } from "react-native"

import type { Class as IClass } from "../../hooks/useClasses"

interface ClassProps {
  groupClass: IClass
}

export const Class = ({ groupClass }: ClassProps) => {
  const {
    subject,
    teacher,
    date,
    start_time,
    end_time,
    location: { building, floor, classroom }
  } = groupClass

  return (
    <View style={styles.container}>
      <Text>Matéria: {subject}</Text>
      <Text>Professor: {teacher}</Text>
      <Text>Data: {date}</Text>
      <Text>Início as: {start_time}</Text>
      <Text>Término as: {end_time}</Text>
      <Text>Prédio: {building}</Text>
      <Text>Andar: {floor}</Text>
      <Text>Sala de aula: {classroom}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
