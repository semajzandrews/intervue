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
  Chrome,
  CheckCircle,
  Loader2
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SignInPage() {
  const { signIn } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [signinMethod, setSigninMethod] = useState<string | null>(null)

  const handleSocialSignIn = async (provider: 'google' | 'linkedin') => {
    setIsSigningIn(true)
    setSigninMethod(provider)
    
    await signIn(provider)
    
    setIsSigningIn(false)
    setSigninMethod(null)
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
          
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:shadow-lg transition-all">
            <Sparkles className="w-3 h-3 mr-1" />
            Welcome Back
          </Badge>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Sign in to your account
          </h1>
          <p className="text-gray-600">
            Continue your interview prep journey
          </p>
        </div>

        {/* Sign In Card */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
          <CardHeader className="pb-6">
            <div className="space-y-4">
              {/* Google Sign In */}
              <Button
                onClick={() => handleSocialSignIn('google')}
                disabled={isSigningIn}
                className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 text-base font-semibold shadow-sm hover:shadow-md"
              >
                {isSigningIn && signinMethod === 'google' ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <div className="mr-3 w-5 h-5 bg-white rounded-sm border border-gray-300 flex items-center justify-center">
                    <Chrome className="h-4 w-4 text-blue-500" />
                  </div>
                )}
                Continue with Google
              </Button>
              
              {/* LinkedIn Sign In */}
              <Button
                onClick={() => handleSocialSignIn('linkedin')}
                disabled={isSigningIn}
                className="w-full h-14 bg-[#0077B5] hover:bg-[#005885] text-white border-0 transition-all duration-200 text-base font-semibold shadow-sm hover:shadow-md"
              >
                {isSigningIn && signinMethod === 'linkedin' ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <div className="mr-3 w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-[#0077B5] font-bold text-xs">in</span>
                  </div>
                )}
                Continue with LinkedIn
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Benefits */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Quick & Secure Sign In
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      No passwords to remember. Sign in with your existing account in one click.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <Separator className="bg-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-3 text-sm text-gray-500">New to Intervue?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <Link href="/sign-up">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    Create your free account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/support" className="hover:text-gray-700 transition-colors">
              Support
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