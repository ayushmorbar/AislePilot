import type { Product } from "./semanticSearch"

export const DEMO_SCENARIOS = [
  {
    id: "scenario1",
    name: "Busy Parent Shopping",
    description: "Quick grocery run with kids",
    products: ["P001", "P002", "P004"], // Bananas, Yogurt, Milk
    timeLimit: 300, // 5 minutes
    savings: 23.5,
  },
  {
    id: "scenario2",
    name: "Health-Conscious Shopper",
    description: "Organic and healthy options",
    products: ["P001", "P003"], // Organic Bananas, Whole Wheat Bread
    timeLimit: 180, // 3 minutes
    savings: 15.75,
  },
  {
    id: "scenario3",
    name: "Last-Minute Dinner Prep",
    description: "Quick meal ingredients",
    products: ["P002", "P005"], // Greek Yogurt, Peanut Butter
    timeLimit: 240, // 4 minutes
    savings: 8.99,
  },
]

export interface DemoStats {
  totalScans: number
  avgScanTime: number
  accuracyRate: number
  timeSaved: number
  moneySaved: number
}

export function generateDemoStats(): DemoStats {
  return {
    totalScans: Math.floor(Math.random() * 50) + 100,
    avgScanTime: Math.random() * 1 + 1.5, // 1.5-2.5 seconds
    accuracyRate: Math.random() * 5 + 94, // 94-99%
    timeSaved: Math.floor(Math.random() * 30) + 45, // 45-75 minutes
    moneySaved: Math.random() * 50 + 25, // $25-75
  }
}

export function simulateRealtimeUpdate(): Promise<{
  newScan: boolean
  product?: Product
  user?: string
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        newScan: Math.random() > 0.7,
        product:
          Math.random() > 0.5
            ? {
                id: "DEMO",
                name: "Demo Product",
                price: 4.99,
                stock: 5,
                aisle: "A1",
                category: "Demo",
                image: "/placeholder.svg?height=100&width=100",
                recommendations: [],
              }
            : undefined,
        user: `User #${Math.floor(Math.random() * 9999)}`,
      })
    }, 2000)
  })
}
