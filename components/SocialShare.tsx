"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Trophy, Star, Target, Zap } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export default function SocialShare() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "first_scan",
      title: "First Scan",
      description: "Scanned your first product",
      icon: Zap,
      unlocked: true,
    },
    {
      id: "speed_demon",
      title: "Speed Demon",
      description: "Complete shopping in under 5 minutes",
      icon: Target,
      unlocked: true,
      progress: 4,
      maxProgress: 5,
    },
    {
      id: "accuracy_master",
      title: "Accuracy Master",
      description: "Achieve 95%+ scan accuracy",
      icon: Star,
      unlocked: false,
      progress: 87,
      maxProgress: 95,
    },
  ])

  const handleShare = async () => {
    const shareData = {
      title: "AislePilot - Smart Shopping AI",
      text: "I just saved 30 minutes grocery shopping with AI! Check out AislePilot 🛒🤖",
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        console.log("Share cancelled")
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold">Achievements</h3>
        </div>

        <div className="space-y-3 mb-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  achievement.unlocked ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-green-500" : "bg-gray-400"}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                  {achievement.progress && achievement.maxProgress && (
                    <div className="text-xs text-blue-600">
                      {achievement.progress}/{achievement.maxProgress}
                    </div>
                  )}
                </div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    ✓
                  </Badge>
                )}
              </div>
            )
          })}
        </div>

        <Button onClick={handleShare} variant="outline" className="w-full bg-transparent">
          <Share2 className="w-4 h-4 mr-2" />
          Share Your Progress
        </Button>
      </CardContent>
    </Card>
  )
}
