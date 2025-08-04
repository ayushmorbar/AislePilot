"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Trash2, Plus, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"
import { useNavigation } from "@/contexts/NavigationContext"
import { loadScanHistory, clearScanHistory, type ScanHistoryItem } from "@/utils/localStorage"

export default function HistoryScreen() {
  const { state, dispatch } = useCart()
  const { setScreen } = useNavigation()
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([])

  useEffect(() => {
    setScanHistory(loadScanHistory())
  }, [])

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId })
  }

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const handleClearHistory = () => {
    clearScanHistory()
    setScanHistory([])
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Smart Cart & History</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {state.totalItems} items in cart
        </Badge>
      </div>

      {/* Cart Summary */}
      {state.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Current Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-green-600">${state.totalValue.toFixed(2)}</span>
            </div>

            <div className="space-y-3 mb-4">
              {state.items.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.stockLevel}
                      </Badge>
                      <span className="text-lg font-bold text-green-600">${item.product.price}</span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                Proceed to Checkout
              </Button>
              <Button variant="outline" onClick={handleClearCart} className="bg-transparent">
                Clear Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Scan History
            </CardTitle>
            {scanHistory.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearHistory}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Clear History
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {scanHistory.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No scan history yet</p>
              <Button onClick={() => setScreen("scanner")} variant="outline" className="bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {scanHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(item.scannedAt)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${item.lowStock ? "border-red-200 text-red-700 bg-red-50" : ""}`}
                      >
                        {item.lowStock && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {item.stockLevel}
                      </Badge>
                      <span className="text-sm font-bold text-green-600">${item.product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Empty State for Cart */}
      {state.items.length === 0 && scanHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Ready to start shopping?</h3>
          <p className="text-gray-600 mb-6 text-center">
            Use the AI scanner to discover products and build your smart cart
          </p>
          <Button onClick={() => setScreen("scanner")} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Start Scanning
          </Button>
        </div>
      )}
    </div>
  )
}
