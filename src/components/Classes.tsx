import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"

import { Loading } from "./Loading"
import { DatePicker } from "./DatePicker"
import { Class } from "./Class"

import { useClasses } from "../hooks/useClasses"

const initialDate = new Date().toISOString().replace(/T.*/, "")

export const Classes = () => {
  const [date, setDate] = useState(initialDate)

  const { loadingClasses, classes, refetch } = useClasses(date)

  if (loadingClasses) {
    return <Loading />
  }

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })

  return (
    <View style={styles.container}>
      <DatePicker date={date} setDate={setDate} />

      <ScrollView style={styles.classesContainer}>
        {!classes?.length ? (
          <Text>Sem aulas para o dia {formattedDate}</Text>
        ) : (
          <>
            {classes.map(groupClass => (
              <Class
                key={groupClass.id}
                groupClass={groupClass}
                refetch={refetch}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16
  },
  classesContainer: {
    flex: 1
  }
})
