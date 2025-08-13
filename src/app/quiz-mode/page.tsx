"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
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

// Mock session data that matches library sessions
const mockSessions = {
  "1": {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "Google",
    flashcards: [
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
      }
    ]
  },
  "2": {
    id: "2", 
    jobTitle: "Product Manager",
    company: "Meta",
    flashcards: [
      {
        id: "3",
        question: "Why do you want to work at our company specifically?",
        answer: "Structure your response around:\n\n• **Company Mission**: Connect with their values and purpose\n• **Product/Service**: Show genuine interest in what they build\n• **Culture**: Highlight alignment with their work environment\n• **Growth**: Explain how this role advances your career goals\n• **Impact**: Describe how you can contribute to their success\n\nResearch beforehand:\n- Recent company news\n- Product updates\n- Team structure\n- Company values and culture",
        type: "General",
        difficulty: "Easy"
      }
    ]
  }
}

// Default flashcards if no session is specified
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [flashcards, setFlashcards] = useState(mockFlashcards)

  // Load session and progress on mount
  useEffect(() => {
    if (sessionId && mockSessions[sessionId as keyof typeof mockSessions]) {
      const session = mockSessions[sessionId as keyof typeof mockSessions]
      setCurrentSession(session)
      setFlashcards(session.flashcards)
      
      // Load saved progress for this session
      const savedProgress = localStorage.getItem(`quiz-progress-${sessionId}`)
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setCurrentIndex(progress.currentIndex || 0)
        setTimeElapsed(progress.timeElapsed || 0)
        setIsCompleted(progress.isCompleted || false)
      }
    } else {
      // Default session
      setFlashcards(mockFlashcards)
      const savedProgress = localStorage.getItem('quiz-progress-default')
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setCurrentIndex(progress.currentIndex || 0)
        setTimeElapsed(progress.timeElapsed || 0)
        setIsCompleted(progress.isCompleted || false)
      }
    }
  }, [sessionId])

  // Save progress whenever state changes
  useEffect(() => {
    const progressKey = sessionId ? `quiz-progress-${sessionId}` : 'quiz-progress-default'
    const progress = {
      currentIndex,
      timeElapsed,
      isCompleted,
      lastUpdated: Date.now()
    }
    localStorage.setItem(progressKey, JSON.stringify(progress))
  }, [currentIndex, timeElapsed, isCompleted, sessionId])

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  // Show loading or error state if no flashcards
  if (!flashcards || flashcards.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50">
          <Navigation />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Target className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-slate-900">No Questions Found</h1>
              <p className="text-xl text-slate-600 max-w-md mx-auto">This session doesn&apos;t have any questions yet. Create a new session to get started.</p>
            </div>
            <Link href="/library">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all px-8 py-4 rounded-xl font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Library
              </Button>
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

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
      case "Easy": return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200"
      case "Medium": return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200" 
      case "Hard": return "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200"
      default: return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
    }
  }

  const goToNext = () => {
    if (currentIndex < flashcards.length - 1) {
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
    
    // Clear saved progress
    const progressKey = sessionId ? `quiz-progress-${sessionId}` : 'quiz-progress-default'
    localStorage.removeItem(progressKey)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        
        {/* Celebration Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl transform -translate-x-48 -translate-y-48" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-400/20 to-purple-400/20 rounded-full blur-3xl transform translate-x-48 translate-y-48" />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50/50 border border-purple-200/50 shadow-sm">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">Session Complete</span>
              </div>
              
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-slate-900">Fantastic</span>{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    work!
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  You've successfully completed all {flashcards.length} flashcards in {formatTime(timeElapsed)}. 
                  Your dedication to interview preparation is impressive!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Cards */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg shadow-slate-900/5 bg-white rounded-2xl border border-slate-200/50 hover:shadow-xl transition-all group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{flashcards.length}</div>
                  <p className="text-slate-600 font-medium">Cards Completed</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-900/5 bg-white rounded-2xl border border-slate-200/50 hover:shadow-xl transition-all group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{formatTime(timeElapsed)}</div>
                  <p className="text-slate-600 font-medium">Time Invested</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-900/5 bg-white rounded-2xl border border-slate-200/50 hover:shadow-xl transition-all group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">100%</div>
                  <p className="text-slate-600 font-medium">Progress</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Action Buttons */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={resetSession}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all px-8 py-4 text-base font-semibold rounded-xl"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Practice Again
              </Button>
              
              <Link href="/library">
                <Button variant="outline" className="px-8 py-4 text-base font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Library
                </Button>
              </Link>
              
              <Button variant="outline" className="px-8 py-4 text-base font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200">
                <Share2 className="mr-2 h-5 w-5" />
                Share Progress
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
      
        {/* Session Header */}
        {currentSession && (
          <section className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-b border-purple-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-purple-700 uppercase tracking-wide">Practice Session</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{currentSession.jobTitle}</h2>
                <p className="text-slate-600 font-medium">{currentSession.company}</p>
              </div>
            </div>
          </section>
        )}

        {/* Header */}
        <div className="border-b border-slate-200/50 bg-white/95 backdrop-blur-xl sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-6">
                <Link href="/library">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover:bg-purple-50 rounded-xl font-medium">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Library
                  </Button>
                </Link>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-full">
                    {currentIndex + 1} of {flashcards.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-40 h-3 bg-slate-200" />
                    <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">
                  <Clock className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{formatTime(timeElapsed)}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-1.5 hover:bg-purple-100 rounded-lg"
                  >
                    {isTimerRunning ? <Pause className="h-3 w-3 text-purple-600" /> : <Play className="h-3 w-3 text-purple-600" />}
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-slate-100 rounded-xl"
                >
                  <Settings className="h-4 w-4 text-slate-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Card Type and Difficulty */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200 px-4 py-2 rounded-full font-semibold">
                {currentCard.type}
              </Badge>
              <Badge className={`${getDifficultyColor(currentCard.difficulty)} px-4 py-2 rounded-full font-semibold`}>
                {currentCard.difficulty}
              </Badge>
            </div>

            {/* Flashcard */}
            <div className="perspective-1000 mb-12">
              <div 
                className={`relative w-full h-96 sm:h-[500px] transform-style-preserve-3d transition-transform duration-700 cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={flipCard}
              >
                {/* Front of card (Question) */}
                <Card className="absolute inset-0 backface-hidden border-0 shadow-2xl shadow-slate-900/10 hover:shadow-3xl transition-all bg-white rounded-3xl border border-slate-200/50">
                  <CardContent className="p-8 sm:p-12 h-full flex flex-col justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-relaxed max-w-3xl mx-auto">
                        {currentCard.question}
                      </h2>
                      <div className="flex items-center justify-center gap-2 text-slate-500">
                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                        <p className="text-sm font-medium">Click to reveal answer</p>
                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                      </div>
                    </div>
              </CardContent>
            </Card>

                {/* Back of card (Answer) */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 border-0 shadow-2xl shadow-slate-900/10 bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-3xl border border-slate-200/50">
                  <CardContent className="p-8 sm:p-12 h-full overflow-y-auto">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="prose prose-sm sm:prose max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-base">
                          {currentCard.answer}
                        </pre>
                      </div>
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
                className="px-8 py-4 rounded-xl border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200 font-semibold disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous
              </Button>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={flipCard}
                  className="px-6 py-4 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Flip Card
                </Button>
              </div>

              <Button
                onClick={goToNext}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all px-8 py-4 rounded-xl font-semibold"
              >
                {currentIndex === flashcards.length - 1 ? 'Complete Session' : 'Next Question'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-600">
                  <kbd className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs font-semibold">Space</kbd>
                  <span className="text-sm font-medium">Flip</span>
                </div>
                <div className="w-1 h-4 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-2 text-slate-600">
                  <kbd className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs font-semibold">←</kbd>
                  <span className="text-sm font-medium">Previous</span>
                </div>
                <div className="w-1 h-4 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-2 text-slate-600">
                  <kbd className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs font-semibold">→</kbd>
                  <span className="text-sm font-medium">Next</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}