import type { Product } from "./semanticSearch"

export type StockLevel = "low" | "ok" | "high"

export function predictStock(product: Product): StockLevel {
  // Simple LSTM-like prediction stub
  // In real app, this would use historical data and machine learning

  if (product.stock <= 2) return "low"
  if (product.stock <= 5) return "ok"
  return "high"
}

export function getStockBadge(stockLevel: StockLevel, stock: number): string {
  switch (stockLevel) {
    case "low":
      return `Only ${stock} left!`
    case "ok":
      return `${stock} in stock`
    case "high":
      return `In stock`
    default:
      return "In stock"
  }
}

export function getStockColor(stockLevel: StockLevel): string {
  switch (stockLevel) {
    case "low":
      return "text-red-600 bg-red-50"
    case "ok":
      return "text-yellow-600 bg-yellow-50"
    case "high":
      return "text-green-600 bg-green-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}
