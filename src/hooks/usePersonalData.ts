import { useState, useEffect } from "react"

import { fetchData } from "../configs/api"
import { supabase } from "../configs/supabase"
import { useAuthContext } from "../contexts/AuthContext"
import { Toast, ALERT_TYPE } from "react-native-alert-notification"

export interface PersonalData {
  id: number
  name: string
  email: string
  registration?: string
  document: string

  // Only students has the data below
  course?: string
  semester?: number
}

export const usePersonalData = () => {
  const { accessToken } = useAuthContext()

  const [loadingPersonalData, setLoadingPersonalData] = useState(false)
  const [personalData, setPersonalData] = useState<PersonalData | null>(null)

  useEffect(() => {
    const request = async () => {
      try {
        setLoadingPersonalData(true)

        const { data } = await fetchData(accessToken).get("/profile")
        setPersonalData(data)
      } catch {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: "Falha ao carregar dados do usuário, tente novamente",
          autoClose: true
        })

        await supabase.auth.signOut()
      } finally {
        setLoadingPersonalData(false)
      }
    }

    request()
  }, [])

  return { loadingPersonalData, personalData }
}
