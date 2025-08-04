"use client"

import type { Product } from "@/utils/semanticSearch"
import { predictStock, getStockBadge, getStockColor } from "@/utils/forecast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, MapPin } from "lucide-react"

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
  onNavigate?: () => void
  className?: string
}

export default function ProductCard({ product, onAddToCart, onNavigate, className = "" }: ProductCardProps) {
  const stockLevel = predictStock(product)
  const stockBadge = getStockBadge(stockLevel, product.stock)
  const stockColor = getStockColor(stockLevel)

  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-2xl font-bold text-green-600">${product.price}</p>
          </div>
        </div>

        <div className="mb-3">
          <Badge className={`${stockColor} border-0`}>{stockBadge}</Badge>
        </div>

        <div className="flex gap-2">
          {onAddToCart && (
            <Button onClick={onAddToCart} className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
          {onNavigate && (
            <Button onClick={onNavigate} variant="outline" className="flex-1 bg-transparent">
              <MapPin className="w-4 h-4 mr-2" />
              Find in Store
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
