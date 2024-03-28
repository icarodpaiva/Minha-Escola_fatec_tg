import { useState, useEffect } from "react"

import { fetchData } from "../configs/api"

interface Student {
  id: number
  name: string
  email: string
  sr: string
  document: string
}

export const usePersonalData = (accessToken: string) => {
  const [loadingPersonalData, setLoadingPersonalData] = useState(false)
  const [personalData, setPersonalData] = useState<Student | null>(null)

  useEffect(() => {
    const request = async () => {
      try {
        setLoadingPersonalData(true)

        const { data } = await fetchData(accessToken).get("/profile")
        setPersonalData(data)
      } catch {
        setPersonalData(null)
      } finally {
        setLoadingPersonalData(false)
      }
    }

    request()
  }, [])

  return { loadingPersonalData, personalData }
}
