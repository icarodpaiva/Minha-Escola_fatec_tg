import { useState, useEffect, useCallback } from "react"

import { useAuthContext } from "../contexts/AuthContext"
import { fetchData } from "../configs/api"

export interface Class {
  id: number
  name: string | null
  description: string | null
  date: string
  start_time: string
  end_time: string
  subject: string
  group_name: string
  teacher: string | null
  location: Locations
}

interface Locations {
  building: string
  floor: number
  classroom: string
}

export const useClasses = (date: string = new Date().toISOString()) => {
  const { accessToken } = useAuthContext()

  const [loadingClasses, setLoadingClasses] = useState(false)
  const [classes, setClasses] = useState<Class[] | null>(null)
  const [refeches, setRefeches] = useState(0)

  const refetch = useCallback(() => {
    setRefeches(prevState => prevState + 1)
  }, [])

  useEffect(() => {
    const request = async () => {
      try {
        setLoadingClasses(true)

        const { data } = await fetchData(accessToken).get("/classes", {
          params: {
            date: date.replace(/T.*/, "") // Remove time
          }
        })
        setClasses(data)
      } catch {
        setClasses(null)
      } finally {
        setLoadingClasses(false)
      }
    }

    request()
  }, [date, refeches])

  return { loadingClasses, classes, refetch }
}
