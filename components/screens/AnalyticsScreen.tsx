"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Target, Zap } from "lucide-react"

export default function AnalyticsScreen() {
  const metrics = {
    totalScans: 1247,
    activeUsers: 89,
    avgScanTime: 2.3,
    stockAccuracy: 94.2,
    userSatisfaction: 4.8,
    timesSaved: 156,
  }

  const recentActivity = [
    { product: "Organic Bananas", user: "User #1234", time: "2 min ago", accuracy: 98 },
    { product: "Greek Yogurt", user: "User #5678", time: "5 min ago", accuracy: 95 },
    { product: "Whole Wheat Bread", user: "User #9012", time: "8 min ago", accuracy: 92 },
  ]

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          LIVE
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Total Scans</span>
            </div>
            <div className="text-2xl font-bold">{metrics.totalScans.toLocaleString()}</div>
            <div className="text-xs text-green-600">+23% today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Active Users</span>
            </div>
            <div className="text-2xl font-bold">{metrics.activeUsers}</div>
            <div className="text-xs text-green-600">+12% today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">Avg Scan Time</span>
            </div>
            <div className="text-2xl font-bold">{metrics.avgScanTime}s</div>
            <div className="text-xs text-green-600">-15% faster</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600">Accuracy</span>
            </div>
            <div className="text-2xl font-bold">{metrics.stockAccuracy}%</div>
            <div className="text-xs text-green-600">+2.1% this week</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Computer Vision Accuracy</span>
                <span>94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Stock Prediction Accuracy</span>
                <span>87.5%</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>User Satisfaction</span>
                <span>96.0%</span>
              </div>
              <Progress value={96.0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Real-time Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{activity.product}</div>
                  <div className="text-sm text-gray-600">
                    {activity.user} • {activity.time}
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {activity.accuracy}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">$12.4K</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">156h</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
