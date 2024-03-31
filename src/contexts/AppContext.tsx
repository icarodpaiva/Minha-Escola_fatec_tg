import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from "react"
import { AppState } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import type { PropsWithChildren } from "react"

interface AppContextProps {
  hasNewNotification: boolean
  setHasNewNotification: (hasNewNotification: boolean) => void
}

export const initialValue: AppContextProps = {
  hasNewNotification: false,
  setHasNewNotification: () => {}
}

const AppContext = createContext<AppContextProps>(initialValue)

export const AppContextProvider = ({
  children
}: PropsWithChildren<AppContextProps>) => {
  const [hasNewNotification, setHasNewNotification] = useState(false)

  useEffect(() => {
    const verifyNewNotification = async () => {
      const value = await AsyncStorage.getItem("hasNewNotification")
      setHasNewNotification(value === "true")
    }

    // Used to verify if the app was opened from a quit state
    verifyNewNotification()

    // Used to verify if the app was opened from a background state
    AppState.addEventListener("change", state => {
      if (state === "active") {
        verifyNewNotification()
      }
    })
  }, [])

  const value = useMemo(
    () => ({ hasNewNotification, setHasNewNotification }),
    [hasNewNotification]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }

  return context
}
