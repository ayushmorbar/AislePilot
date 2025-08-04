"use client"

import { useState } from "react"
import { CartProvider } from "@/contexts/CartContext"
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext"
import ScannerScreen from "@/components/screens/ScannerScreen"
import MapScreen from "@/components/screens/MapScreen"
import HistoryScreen from "@/components/screens/HistoryScreen"
import BottomNav from "@/components/BottomNav"
import OnboardingScreen from "@/components/screens/OnboardingScreen"
import AnalyticsScreen from "@/components/screens/AnalyticsScreen"
import ErrorBoundary from "@/components/ErrorBoundary"
import SocialShare from "@/components/SocialShare"

function AppContent() {
  const { state } = useNavigation()
  const [showOnboarding, setShowOnboarding] = useState(true)

  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
  }

  const renderScreen = () => {
    switch (state.currentScreen) {
      case "scanner":
        return (
          <div>
            <ScannerScreen />
            <div className="p-4">
              <SocialShare />
            </div>
          </div>
        )
      case "map":
        return <MapScreen />
      case "history":
        return <HistoryScreen />
      case "analytics":
        return <AnalyticsScreen />
      default:
        return <ScannerScreen />
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-md mx-auto bg-white min-h-screen">
          {/* Header */}
          

          {renderScreen()}
          <BottomNav />
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </CartProvider>
  )
}
