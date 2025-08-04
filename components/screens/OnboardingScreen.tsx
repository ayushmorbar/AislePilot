"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Zap, MapPin, ShoppingCart, TrendingUp } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

export default function OnboardingScreen({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: Zap,
      title: "AI-Powered Shopping",
      description: "Scan any product instantly with computer vision technology",
      stat: "99.2% accuracy",
      color: "bg-blue-500",
    },
    {
      icon: MapPin,
      title: "AR Navigation",
      description: "Never get lost in stores again with real-time wayfinding",
      stat: "50% faster shopping",
      color: "bg-green-500",
    },
    {
      icon: TrendingUp,
      title: "Smart Predictions",
      description: "Get alerts before items go out of stock",
      stat: "85% stock prediction accuracy",
      color: "bg-purple-500",
    },
    {
      icon: ShoppingCart,
      title: "Intelligent Cart",
      description: "Personalized recommendations and price optimization",
      stat: "Save $127/month avg",
      color: "bg-orange-500",
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AislePilot
          </h1>
          <p className="text-gray-600 mt-2">The Future of Smart Shopping</p>
          <p className="text-xs text-gray-500 mt-1">built w ❤️ by offbeats</p>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <div className={`w-20 h-20 ${step.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
              <Icon className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
            <p className="text-gray-600 mb-4">{step.description}</p>

            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              {step.stat}
            </Badge>
          </CardContent>
        </Card>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button onClick={nextStep} className="w-full" size="lg">
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Start Shopping"
          )}
        </Button>

        {/* Skip Option */}
        {currentStep < steps.length - 1 && (
          <button onClick={onComplete} className="w-full text-center text-gray-500 text-sm mt-4 hover:text-gray-700">
            Skip intro
          </button>
        )}
      </div>
    </div>
  )
}
