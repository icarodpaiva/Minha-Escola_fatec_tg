import { Text, View } from "react-native"

import type { Notification as INotification } from "../../hooks/useNotifications"

interface NotificationProps {
  notification: INotification
}

export const Notification = ({ notification }: NotificationProps) => {
  const { id, subject, author, created_at, title, message } = notification

  return (
    <View key={id}>
      <Text>Matéria: {subject}</Text>
      <Text>Enviado por: {author}</Text>
      <Text>Data: {created_at}</Text>
      <Text>Título: {title}</Text>
      <Text>Mensagem: {message}</Text>
    </View>
  )
}
