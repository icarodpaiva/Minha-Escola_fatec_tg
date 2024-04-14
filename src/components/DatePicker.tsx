import { useState } from "react"
import { View, Pressable, Text, Modal, StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"

import Calender from "../assets/svgs/calender.svg"
import Close from "../assets/svgs/close.svg"

import { calenderLocale } from "../configs/calenderLocale"
import { theme } from "../configs/theme"

import type { DateData } from "react-native-calendars"

calenderLocale()
const { colors, sizes } = theme

interface DatePickerProps {
  date: string
  setDate: (date: string) => void
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })

  const showDatePicker = () => {
    setIsVisible(true)
  }

  const handleSelectDate = (date: DateData) => {
    setDate(date.dateString)
    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={showDatePicker} style={styles.dateContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Calender width={32} height={32} />
      </Pressable>

      <Modal visible={isVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Selecione a Data</Text>
              <Pressable
                onPress={() => setIsVisible(false)}
                style={styles.modalHeaderClose}
              >
                <Close width={24} height={24} />
              </Pressable>
            </View>

            <Calendar
              onDayPress={handleSelectDate}
              markedDates={{ [date]: { selected: true } }}
              theme={{
                arrowColor: colors.main,
                monthTextColor: colors.darkestGray,
                textMonthFontSize: sizes.small,
                weekVerticalMargin: 0,
                dayTextColor: colors.darkestGray,
                textDayFontSize: sizes.small,
                textInactiveColor: colors.gray,
                selectedDayTextColor: colors.white,
                selectedDayBackgroundColor: colors.main,
                todayTextColor: colors.darkestGray
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  date: {
    color: colors.darkestGray,
    fontSize: sizes.medium,
    textTransform: "capitalize"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.overlay
  },
  modalContent: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalHeaderTitle: {
    color: colors.darkestGray,
    fontSize: sizes.small,
    paddingBottom: 8
  },
  modalHeaderClose: {
    paddingBottom: 8
  }
})
