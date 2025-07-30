"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  X, 
  Sparkles, 
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Clock,
  Download,
  Zap,
  Shield,
  Headphones
} from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "Forever",
    description: "Perfect for getting started with interview prep",
    features: [
      { name: "5 questions per day", included: true },
      { name: "Basic question types", included: true },
      { name: "Save sessions", included: false },
      { name: "Flashcard mode", included: false },
      { name: "Export questions", included: false },
      { name: "AI mock interviews", included: false },
      { name: "Real-time feedback", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
    gradient: "from-gray-50 to-gray-100",
    borderColor: "border-gray-200",
  },
  {
    name: "Starter",
    price: "$9",
    period: "per month",
    description: "Great for regular interview preparation",
    features: [
      { name: "50 questions per day", included: true },
      { name: "All question types", included: true },
      { name: "Save sessions", included: true },
      { name: "Flashcard mode", included: false },
      { name: "Export questions", included: false },
      { name: "AI mock interviews", included: false },
      { name: "Real-time feedback", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Start 7-Day Trial",
    popular: false,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Perfect for serious job seekers and career changers",
    features: [
      { name: "250 questions per day", included: true },
      { name: "All question types", included: true },
      { name: "Save sessions", included: true },
      { name: "Flashcard mode", included: true },
      { name: "Export questions", included: true },
      { name: "AI mock interviews", included: false },
      { name: "Real-time feedback", included: false },
      { name: "Priority support", included: true },
    ],
    cta: "Start 7-Day Trial",
    popular: true,
    gradient: "from-blue-50 to-purple-50",
    borderColor: "border-blue-300",
  },
  {
    name: "Elite",
    price: "$39",
    period: "per month",
    description: "Everything you need to master any interview",
    features: [
      { name: "Unlimited questions", included: true },
      { name: "All question types", included: true },
      { name: "Save sessions", included: true },
      { name: "Flashcard mode", included: true },
      { name: "Export questions", included: true },
      { name: "AI mock interviews", included: true },
      { name: "Real-time feedback", included: true },
      { name: "Priority support", included: true },
    ],
    cta: "Start 7-Day Trial",
    popular: false,
    gradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
  }
]

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day free trial for all paid plans. If you're not satisfied within the first 30 days, we provide a full refund."
  },
  {
    question: "What happens if I exceed my daily question limit?",
    answer: "You'll be notified when approaching your limit. Once reached, you can either wait until the next day or upgrade your plan for immediate access."
  },
  {
    question: "Can I change plans at any time?",
    answer: "Absolutely! You can upgrade or downgrade your plan anytime. Changes take effect immediately, and billing is prorated."
  },
  {
    question: "Is there a limit to how many jobs I can prepare for?",
    answer: "No limits! You can generate questions for as many job descriptions as you want within your daily question allowance."
  },
  {
    question: "Do you offer team or enterprise pricing?",
    answer: "Yes! We offer special pricing for teams and enterprises. Contact us for a custom quote tailored to your organization's needs."
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:shadow-lg transition-all">
              <Sparkles className="w-3 h-3 mr-1" />
              Choose Your Perfect Plan
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Simple, Transparent
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Start free and scale up as you need. All plans include our core features with no hidden fees or surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative border-2 ${plan.borderColor} bg-gradient-to-b ${plan.gradient} hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-200 shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full py-6 text-base font-semibold transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl' 
                        : plan.name === 'Free'
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'border-2 border-gray-900 hover:bg-gray-900 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Compare all features
            </h2>
            <p className="text-xl text-gray-600">
              See exactly what's included in each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-blue-50 rounded-t-lg">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Elite</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Daily Question Limit</td>
                  <td className="text-center py-4 px-6 text-gray-600">5</td>
                  <td className="text-center py-4 px-6 text-gray-600">50</td>
                  <td className="text-center py-4 px-6 text-gray-600 bg-blue-50">250</td>
                  <td className="text-center py-4 px-6 text-gray-600">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Question Types</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-sm text-gray-600">Basic</span>
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Save Sessions</td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Flashcard Mode</td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Export Questions</td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">AI Mock Interviews</td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Real-time Feedback</td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Priority Support</td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 bg-blue-50">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to start your interview prep journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of successful candidates. Start with our free plan or try any paid plan with a 7-day trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg font-semibold group"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold"
            >
              <Headphones className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}