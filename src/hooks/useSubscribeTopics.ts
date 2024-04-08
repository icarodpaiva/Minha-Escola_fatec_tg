import { useState, useEffect } from "react"
import messaging from "@react-native-firebase/messaging"

import { useAuthContext } from "../contexts/AuthContext"
import { getGroups } from "../api/getGroups"

export const useSubscribeTopics = async () => {
  const { accessToken, isStaff } = useAuthContext()

  const [topics, setTopics] = useState<string[]>([])

  useEffect(() => {
    // Staff doesn't subscribe to topics
    if (isStaff) {
      return
    }

    const request = async () => {
      const data = await getGroups(accessToken)

      setTopics(data.map(({ id }) => String(id)))
    }

    request()
  }, [])

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
