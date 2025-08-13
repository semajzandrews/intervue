"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Loader2,
  Gift,
  Target,
  Users
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SignUpPage() {
  const { signIn } = useAuth()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [signupMethod, setSignupMethod] = useState<string | null>(null)

  const handleSocialSignUp = async (provider: 'google' | 'linkedin') => {
    setIsSigningUp(true)
    setSignupMethod(provider)
    
    await signIn(provider)
    
    setIsSigningUp(false)
    setSignupMethod(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(59_130_246_/_0.15)_1px,transparent_0)] [background-size:24px_24px]" />
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 hover:opacity-80 transition-all duration-200">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Intervue
            </span>
          </Link>
          
          <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:shadow-lg transition-all">
            <Gift className="w-3 h-3 mr-1" />
            Start Free Today
          </Badge>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Create your account
          </h1>
          <p className="text-gray-600">
            Join thousands preparing for their dream jobs
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
          <CardHeader className="pb-6">
            <div className="space-y-4">
              {/* Google Sign Up */}
              <Button
                onClick={() => handleSocialSignUp('google')}
                disabled={isSigningUp}
                className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 text-base font-semibold shadow-sm hover:shadow-md"
              >
                {isSigningUp && signupMethod === 'google' ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png" alt="Google logo" className="mr-3 h-5 w-5" />
                )}
                Sign up with Google
              </Button>
              
              {/* LinkedIn Sign Up */}
              <Button
                onClick={() => handleSocialSignUp('linkedin')}
                disabled={isSigningUp}
                className="w-full h-14 bg-[#0077B5] hover:bg-[#005885] text-white border-0 transition-all duration-200 text-base font-semibold shadow-sm hover:shadow-md"
              >
                {isSigningUp && signupMethod === 'linkedin' ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-white-icon.png" alt="LinkedIn logo" className="mr-3 h-5 w-5" />
                )}
                Sign up with LinkedIn
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Free Plan Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">
                      What you get for free:
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>5 AI questions daily</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Basic question types</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Flashcard practice mode</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>2,847+</span>
                  </div>
                  <p className="text-xs text-gray-600">Users</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>89%</span>
                  </div>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <Separator className="bg-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-3 text-sm text-gray-500">Already have an account?</span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <Link href="/sign-in">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    Sign in to your account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </Link>
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <Link href="/support" className="hover:text-gray-700 transition-colors">
              Need help?
            </Link>
          </div>
          
          <p className="text-xs text-gray-500">
            Secure authentication powered by Clerk
          </p>
        </div>
      </div>
    </div>
  )
}