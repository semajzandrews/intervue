"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Question {
  id: string
  question: string
  answer: string
  type: "behavioral" | "technical" | "mixed"
}

interface QuestionCardProps {
  question: Question
  currentIndex: number
  totalQuestions: number
  onPrevious: () => void
  onNext: () => void
  onFlip?: () => void
}

export function QuestionCard({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onPrevious, 
  onNext 
}: QuestionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "behavioral":
        return "bg-blue-100 text-blue-800"
      case "technical":
        return "bg-green-100 text-green-800"
      case "mixed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Card Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Badge variant="outline" className="text-sm">
          Question {currentIndex + 1} of {totalQuestions}
        </Badge>
        <Badge className={getTypeColor(question.type)}>
          {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
        </Badge>
      </div>

      {/* Flip Card */}
      <div className="relative h-80 perspective-1000">
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Question Side */}
          <Card className="absolute inset-0 w-full h-full backface-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-600 mb-4">Interview Question</h3>
                  <p className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
                    {question.question}
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={handleFlip}
                  variant="outline"
                  className="bg-brand/5 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reveal Answer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Answer Side */}
          <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-2 border-brand shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-brand mb-4">Sample Answer</h3>
                  <p className="text-lg text-gray-700 leading-relaxed text-left">
                    {question.answer}
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={handleFlip}
                  variant="outline"
                  className="bg-brand/5 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Show Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        <Button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex items-center gap-2 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(totalQuestions, 5) }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === currentIndex ? 'bg-brand' : 'bg-gray-300'
              }`}
            />
          ))}
          {totalQuestions > 5 && (
            <span className="text-sm text-gray-500 ml-2">...</span>
          )}
        </div>

        <Button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          variant="outline"
          className="flex items-center gap-2 disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 