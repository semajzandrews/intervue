"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Settings,
  Clock,
  Play,
  Pause,
  ArrowLeft,
  Trophy,
  Target,
  CheckCircle,
  RefreshCw,
  Share2
} from "lucide-react"

// Mock flashcard data
const mockFlashcards = [
  {
    id: "1",
    question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
    answer: "Use the STAR method:\n\n• Situation: Describe the context and team dynamics\n• Task: Explain your role and responsibilities\n• Action: Detail the specific steps you took to address the issue\n• Result: Share the positive outcome and what you learned\n\nKey points to cover:\n- Active listening and empathy\n- Direct but respectful communication\n- Finding common ground\n- Focus on project goals over personal conflicts",
    type: "Behavioral",
    difficulty: "Medium"
  },
  {
    id: "2", 
    question: "How would you design a URL shortener like bit.ly?",
    answer: "System Design Approach:\n\n1. **Requirements**\n   - Shorten long URLs\n   - Redirect to original URL\n   - Custom aliases (optional)\n   - Analytics tracking\n\n2. **Database Schema**\n   - URL mapping table\n   - User analytics table\n   - Cache layer (Redis)\n\n3. **Algorithm**\n   - Base62 encoding\n   - Counter-based or hash-based\n\n4. **Scale Considerations**\n   - Load balancing\n   - Database sharding\n   - CDN for global distribution",
    type: "Technical",
    difficulty: "Hard"
  },
  {
    id: "3",
    question: "Why do you want to work at our company specifically?",
    answer: "Structure your response around:\n\n• **Company Mission**: Connect with their values and purpose\n• **Product/Service**: Show genuine interest in what they build\n• **Culture**: Highlight alignment with their work environment\n• **Growth**: Explain how this role advances your career goals\n• **Impact**: Describe how you can contribute to their success\n\nResearch beforehand:\n- Recent company news\n- Product updates\n- Team structure\n- Company values and culture",
    type: "General",
    difficulty: "Easy"
  },
  {
    id: "4",
    question: "Describe your experience with agile development methodologies.",
    answer: "Cover these key areas:\n\n• **Scrum Experience**\n   - Sprint planning and retrospectives\n   - Daily standups\n   - User story estimation\n\n• **Tools Used**\n   - Jira, Trello, Azure DevOps\n   - Git workflow and code reviews\n\n• **Collaboration**\n   - Cross-functional team work\n   - Stakeholder communication\n\n• **Adaptability**\n   - Handling changing requirements\n   - Continuous improvement mindset\n\nProvide specific examples from past projects.",
    type: "Technical",
    difficulty: "Medium"
  },
  {
    id: "5",
    question: "What's your greatest professional weakness?",
    answer: "Framework for a strong response:\n\n• **Choose a real weakness** (not a strength in disguise)\n• **Show self-awareness** about how it impacts your work\n• **Demonstrate improvement** with specific actions taken\n• **Highlight progress** made and ongoing efforts\n\nExample weaknesses:\n- Public speaking → Joined Toastmasters\n- Delegation → Learned to trust team members\n- Perfectionism → Set realistic deadlines\n\nAvoid: 'I work too hard' or 'I care too much'",
    type: "Behavioral", 
    difficulty: "Medium"
  }
]

export default function QuizModePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentCard = mockFlashcards[currentIndex]
  const progress = ((currentIndex + 1) / mockFlashcards.length) * 100

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        flipCard()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, isFlipped])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800" 
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const goToNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      setIsCompleted(true)
      setIsTimerRunning(false)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsFlipped(false)
    }
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const resetSession = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setTimeElapsed(0)
    setIsTimerRunning(false)
    setIsCompleted(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Session Complete! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Great job! You've completed all {mockFlashcards.length} flashcards in {formatTime(timeElapsed)}.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{mockFlashcards.length}</div>
                  <p className="text-gray-600 text-sm">Cards Completed</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{formatTime(timeElapsed)}</div>
                  <p className="text-gray-600 text-sm">Time Spent</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                  <p className="text-gray-600 text-sm">Progress</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={resetSession}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all px-8 py-3"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Practice Again
              </Button>
              
              <Link href="/library">
                <Button variant="outline" className="px-8 py-3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Library
                </Button>
              </Link>
              
              <Button variant="outline" className="px-8 py-3">
                <Share2 className="mr-2 h-4 w-4" />
                Share Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur-xl sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/library">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Library
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {currentIndex + 1} of {mockFlashcards.length}
                </span>
                <Progress value={progress} className="w-32 h-2" />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeElapsed)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1"
                >
                  {isTimerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Card Type and Difficulty */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Badge className="bg-blue-100 text-blue-800 border-0">
            {currentCard.type}
          </Badge>
          <Badge className={`${getDifficultyColor(currentCard.difficulty)} border-0`}>
            {currentCard.difficulty}
          </Badge>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <div 
            className={`relative w-full h-96 sm:h-[500px] transform-style-preserve-3d transition-transform duration-700 cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={flipCard}
          >
            {/* Front of card (Question) */}
            <Card className="absolute inset-0 backface-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8 sm:p-12 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
                    {currentCard.question}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Click to reveal answer
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back of card (Answer) */}
            <Card className="absolute inset-0 backface-hidden rotate-y-180 border-0 shadow-xl">
              <CardContent className="p-8 sm:p-12 h-full overflow-y-auto">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="prose prose-sm sm:prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                    {currentCard.answer}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="px-6 py-3"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={flipCard}
              className="px-4 py-3"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Flip Card
            </Button>
          </div>

          <Button
            onClick={goToNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all px-6 py-3"
          >
            {currentIndex === mockFlashcards.length - 1 ? 'Complete' : 'Next'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Use <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> to flip • 
            <kbd className="px-2 py-1 bg-gray-100 rounded mx-1">←</kbd> Previous • 
            <kbd className="px-2 py-1 bg-gray-100 rounded">→</kbd> Next
          </p>
        </div>
      </div>
    </div>
  )
}