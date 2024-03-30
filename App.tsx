import React from "react"

import { AuthContextProvider, initialValue } from "./src/contexts/AuthContext"
import { RootStack } from "./src/navigation"

export default function App() {
  return (
    <AuthContextProvider {...initialValue}>
      <RootStack />
    </AuthContextProvider>
  )
}
