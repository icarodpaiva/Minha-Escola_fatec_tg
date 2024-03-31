import React from "react"
import { Text, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type ClassScreenProps = NativeStackScreenProps<AppStackParamList, "Class">

export const ClassScreen = ({ route }: ClassScreenProps) => {
  const {
    subject,
    teacher,
    name,
    date,
    start_time,
    end_time,
    location: { building, floor, classroom }
  } = route.params.groupClass

  return (
    <View>
      <Text>Matéria: {subject}</Text>
      <Text>Professor: {teacher}</Text>
      <Text>Título da aula: {name}</Text>
      <Text>Data: {date}</Text>
      <Text>Início as: {start_time}</Text>
      <Text>Término as: {end_time}</Text>
      <Text>Prédio: {building}</Text>
      <Text>Andar: {floor}</Text>
      <Text>Sala de aula: {classroom}</Text>
    </View>
  )
}
