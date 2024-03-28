import { useEffect } from "react"
import messaging from "@react-native-firebase/messaging"

import { fetchData } from "../configs/api"

export const useSubscribeTopics = async (accessToken: string) => {
  useEffect(() => {
    const request = async () => {
      const { data } = await fetchData(accessToken).get<number[]>("/topics")

      const topics = data.map(String)

      topics.forEach(topic => {
        messaging().subscribeToTopic(topic)
      })

      return () => {
        topics.forEach(topic => {
          messaging().unsubscribeFromTopic(topic)
        })
      }
    }

    const unsubscribe = request()

    return () => {
      unsubscribe
    }
  }, [])
}
