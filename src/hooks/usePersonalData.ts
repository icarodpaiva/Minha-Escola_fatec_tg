import { useState, useEffect } from "react"

import { fetchData } from "../configs/api"

export interface PersonalData {
  id: number
  name: string
  email: string
  sr: string
  document: string
  course: string
  semester: number
}

export const usePersonalData = (accessToken: string) => {
  const [loadingPersonalData, setLoadingPersonalData] = useState(false)
  const [personalData, setPersonalData] = useState<PersonalData | null>(null)

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
