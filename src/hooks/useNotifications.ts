import { useState, useEffect, useCallback } from "react"

import { useAuthContext } from "../contexts/AuthContext"
import { fetchData } from "../configs/api"

export interface Notification {
  id: number
  created_at: string
  title: string
  message: string
  group_name: string
  subject: string
  author: string
}

export const useNotifications = () => {
  const { accessToken } = useAuthContext()

  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  )
  const [refeches, setRefeches] = useState(0)

  const refetch = useCallback(() => {
    setRefeches(prevState => prevState + 1)
  }, [])

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
  }, [refeches])

  return { loadingNotifications, notifications, refetch }
}
