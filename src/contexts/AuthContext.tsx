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
  loading: boolean
  accessToken: string | undefined
  setAccessToken: (accessToken: string) => void
}

export const initialValue: AuthContextProps = {
  loading: true,
  accessToken: undefined,
  setAccessToken: () => {}
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
  const [loading, setLoading] = useState<boolean>(true)
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token)
      setLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({ loading, accessToken, setAccessToken }),
    [loading, accessToken]
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
