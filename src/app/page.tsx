"use client"

import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Clock, 
  Check,
  Users,
  TrendingUp,
  Star,
  Play,
  BookOpen,
  MessageSquare,
  Zap,
  Award,
  Globe,
  Shield,
  BarChart3
} from "lucide-react"

export default function HomePage() {
  const { isSignedIn } = useAuth()
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transform -translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-3xl transform translate-x-48 translate-y-48" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50 shadow-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-700">New: AI Mock Interviews</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span className="text-slate-900">Interview like a</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    pro
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  Transform any job posting into personalized interview questions. Practice with AI feedback, track your progress, and land your dream role with confidence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={isSignedIn ? "/generate" : "/sign-up"}>
                  <Button 
                    size="lg" 
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                  >
                    {isSignedIn ? "Continue practicing" : "Start practicing free"}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 text-base font-semibold rounded-xl group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch demo
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">10k+</div>
                  <div className="text-sm text-slate-600">Users prepared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">94%</div>
                  <div className="text-sm text-slate-600">Success rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Companies</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Hero Visual */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/50 overflow-hidden transform hover:rotate-1 hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/50">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm text-slate-500">Interview Question Generator</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-slate-700">Job Description</div>
                    <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                      Senior Software Engineer at Google
                      <br />
                      Building scalable distributed systems...
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-slate-700">Generated Questions</div>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-4 transform hover:scale-102 transition-transform">
                        <div className="text-sm font-medium text-slate-900 mb-2">Tell me about a time you optimized system performance</div>
                        <div className="text-xs text-slate-600">Behavioral • Senior Level</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4 transform hover:scale-102 transition-transform">
                        <div className="text-sm font-medium text-slate-900 mb-2">How would you design a distributed caching system?</div>
                        <div className="text-xs text-slate-600">Technical • System Design</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements with animation */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200/50 px-4 py-3 animate-bounce">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium text-slate-900">AI-powered</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-200/50 px-4 py-3 hover:scale-110 transition-transform">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-slate-900">Generated in 3s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Features</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Everything you need to land
              <br />
              <span className="text-slate-600">your dream job</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From AI-powered question generation to real-time interview coaching, 
              we provide all the tools you need to interview with confidence.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-white rounded-2xl border border-slate-200/50 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Smart Question Generation</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our AI analyzes job descriptions and generates personalized questions tailored to the specific role, seniority level, and industry.
                </p>
                <div className="mt-6 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                  Learn more →
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group">
              <div className="bg-white rounded-2xl border border-slate-200/50 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">AI Mock Interviews</h3>
                <p className="text-slate-600 leading-relaxed">
                  Practice with our advanced AI interviewer that provides real-time feedback, suggestions, and performance scoring based on your responses.
                </p>
                <div className="mt-6 text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  Try it now →
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group">
              <div className="bg-white rounded-2xl border border-slate-200/50 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Progress Analytics</h3>
                <p className="text-slate-600 leading-relaxed">
                  Track your improvement with detailed analytics, identify weak areas, and get personalized recommendations for continued growth.
                </p>
                <div className="mt-6 text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors">
                  View stats →
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                <Clock className="h-5 w-5 text-slate-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Quick Setup</h4>
              <p className="text-sm text-slate-600">Get started in under 30 seconds</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="h-5 w-5 text-slate-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Privacy First</h4>
              <p className="text-sm text-slate-600">Your data is encrypted and secure</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                <Globe className="h-5 w-5 text-slate-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Global Companies</h4>
              <p className="text-sm text-slate-600">Questions for 500+ top companies</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                <Award className="h-5 w-5 text-slate-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Proven Results</h4>
              <p className="text-sm text-slate-600">94% of users land interviews</p>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Testimonials</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Loved by professionals
              <br />
              <span className="text-slate-600">at top companies</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-3 text-lg font-semibold text-slate-900">4.9 out of 5</span>
            </div>
            <p className="text-slate-600">from 10,000+ job seekers who landed their dream roles</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-slate-700 leading-relaxed mb-8">
                "Intervue transformed my interview prep completely. The AI-generated questions were incredibly accurate to what I actually got asked at Google. I felt so much more confident going in."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Sarah Johnson</div>
                  <div className="text-sm text-slate-600">Senior Software Engineer</div>
                  <div className="text-sm text-slate-500">Google</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-slate-700 leading-relaxed mb-8">
                "The mock interview feature is a game-changer. It's like having a personal interview coach available 24/7. The feedback helped me identify and fix my weak points before the real thing."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-semibold">MC</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Michael Chen</div>
                  <div className="text-sm text-slate-600">Senior Product Manager</div>
                  <div className="text-sm text-slate-500">Meta</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-slate-700 leading-relaxed mb-8">
                "I landed my dream data science role after just 2 weeks of using Intervue. The personalized questions and detailed explanations made all the difference in my preparation."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold">AP</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Alex Patel</div>
                  <div className="text-sm text-slate-600">Senior Data Scientist</div>
                  <div className="text-sm text-slate-500">Netflix</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Logos Marquee */}
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500 mb-8">Trusted by professionals at</p>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee gap-16 py-4">
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Google</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Meta</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Netflix</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Apple</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Tesla</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Stripe</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Microsoft</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Amazon</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Spotify</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Airbnb</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Uber</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Coinbase</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Shopify</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Notion</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Figma</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">OpenAI</div>
                {/* Duplicate for seamless loop */}
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Google</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Meta</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Netflix</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Apple</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Tesla</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Stripe</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Microsoft</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Amazon</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Spotify</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Airbnb</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Uber</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Coinbase</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Shopify</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Notion</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">Figma</div>
                <div className="text-2xl font-bold text-slate-400 whitespace-nowrap">OpenAI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform -translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transform translate-x-48 translate-y-48" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready to ace your next
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  interview?
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Join 10,000+ professionals who landed their dream roles with personalized AI-powered interview preparation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={isSignedIn ? "/generate" : "/sign-up"}>
                <Button 
                  size="lg" 
                  className="bg-white text-slate-900 hover:bg-slate-50 px-8 py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  {isSignedIn ? "Continue practicing" : "Start practicing free"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 px-8 py-4 text-base font-semibold rounded-xl"
              >
                View pricing
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">Free to start</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
