import { useState } from "react"
import { View, Button, Text, StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"

import { calenderLocale } from "../configs/calenderLocale"

import type { DateData } from "react-native-calendars"

calenderLocale()

interface DatePickerProps {
  date: string
  setDate: (date: string) => void
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const showDatePicker = () => {
    setIsVisible(true)
  }

  const handleSelectDate = (date: DateData) => {
    setDate(date.dateString)
    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      <Button onPress={showDatePicker} title="Escolher dia" />
      <Text>Dia: {date.toLocaleString()}</Text>

      {isVisible && <Calendar onDayPress={handleSelectDate} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})
