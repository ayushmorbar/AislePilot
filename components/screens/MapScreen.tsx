"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Navigation } from "lucide-react"
import ARMap from "@/components/ARMap"
import { useNavigation } from "@/contexts/NavigationContext"

export default function MapScreen() {
  const { state, setScreen } = useNavigation()

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={() => setScreen("scanner")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Store Navigation</h2>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">AR Wayfinding</h3>
            <Badge variant="outline">LIVE</Badge>
          </div>

          <ARMap targetAisle={state.targetProduct?.aisle} targetProduct={state.targetProduct?.name} />
        </CardContent>
      </Card>

      {state.targetProduct && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Navigation Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{state.targetProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">Aisle {state.targetProduct.aisle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium">~25 feet</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
