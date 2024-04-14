import { View, StyleSheet } from "react-native"

import { InfoText } from "./InfoText"

import { theme } from "../configs/theme"
import { useAuthContext } from "../contexts/AuthContext"
import { formatDate } from "../utils/formatDate"

import type { Notification as INotification } from "../hooks/useNotifications"

interface NotificationProps {
  notification: INotification
}

export const Notification = ({ notification }: NotificationProps) => {
  const { isStaff } = useAuthContext()

  const { subject, group_name, author, created_at, title, message } =
    notification

  return (
    <View style={styles.container}>
      <InfoText label="Matéria" value={subject} />
      <InfoText
        label={isStaff ? "Turma" : "Enviado por"}
        value={isStaff ? group_name : author}
        capitalize
      />
      <InfoText
        label="Data"
        value={formatDate(created_at, true, true)}
        capitalize
      />
      <InfoText label="Título" value={title} />
      <InfoText label="Mensagem" value={message} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.main,
    marginVertical: 1,
    paddingVertical: 8
  }
})
