"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Scan, ShoppingCart, MapPin } from "lucide-react"
import Camera from "@/components/Camera"
import { scanProduct, type ScanResult } from "@/utils/vision"
import { predictStock, getStockBadge, getStockColor } from "@/utils/forecast"
import { getRecommendations } from "@/utils/semanticSearch"
import { useCart } from "@/contexts/CartContext"
import { useNavigation } from "@/contexts/NavigationContext"
import { addToScanHistory } from "@/utils/localStorage"

export default function ScannerScreen() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const { dispatch } = useCart()
  const { setScreen, setTarget } = useNavigation()

  const handleScan = async () => {
    setIsScanning(true)
    setScanResult(null)

    try {
      const result = await scanProduct()
      setScanResult(result)

      // Add to scan history
      const stockLevel = predictStock(result.product)
      const stockBadge = getStockBadge(stockLevel, result.product.stock)

      addToScanHistory({
        product: result.product,
        scannedAt: new Date(),
        stockLevel: stockBadge,
        lowStock: stockLevel === "low",
      })
    } catch (error) {
      console.error("Scan failed:", error)
    } finally {
      setIsScanning(false)
    }
  }

  const handleAddToCart = () => {
    if (scanResult) {
      const stockLevel = predictStock(scanResult.product)
      const stockBadge = getStockBadge(stockLevel, scanResult.product.stock)

      dispatch({
        type: "ADD_ITEM",
        payload: {
          product: scanResult.product,
          stockLevel: stockBadge,
        },
      })

      setScanResult(null)
    }
  }

  const handleNavigate = () => {
    if (scanResult) {
      setTarget({
        id: scanResult.product.id,
        name: scanResult.product.name,
        aisle: scanResult.product.aisle,
      })
      setScreen("map")
    }
  }

  const handleRecommendationClick = (productId: string) => {
    // Simulate scanning the recommended product
    const recommendations = getRecommendations(scanResult?.product.id || "")
    const recommendedProduct = recommendations.find((p) => p.id === productId)

    if (recommendedProduct) {
      setScanResult({
        product: recommendedProduct,
        confidence: 0.95,
        boundingBox: undefined,
      })
    }
  }

  const stockLevel = scanResult ? predictStock(scanResult.product) : null
  const stockBadge = scanResult ? getStockBadge(stockLevel!, scanResult.product.stock) : ""
  const stockColor = stockLevel ? getStockColor(stockLevel) : ""
  const recommendations = scanResult ? getRecommendations(scanResult.product.id) : []

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      {/* Camera Section */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-2">AI Product Scanner</h2>
            <p className="text-gray-600 text-sm">Point your camera at any product to get started</p>
          </div>

          <div className="relative mb-4">
            <Camera className="w-full h-64" showOverlay={!scanResult} />

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="font-medium">Analyzing product...</p>
                  <p className="text-sm opacity-80">AI processing in progress</p>
                </div>
              </div>
            )}

            {/* Scan Result Overlay */}
            {scanResult && (
              <div className="absolute top-4 left-4 right-4">
                <Card className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={scanResult.product.image || "/placeholder.svg"}
                        alt={scanResult.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{scanResult.product.name}</h3>
                        <p className="text-2xl font-bold text-green-600 mb-2">${scanResult.product.price}</p>
                        <Badge className={`${stockColor} border-0 text-xs`}>{stockBadge}</Badge>
                        <div className="mt-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                            {Math.round(scanResult.confidence * 100)}% Match
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full"
            size="lg"
            aria-label="Scan product with camera"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Scan className="w-5 h-5 mr-2" />
                Scan Product
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {scanResult && (
        <div className="flex gap-3">
          <Button onClick={handleAddToCart} className="flex-1" aria-label="Add product to cart">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={handleNavigate}
            variant="outline"
            className="flex-1 bg-transparent"
            aria-label="Navigate to product location"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find in Store
          </Button>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 text-gray-800">You might also like:</h4>
            <div className="flex flex-wrap gap-2">
              {recommendations.slice(0, 3).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleRecommendationClick(product.id)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-medium transition-colors"
                  aria-label={`View recommendation: ${product.name}`}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
