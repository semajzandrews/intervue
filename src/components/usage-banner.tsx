"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

interface UsageBannerProps {
  used: number
  limit: number
  onUpgradeClick?: () => void
}

export function UsageBanner({ used, limit, onUpgradeClick }: UsageBannerProps) {
  const percentage = (used / limit) * 100
  const isNearLimit = percentage >= 80

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${isNearLimit ? 'from-amber-50 via-orange-50 to-red-50 border-amber-300' : 'from-blue-50 via-indigo-50 to-purple-50 border-blue-300'} border-2 rounded-2xl p-6 shadow-xl backdrop-blur-sm`}>
      <div className="absolute inset-0 bg-white/20"></div>
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isNearLimit ? 'bg-amber-500' : 'bg-blue-500'}`}>
              <span className="text-white font-bold">⚡</span>
            </div>
            <div>
              <div className={`text-lg font-bold ${isNearLimit ? 'text-amber-900' : 'text-blue-900'}`}>
                {used}/{limit} questions used today
              </div>
              <div className="text-sm text-gray-600">
                {isNearLimit ? 'You\'re almost at your daily limit' : 'Keep generating amazing questions'}
              </div>
            </div>
            {isNearLimit && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                Almost Full!
              </span>
            )}
          </div>
          <div className="w-full sm:w-80">
            <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-2">
              <span>Usage</span>
              <span>{Math.round(percentage)}%</span>
            </div>
            <div className={`h-3 rounded-full overflow-hidden ${isNearLimit ? 'bg-amber-200' : 'bg-blue-200'}`}>
              <div 
                className={`h-full transition-all duration-500 ease-out rounded-full ${isNearLimit ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onUpgradeClick}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 px-8 py-4 rounded-xl transform hover:scale-105"
        >
          <Sparkles className="h-5 w-5" />
          Upgrade for More
        </Button>
      </div>
    </div>
  )
} 