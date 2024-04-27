import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"

import { DatePicker } from "./DatePicker"
import { Class, ClassSkeleton } from "./Class"

import { useClasses } from "../hooks/useClasses"

const currentDate = new Date()
const currentHours = currentDate.getHours()
currentDate.setHours(currentHours < 3 ? currentHours - 12 : currentHours)

const initialDate = currentDate.toISOString().replace(/T.*/, "") // Remove time

export const Classes = () => {
  const [date, setDate] = useState(initialDate)

  const { loadingClasses, classes, refetch } = useClasses(date)

  return (
    <View style={styles.container}>
      <DatePicker date={date} setDate={setDate} />

      <ScrollView style={styles.classesContainer}>
        {loadingClasses
          ? Array.from({ length: 3 }).map((_, index) => (
              <ClassSkeleton key={index} />
            ))
          : classes?.map(groupClass => (
              <Class
                key={groupClass.id}
                groupClass={groupClass}
                refetch={refetch}
              />
            ))}
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
