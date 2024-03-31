import { useState, useEffect } from "react"

import { fetchData } from "../configs/api"

export interface Class {
  id: number
  subject: string
  teacher: string | null
  name: string
  date: string
  start_time: string
  end_time: string
  location: {
    building: string
    floor: number
    classroom: string
  }
}

export const useClasses = (
  accessToken: string,
  date: string = new Date().toISOString()
) => {
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [classes, setClasses] = useState<Class[] | null>(null)

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
  }, [date])

  return { loadingClasses, classes }
}
