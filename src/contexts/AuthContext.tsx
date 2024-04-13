import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from "react"
import { AppState } from "react-native"

import { supabase } from "../configs/supabase"

import type { PropsWithChildren } from "react"

interface AuthContextProps {
  accessToken: string | undefined
  isStaff: boolean | undefined
  loading: boolean
}

export const initialValue: AuthContextProps = {
  accessToken: undefined,
  isStaff: undefined,
  loading: true
}

const AuthContext = createContext<AuthContextProps>(initialValue)

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", state => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export const AuthContextProvider = ({
  children
}: PropsWithChildren<AuthContextProps>) => {
  const [accessToken, setAccessToken] = useState<string>()
  const [isStaff, setIsStaff] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token)
      setIsStaff(session?.user.user_metadata?.is_staff)
      setLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({ accessToken, isStaff, loading }),
    [accessToken, isStaff, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider")
  }

  return context
}
