"use client"

import type { Product } from "@/utils/semanticSearch"
import { getRecommendations } from "@/utils/semanticSearch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface RecommendationsProps {
  productId: string
  onRecommendationClick?: (product: Product) => void
}

export default function Recommendations({ productId, onRecommendationClick }: RecommendationsProps) {
  const recommendations = getRecommendations(productId)

  if (recommendations.length === 0) return null

  return (
    <Card className="w-full max-w-sm mt-4">
      <CardContent className="p-4">
        <h4 className="font-semibold mb-3">You might also like:</h4>
        <div className="flex flex-wrap gap-2">
          {recommendations.map((product) => (
            <Badge
              key={product.id}
              variant="secondary"
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => onRecommendationClick?.(product)}
            >
              {product.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
