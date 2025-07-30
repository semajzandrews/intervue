"use client"

import Link from "next/link"
import { User, LogOut, CreditCard, BookOpen, DollarSign } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Intervue
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
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

          {/* Profile Dropdown */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2">
                  <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-lg border-0 ring-1 ring-gray-200">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md mx-1 my-1">
                  <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                  <span>View Plan</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 rounded-md mx-1 my-1">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
} 