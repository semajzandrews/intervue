"use client"

import Link from "next/link"
import { User, LogOut, CreditCard, BookOpen, DollarSign, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function Navigation() {
  const { isSignedIn, user, signOut } = useAuth()
  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={isSignedIn ? "/generate" : "/"} className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Intervue
              </span>
            </Link>
          </div>

          {/* Navigation Links - Only show when signed in */}
          {isSignedIn && (
            <div className="flex items-center space-x-1">
              <Link 
                href="/library" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hidden sm:flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:block">Library</span>
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hidden sm:flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden md:block">Pricing</span>
              </Link>
            </div>
          )}

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              /* Signed In - Profile Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
                      <span className="text-white font-semibold text-xs">
                        {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-700">{user?.name.split(' ')[0]}</p>
                      <p className="text-xs text-gray-500">{user?.plan} Plan</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 shadow-lg border-0 ring-1 ring-gray-200">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md mx-1 my-1">
                      <Settings className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md mx-1 my-1">
                      <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Billing & Plans</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 hover:bg-red-50 rounded-md mx-1 my-1"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Signed Out - Auth Buttons */
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-sm hover:shadow-md transition-all">
                    Try Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 