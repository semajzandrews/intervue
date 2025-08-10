"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  plan: 'Free' | 'Starter' | 'Pro' | 'Elite'
  usage: {
    questionsUsed: number
    questionsLimit: number
    resetDate: string
  }
}

interface AuthContextType {
  isSignedIn: boolean
  user: User | null
  signIn: (provider: 'google' | 'linkedin') => Promise<void>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Mock user data
  const mockUser: User = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    plan: 'Pro',
    usage: {
      questionsUsed: 3,
      questionsLimit: 250,
      resetDate: '2024-01-16'
    }
  }

  // Initialize auth state (in real app, this would check Clerk)
  useEffect(() => {
    // Simulate checking existing session
    const checkAuth = async () => {
      setIsLoading(true)
      // In real app: check localStorage, cookies, or Clerk session
      const savedAuth = localStorage.getItem('mock-auth')
      if (savedAuth === 'true') {
        setIsSignedIn(true)
        setUser(mockUser)
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const signIn = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true)
    
    // Simulate auth process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Set auth state
    setIsSignedIn(true)
    setUser(mockUser)
    localStorage.setItem('mock-auth', 'true')
    
    setIsLoading(false)
    
    // Redirect to generate page
    router.push('/generate')
  }

  const signOut = () => {
    setIsSignedIn(false)
    setUser(null)
    localStorage.removeItem('mock-auth')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      isSignedIn,
      user,
      signIn,
      signOut,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}