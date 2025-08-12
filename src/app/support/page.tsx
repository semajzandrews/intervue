"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { 
  ArrowLeft, 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  Book, 
  Video,
  Search,
  ChevronDown,
  ChevronRight,
  Send,
  Clock,
  CheckCircle
} from "lucide-react"

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create my first interview session?",
        a: "Navigate to the Generate page, paste a job description, select your preferences, and click 'Generate Questions'. The AI will create personalized interview questions for you to practice with."
      },
      {
        q: "What types of questions can Intervue generate?",
        a: "Intervue can generate Behavioral, Technical, and Mixed question types. You can also use YOLO mode for more creative and unexpected questions."
      },
      {
        q: "How do I save my practice sessions?",
        a: "All generated sessions are automatically saved to your Library. You can access them anytime to resume practice or review questions."
      }
    ]
  },
  {
    category: "Account & Billing",
    questions: [
      {
        q: "How do I upgrade my plan?",
        a: "Go to your Account page and click 'Upgrade Plan', or visit our Pricing page to compare plans and upgrade directly."
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, you can cancel your subscription at any time from your Account settings. Your access will continue until the end of your billing period."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express) and process payments securely through Stripe."
      }
    ]
  },
  {
    category: "Features & Usage",
    questions: [
      {
        q: "What is Quiz Mode?",
        a: "Quiz Mode is an interactive flashcard experience where you can practice with your saved questions. It includes features like progress tracking, timers, and completion statistics."
      },
      {
        q: "How does the AI generate questions?",
        a: "Our AI analyzes your job description to understand the role requirements and generates relevant questions based on industry best practices and common interview patterns."
      },
      {
        q: "Can I export my questions?",
        a: "Yes! You can download your questions as JSON files from the Library page, or export all your data from Account settings."
      }
    ]
  },
  {
    category: "Technical Issues",
    questions: [
      {
        q: "Why aren't my questions generating?",
        a: "Make sure your job description is at least 50 characters long and contains relevant job information. Check your internet connection and try refreshing the page."
      },
      {
        q: "I can't access my saved sessions",
        a: "Ensure you're logged into the same account. If the issue persists, try clearing your browser cache or contact our support team."
      },
      {
        q: "The site is loading slowly",
        a: "This might be due to network issues or high traffic. Try refreshing the page, clearing your browser cache, or switching to a different browser."
      }
    ]
  }
]

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert("Thank you for contacting us! We'll get back to you within 24 hours.")
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: ""
    })
    setIsSubmitting(false)
  }

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
              <HelpCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Book className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
                  <p className="text-gray-600 text-sm">Complete guides and tutorials</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
                  <p className="text-gray-600 text-sm">Step-by-step video guides</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600 text-sm">Chat with our support team</p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredFaqs.map((category, categoryIndex) => (
                    <div key={category.category}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {category.category}
                      </h3>
                      <div className="space-y-2">
                        {category.questions.map((faq, index) => {
                          const faqId = `${categoryIndex}-${index}`
                          const isExpanded = expandedFaq === faqId
                          
                          return (
                            <div key={faqId} className="border border-gray-200 rounded-lg">
                              <button
                                onClick={() => toggleFaq(faqId)}
                                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                              >
                                <span className="font-medium text-gray-900">{faq.q}</span>
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-500" />
                                )}
                              </button>
                              {isExpanded && (
                                <div className="px-4 pb-3 text-gray-700 leading-relaxed border-t border-gray-100">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {filteredFaqs.length === 0 && searchQuery && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No FAQs found matching your search.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Contact Support
                </h2>
                <p className="text-gray-600 text-sm">Can't find what you're looking for? Send us a message.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={contactForm.category} onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your issue or question..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Response Times
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Live Chat</span>
                    <span className="text-sm font-medium text-green-600">< 5 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email Support</span>
                    <span className="text-sm font-medium text-blue-600">< 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Technical Issues</span>
                    <span className="text-sm font-medium text-purple-600">< 48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-900">All systems operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-900">AI services running</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-900">Payment processing active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Need More Help?</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/terms">
                  <Button variant="outline" className="w-full justify-start text-left">
                    Terms of Service
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button variant="outline" className="w-full justify-start text-left">
                    Privacy Policy
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start text-left">
                  Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}