"use client"

import { Camera, Map, ShoppingCart, TrendingUp } from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import type { Screen } from "@/contexts/NavigationContext"
import { useCart } from "@/contexts/CartContext"
import { Badge } from "@/components/ui/badge"


type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function BottomNav() {
  const { state, setScreen } = useNavigation()
  const { state: cartState } = useCart()

  const navItems: NavItem[] = [
    { id: "scanner", label: "Scanner", icon: Camera },
    { id: "map", label: "Map", icon: Map },
    { id: "history", label: "Cart", icon: ShoppingCart },
    { id: "analytics", label: "Stats", icon: TrendingUp },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = state.currentScreen === item.id

          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as Screen)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-800"
              }`}
              aria-label={`Navigate to ${item.label} screen`}
              role="tab"
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.id === "history" && cartState.totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    aria-label={`${cartState.totalItems} items in cart`}
                  >
                    {cartState.totalItems}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>

  )
}

