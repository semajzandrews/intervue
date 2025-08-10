"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  User,
  Crown,
  CreditCard,
  Calendar,
  Download,
  Trash2,
  Settings,
  Shield,
  Bell,
  Mail,
  Smartphone,
  Check,
  ArrowUpRight,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react"

// Mock user data
const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@gmail.com",
  avatar: null,
  joinDate: "2024-01-01",
  currentPlan: "Pro",
  planPrice: "$19",
  nextBilling: "2024-02-15",
  usage: {
    questionsUsed: 167,
    questionsLimit: 250,
    resetDate: "2024-01-16"
  }
}

const mockBillingHistory = [
  {
    id: "inv_001",
    date: "2024-01-15",
    amount: "$19.00",
    plan: "Pro Plan",
    status: "paid",
    invoice: "inv_2024_001.pdf"
  },
  {
    id: "inv_002", 
    date: "2023-12-15",
    amount: "$19.00",
    plan: "Pro Plan",
    status: "paid",
    invoice: "inv_2023_012.pdf"
  },
  {
    id: "inv_003",
    date: "2023-11-15", 
    amount: "$9.00",
    plan: "Starter Plan",
    status: "paid",
    invoice: "inv_2023_011.pdf"
  }
]

const planFeatures = {
  Free: ["5 questions/day", "Basic types", "No saves"],
  Starter: ["50 questions/day", "All types", "Save sessions"],
  Pro: ["250 questions/day", "Flashcards", "Export", "Priority support"],
  Elite: ["Unlimited", "AI interviews", "Real-time feedback", "Priority support"]
}

export default function AccountPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showCardDetails, setShowCardDetails] = useState(false)
  
  const usagePercentage = (mockUser.usage.questionsUsed / mockUser.usage.questionsLimit) * 100
  
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Free": return "bg-gray-100 text-gray-800"
      case "Starter": return "bg-blue-100 text-blue-800"
      case "Pro": return "bg-purple-100 text-purple-800"
      case "Elite": return "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
      
      {/* Header */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Account Settings
            </h1>
            <p className="text-lg text-gray-600">
              Manage your profile, plan, and billing preferences
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile & Plan */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{mockUser.name}</h3>
                    <p className="text-gray-600 mb-2">{mockUser.email}</p>
                    <p className="text-sm text-gray-500">Member since {formatDate(mockUser.joinDate)}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Plan */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Current Plan
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${getPlanColor(mockUser.currentPlan)} border-0 text-lg px-3 py-1`}>
                        {mockUser.currentPlan} Plan
                      </Badge>
                      <span className="text-2xl font-bold text-gray-900">{mockUser.planPrice}/month</span>
                    </div>
                    <p className="text-gray-600">Next billing: {formatDate(mockUser.nextBilling)}</p>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </div>
                
                {/* Usage Stats */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Daily Usage</h4>
                    <span className="text-sm text-gray-600">
                      Resets on {formatDate(mockUser.usage.resetDate)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Questions used today</span>
                      <span className="font-medium">
                        {mockUser.usage.questionsUsed} / {mockUser.usage.questionsLimit}
                      </span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                    {usagePercentage > 80 && (
                      <div className="flex items-center gap-2 text-amber-600 text-sm mt-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Approaching daily limit</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plan Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Your plan includes:</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {planFeatures[mockUser.currentPlan as keyof typeof planFeatures]?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing History
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBillingHistory.map((invoice, index) => (
                    <div key={invoice.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{invoice.amount}</span>
                          <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {invoice.plan} • {formatDate(invoice.date)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Invoice
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All Billing History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Settings */}
          <div className="space-y-8">
            
            {/* Payment Method */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {showCardDetails ? "4242 4242 4242 4242" : "•••• •••• •••• 4242"}
                      </p>
                      <p className="text-xs text-gray-600">Expires 12/26</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCardDetails(!showCardDetails)}
                  >
                    {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">Email updates</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">Usage alerts</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">Billing reminders</span>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <h2 className="text-lg font-semibold text-gray-900">Account Actions</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full border-0 shadow-2xl">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Delete Account
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                This action cannot be undone. All your data, saved sessions, and account information will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </ProtectedRoute>
  )
}