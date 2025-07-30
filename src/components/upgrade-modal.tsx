"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Crown, Rocket } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out Intervue",
    icon: Sparkles,
    features: [
      "5 questions per day",
      "Basic question types",
      "Basic flashcard mode",
      "Community support"
    ],
    disabled: ["Advanced AI features", "Priority support", "Custom question counts"],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Starter",
    price: "$9/mo",
    description: "For regular interview prep",
    icon: Zap,
    features: [
      "50 questions per day",
      "All question types",
      "Advanced flashcard mode",
      "Email support",
      "Question history",
      "Export to PDF"
    ],
    disabled: ["AI Interviewer", "Priority support"],
    buttonText: "Upgrade to Starter",
    buttonVariant: "default" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$19/mo",
    description: "For serious job seekers",
    icon: Crown,
    features: [
      "Unlimited questions",
      "All question types",
      "Advanced flashcard mode",
      "Priority email support",
      "Question history",
      "Export to PDF",
      "Custom question counts",
      "Advanced analytics"
    ],
    disabled: ["AI Interviewer"],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Elite",
    price: "$39/mo",
    description: "The complete interview prep suite",
    icon: Rocket,
    features: [
      "Everything in Pro",
      "AI Mock Interviewer",
      "Real-time feedback",
      "Interview scoring",
      "Priority phone support",
      "Custom integrations",
      "Advanced AI features"
    ],
    disabled: [],
    buttonText: "Upgrade to Elite",
    buttonVariant: "default" as const,
    popular: false
  }
]

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Upgrade to Unlock Unlimited Questions
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Choose the perfect plan to accelerate your interview preparation
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-lg transition-all duration-200 ${
                  plan.popular ? 'border-brand shadow-brand/10' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand text-white px-3 py-1">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center space-y-4">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${
                    plan.popular ? 'from-brand to-purple-600' : 'from-gray-100 to-gray-200'
                  } flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{plan.price}</p>
                    <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-brand hover:bg-brand/90 text-white shadow-md hover:shadow-lg' 
                        : plan.buttonVariant === 'outline' 
                          ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                    } transition-all duration-200`}
                    variant={plan.buttonVariant}
                    disabled={plan.name === "Free"}
                  >
                    {plan.buttonText}
                  </Button>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.disabled.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 opacity-50">
                      <div className="h-4 w-4 border border-gray-300 rounded-full mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            All plans include a 7-day free trial. Cancel anytime. No hidden fees.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 