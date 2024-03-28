import { ScrollView, StyleSheet, Text, View } from "react-native"

import { Loading } from "../Loading"
import { Class } from "./Class"

import { useAuthContext } from "../../contexts/AuthContext"
import { useClasses } from "../../hooks/useClasses"

export const Classes = () => {
  const accessToken = useAuthContext().accessToken as string
  const { loadingClasses, classes } = useClasses(accessToken, "2024-03-09") // TO-DO: Use a date picker

  if (loadingClasses) {
    return <Loading />
  }

  if (!classes?.length) {
    return (
      <View style={styles.container}>
        <Text>Sem aulas no dia</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      {classes.map(groupClass => (
        <Class key={groupClass.id} groupClass={groupClass} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
