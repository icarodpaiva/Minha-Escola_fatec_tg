import { useState } from "react"
import { View, Pressable, Text, StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"

import { Modal } from "./Modal"
import Calender from "../assets/svgs/calender.svg"

import { calenderLocale } from "../configs/calenderLocale"
import { theme } from "../configs/theme"
import { formatDate } from "../utils/formatDate"

import type { DateData } from "react-native-calendars"

calenderLocale()
const { colors, sizes } = theme

interface DatePickerProps {
  date: string
  setDate: (date: string) => void
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleDatePicker = () => {
    setIsVisible(prevState => !prevState)
  }

  const handleSelectDate = (date: DateData) => {
    setDate(date.dateString)
    handleToggleDatePicker()
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleToggleDatePicker} style={styles.dateContainer}>
        <Text style={styles.date}>{formatDate(date, true)}</Text>
        <Calender width={32} height={32} />
      </Pressable>

      <Modal
        visible={isVisible}
        onCancel={handleToggleDatePicker}
        title="Selecione o dia"
      >
        <Calendar
          onDayPress={handleSelectDate}
          markedDates={{ [date]: { selected: true } }}
          theme={{
            arrowColor: colors.main,
            monthTextColor: colors.darkestGray,
            textMonthFontSize: sizes.large,
            dayTextColor: colors.darkestGray,
            textDayFontSize: sizes.large,
            textInactiveColor: colors.gray,
            selectedDayTextColor: colors.white,
            selectedDayBackgroundColor: colors.main,
            todayTextColor: colors.darkestGray
          }}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.main,
    paddingVertical: 8
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  date: {
    color: colors.darkestGray,
    fontSize: sizes.medium,
    lineHeight: sizes.medium,
    textTransform: "capitalize"
  }
})
