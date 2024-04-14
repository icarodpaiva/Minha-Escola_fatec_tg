import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"

import { Loading } from "./Loading"
import { DatePicker } from "./DatePicker"
import { Class } from "./Class"

import { useClasses } from "../hooks/useClasses"
import { formatDate } from "../utils/formatDate"

const initialDate = new Date().toISOString().replace(/T.*/, "")

export const Classes = () => {
  const [date, setDate] = useState(initialDate)

  const { loadingClasses, classes, refetch } = useClasses(date)

  return (
    <View style={styles.container}>
      <DatePicker date={date} setDate={setDate} />

      {loadingClasses && <Loading />}

      {!loadingClasses && classes && classes.length > 0 && (
        <ScrollView style={styles.classesContainer}>
          {classes.map(groupClass => (
            <Class
              key={groupClass.id}
              groupClass={groupClass}
              refetch={refetch}
            />
          ))}
        </ScrollView>
      )}
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
