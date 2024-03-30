import { useState, useEffect } from "react"
import messaging from "@react-native-firebase/messaging"

import { fetchData } from "../configs/api"

export const useSubscribeTopics = async (accessToken: string) => {
  const [topics, setTopics] = useState<string[]>([])

  useEffect(() => {
    const request = async () => {
      const { data } = await fetchData(accessToken).get<number[]>("/topics")

      setTopics(data.map(String))
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
