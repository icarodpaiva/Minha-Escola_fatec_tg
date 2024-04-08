import { useState, useEffect } from "react"

import { useAuthContext } from "../contexts/AuthContext"
import { getGroups } from "../api/getGroups"

import type { Group } from "../api/getGroups"

export const useGroups = () => {
  const { accessToken } = useAuthContext()

  const [loadingGroups, setLoadingGroups] = useState(false)
  const [groups, setGroups] = useState<Group[] | null>(null)

  useEffect(() => {
    const request = async () => {
      try {
        const data = await getGroups(accessToken)

        setGroups(data)
      } catch {
        setGroups(null)
      } finally {
        setLoadingGroups(false)
      }
    }

    request()
  }, [])

  return { loadingGroups, groups }
}
