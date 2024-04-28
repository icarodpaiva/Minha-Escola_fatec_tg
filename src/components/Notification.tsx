import { View, StyleSheet } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

import { InfoText, styles as infoTextStyles } from "./InfoText"

import { theme } from "../configs/theme"
import { useAuthContext } from "../contexts/AuthContext"
import { formatDate } from "../utils/formatDate"
import { fixDate } from "../utils/fixDate"

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
        value={formatDate(fixDate(created_at), true, true)}
        capitalize
      />
      <InfoText label="Título" value={title} />
      <InfoText label="Mensagem" value={message} />
    </View>
  )
}

export const NotificationSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={theme.colors.gray}>
      <SkeletonPlaceholder.Item style={styles.container}>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            flexDirection="row"
            marginTop={infoTextStyles.info.marginTop}
          >
            <SkeletonPlaceholder.Item
              width={60}
              height={infoTextStyles.info.lineHeight}
              marginRight={10}
            />

            <SkeletonPlaceholder.Item
              flex={1}
              height={infoTextStyles.infoValue.lineHeight}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
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
