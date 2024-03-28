import { useState, useEffect } from "react"

import { fetchData } from "../configs/api"

export interface Notification {
  id: number
  created_at: string
  title: string
  message: string
  subject: string
  author: string
}

export const useNotifications = (accessToken: string) => {
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  )

  useEffect(() => {
    const request = async () => {
      try {
        setLoadingNotifications(true)

        const { data } = await fetchData(accessToken).get("/notifications")
        setNotifications(data)
      } catch {
        setNotifications(null)
      } finally {
        setLoadingNotifications(false)
      }
    }

    request()
  }, [])

  return { loadingNotifications, notifications }
}
