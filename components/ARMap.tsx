"use client"

import { useEffect, useState } from "react"
import productsData from "@/data/products.json"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ARMapProps {
  targetAisle?: string
  targetProduct?: string
}

export default function ARMap({ targetAisle, targetProduct }: ARMapProps) {
  const [eta, setEta] = useState<number>(8)
  const userLocation = productsData.userLocation
  const aisles = productsData.aisles

  useEffect(() => {
    if (targetAisle) {
      // Simulate walking time countdown
      const timer = setInterval(() => {
        setEta((prev) => Math.max(0, prev - 1))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [targetAisle])

  const getPathToAisle = (aisleId: string) => {
    const aisle = aisles[aisleId as keyof typeof aisles]
    if (!aisle) return ""

    const startX = userLocation.x
    const startY = userLocation.y
    const endX = aisle.coordinates.x
    const endY = aisle.coordinates.y

    // Create a more realistic path with multiple turns
    const midX1 = startX + (endX - startX) * 0.3
    const midY1 = startY
    const midX2 = midX1
    const midY2 = endY

    const path = `M ${startX} ${startY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${endX} ${endY}`

    // Calculate path length for animation (removed setPathLength for lint)
    // const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))

    return path
  }

  return (
    <div className="w-full">
      <Card>
        <CardContent className="p-4">
          <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
            {/* Store Layout Background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
              {/* Store outline */}
              <rect x="10" y="10" width="380" height="300" fill="none" stroke="#e5e7eb" strokeWidth="2" rx="8" />

              {/* Entrance */}
              <rect x="180" y="300" width="40" height="20" fill="#3b82f6" rx="4" />
              <text x="200" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                ENTRANCE
              </text>

              {/* Aisles as rectangles */}
              <rect x="50" y="50" width="80" height="20" fill="#f3f4f6" stroke="#d1d5db" rx="4" />
              <text x="90" y="65" textAnchor="middle" fill="#6b7280" fontSize="12" fontWeight="bold">
                Produce
              </text>

              <rect x="160" y="100" width="80" height="20" fill="#f3f4f6" stroke="#d1d5db" rx="4" />
              <text x="200" y="115" textAnchor="middle" fill="#6b7280" fontSize="12" fontWeight="bold">
                Dairy
              </text>

              <rect x="270" y="80" width="80" height="20" fill="#f3f4f6" stroke="#d1d5db" rx="4" />
              <text x="310" y="95" textAnchor="middle" fill="#6b7280" fontSize="12" fontWeight="bold">
                Bakery
              </text>

              {/* Checkout area */}
              <rect
                x="50"
                y="250"
                width="300"
                height="30"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeDasharray="5,5"
                rx="4"
              />
              <text x="200" y="270" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
                CHECKOUT
              </text>

              {/* User location */}
              <circle cx={userLocation.x} cy={userLocation.y} r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="3">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Aisle markers */}
              {Object.entries(aisles).map(([id, aisle]) => (
                <g key={id}>
                  <circle
                    cx={aisle.coordinates.x}
                    cy={aisle.coordinates.y}
                    r="12"
                    fill={targetAisle === id ? "#f59e0b" : "#6b7280"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={aisle.coordinates.x}
                    y={aisle.coordinates.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {id}
                  </text>
                </g>
              ))}

              {/* Animated path to target aisle */}
              {targetAisle && (
                <g>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                    </marker>
                  </defs>
                  <path
                    d={getPathToAisle(targetAisle)}
                    stroke="#f59e0b"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10,5"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                  >
                    <animate attributeName="stroke-dashoffset" values="0;-15;0" dur="1s" repeatCount="indefinite" />
                  </path>
                </g>
              )}
            </svg>

            {/* User location label */}
            <div className="absolute" style={{ left: userLocation.x - 35, top: userLocation.y + 25 }}>
              <Badge className="bg-blue-500 text-white text-xs">You Are Here</Badge>
            </div>
          </div>

          {/* Navigation Info */}
          {targetProduct && targetAisle && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Navigating to:</h3>
                  <p className="text-lg font-bold text-blue-600">{targetProduct}</p>
                  <p className="text-sm text-gray-600">Located in Aisle {targetAisle}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    ETA: {eta}s
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">~25 feet away</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
