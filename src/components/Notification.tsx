import { Text, View, StyleSheet } from "react-native"

import type { Notification as INotification } from "../hooks/useNotifications"

interface NotificationProps {
  notification: INotification
}

export const Notification = ({ notification }: NotificationProps) => {
  const { subject, author, created_at, title, message } = notification

  return (
    <View style={styles.container}>
      <Text>Matéria: {subject}</Text>
      <Text>Enviado por: {author}</Text>
      <Text>Data: {created_at}</Text>
      <Text>Título: {title}</Text>
      <Text>Mensagem: {message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
