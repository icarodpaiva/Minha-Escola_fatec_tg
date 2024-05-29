import { useState, useEffect } from "react"
import messaging from "@react-native-firebase/messaging"

import { useAuthContext } from "../contexts/AuthContext"
import { getGroups } from "../api/getGroups"

export const useSubscribeTopics = () => {
  const { accessToken, isStaff } = useAuthContext()

  const [topics, setTopics] = useState<string[]>([])

  useEffect(() => {
    // Staff doesn't subscribe to topics
    if (isStaff === undefined || isStaff) {
      return
    }

    const request = async () => {
      const data = await getGroups(accessToken)

      const ids = data.map(({ id }) => String(id))

      setTopics([...ids, "3"]) // 3 is the topic for admin channel
    }

    request()
  }, [isStaff])

  useEffect(() => {
    topics.forEach(topic => {
      messaging().subscribeToTopic(topic)
    })

    return () => {
      topics.forEach(topic => {
        messaging().unsubscribeFromTopic(topic)
      })
    }
  }, [topics])
}
