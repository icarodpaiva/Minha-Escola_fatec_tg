import React from "react"

import { Class } from "../components/Class"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { AppStackParamList } from "../navigation/AppStack"

type ClassScreenProps = NativeStackScreenProps<AppStackParamList, "Class">

export const ClassScreen = ({ route }: ClassScreenProps) => {
  const { groupClass } = route.params

  return <Class groupClass={groupClass} />
}
