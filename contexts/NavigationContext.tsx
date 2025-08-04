"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Screen = "scanner" | "map" | "history" | "analytics"

interface NavigationState {
  currentScreen: Screen
  targetProduct?: {
    id: string
    name: string
    aisle: string
  }
}

const NavigationContext = createContext<{
  state: NavigationState
  setScreen: (screen: Screen) => void
  setTarget: (target: NavigationState["targetProduct"]) => void
} | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavigationState>({
    currentScreen: "scanner",
  })

  const setScreen = (screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }

  const setTarget = (target: NavigationState["targetProduct"]) => {
    setState((prev) => ({ ...prev, targetProduct: target }))
  }

  return <NavigationContext.Provider value={{ state, setScreen, setTarget }}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
