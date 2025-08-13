"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { UsageBanner } from "@/components/usage-banner"
import { QuestionCard } from "@/components/question-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Sparkles, 
  Loader2, 
  HelpCircle, 
  FileText, 
  Zap,
  Target,
  Brain,
  Wand2,
  Settings2,
  Copy,
  Check,
  Download,
  BookOpen,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Globe,
  Clock
} from "lucide-react"

// Mock data for demonstration
const mockQuestions = [
  {
    id: "1",
    question: "Tell me about a time when you had to overcome a significant challenge at work.",
    answer: "Use the STAR method (Situation, Task, Action, Result) to structure your response. Start by describing a specific situation where you faced a meaningful challenge. Explain the task you needed to accomplish, detail the actions you took to address the challenge, and conclude with the positive results you achieved. Focus on challenges that demonstrate problem-solving skills, resilience, and growth.",
    type: "behavioral" as const
  },
  {
    id: "2", 
    question: "How would you optimize a slow-performing database query?",
    answer: "First, analyze the query execution plan to identify bottlenecks. Common optimization techniques include: 1) Adding appropriate indexes on frequently queried columns, 2) Rewriting complex queries to be more efficient, 3) Using query optimization hints, 4) Partitioning large tables, 5) Analyzing and updating table statistics, 6) Consider caching frequently accessed data, and 7) Reviewing the database schema design for normalization issues.",
    type: "technical" as const
  },
  {
    id: "3",
    question: "Why do you want to work for our company?",
    answer: "Research the company thoroughly and connect your career goals with their mission and values. Mention specific aspects that attract you: their innovative products, company culture, growth opportunities, or market position. Explain how your skills align with their needs and how you can contribute to their success. Avoid generic answers and show genuine enthusiasm for the role and organization.",
    type: "mixed" as const
  }
]

const demoJobDescription = `Senior Software Engineer - Frontend Team

We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features, optimizing application performance, and collaborating with cross-functional teams.

Requirements:
- 5+ years of experience with React and TypeScript
- Strong understanding of modern web technologies
- Experience with state management (Redux, Zustand)
- Knowledge of testing frameworks (Jest, React Testing Library)
- Excellent problem-solving skills and attention to detail

Nice to have:
- Experience with Next.js and server-side rendering
- Knowledge of GraphQL and API integration
- Understanding of design systems and component libraries`

export default function GeneratePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [jobDescription, setJobDescription] = useState("")
  const [questionType, setQuestionType] = useState("mixed")
  const [questionCount, setQuestionCount] = useState("10")
  const [customCount, setCustomCount] = useState("")
  const [yoloMode, setYoloMode] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<typeof mockQuestions>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const handleInsertDemo = () => {
    setJobDescription(demoJobDescription)
    validateForm({ jobDescription: demoJobDescription, questionCount, customCount })
  }

  const validateForm = (formData: { jobDescription: string, questionCount: string, customCount: string }) => {
    const newErrors: {[key: string]: string} = {}
    
    // Job description validation
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required"
    } else if (formData.jobDescription.trim().length < 50) {
      newErrors.jobDescription = "Job description should be at least 50 characters"
    } else if (formData.jobDescription.trim().length > 5000) {
      newErrors.jobDescription = "Job description should not exceed 5000 characters"
    }
    
    // Custom count validation
    if (formData.questionCount === "custom") {
      if (!formData.customCount.trim()) {
        newErrors.customCount = "Please enter a number of questions"
      } else {
        const count = parseInt(formData.customCount)
        if (isNaN(count) || count < 1) {
          newErrors.customCount = "Number must be at least 1"
        } else if (count > 50) {
          newErrors.customCount = "Number cannot exceed 50"
        }
      }
    }
    
    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    setIsFormValid(isValid)
    return isValid
  }

  const handleGenerate = async () => {
    const isValid = validateForm({ jobDescription, questionCount, customCount })
    if (!isValid) return
    
    setIsGenerating(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setQuestions(mockQuestions)
      setCurrentQuestionIndex(0)
    } catch {
      setErrors({ general: "Failed to generate questions. Please try again." })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))
  }


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
      
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/50">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transform translate-x-48 -translate-y-48" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50/50 border border-purple-200/50 shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">AI Question Generator</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-slate-900">Generate</span>{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    personalized
                  </span>
                  <br />
                  <span className="text-slate-900">interview questions</span>
                </h1>
                
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Transform any job description into tailored interview questions with our advanced AI. 
                  Practice with confidence and land your dream role.
                </p>
              </div>
              
              {/* Usage Banner */}
              <div className="max-w-2xl mx-auto">
                <UsageBanner 
                  used={user?.usage.questionsUsed || 0} 
                  limit={user?.usage.questionsLimit || 5} 
                  onUpgradeClick={() => router.push('/pricing')} 
                />
              </div>
            </div>
          </div>
        </section>
      
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-slate-200/50 p-8">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                          <FileText className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <Label htmlFor="job-description" className="text-xl font-bold text-slate-900 block">
                            Job Description
                          </Label>
                          <p className="text-sm text-slate-500">Paste your job description or job post URL below</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleInsertDemo}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 rounded-xl shadow-sm font-medium"
                    >
                      <Sparkles className="h-4 w-4" />
                      Try Demo
                    </Button>
                  </div>
                  
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here, or enter a URL to the job posting..."
                    value={jobDescription}
                    onChange={(e) => {
                      setJobDescription(e.target.value)
                      validateForm({ jobDescription: e.target.value, questionCount, customCount })
                    }}
                    className={`min-h-[160px] resize-none focus:ring-purple-500 rounded-xl text-slate-700 placeholder:text-slate-400 shadow-sm transition-colors font-medium ${
                      errors.jobDescription 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-slate-200 focus:border-purple-400'
                    }`}
                  />
                  {errors.jobDescription && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.jobDescription}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Supports job URLs from major platforms
                    </span>
                    <span>{jobDescription.length}/5000 characters</span>
                  </div>
                </div>
              </div>

              {/* Options Panel */}
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-slate-200/50 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                    <Settings2 className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Generation Options</h3>
                    <p className="text-sm text-slate-500">Customize your interview questions</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Question Type */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Question Type
                      </Label>
                      <p className="text-xs text-slate-500">Choose the focus of your questions</p>
                    </div>
                    <Select value={questionType} onValueChange={setQuestionType}>
                      <SelectTrigger className="border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12 shadow-sm font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-xl border-slate-200">
                        <SelectItem value="behavioral" className="rounded-lg">🧠 Behavioral</SelectItem>
                        <SelectItem value="technical" className="rounded-lg">⚡ Technical</SelectItem>
                        <SelectItem value="mixed" className="rounded-lg">🎯 Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Question Count */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Question Count
                      </Label>
                      <p className="text-xs text-slate-500">How many questions to generate</p>
                    </div>
                    <Select value={questionCount} onValueChange={(value) => {
                      setQuestionCount(value)
                      validateForm({ jobDescription, questionCount: value, customCount })
                    }}>
                      <SelectTrigger className="border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12 shadow-sm font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-xl border-slate-200">
                        <SelectItem value="5" className="rounded-lg">5 Questions</SelectItem>
                        <SelectItem value="10" className="rounded-lg">10 Questions</SelectItem>
                        <SelectItem value="20" className="rounded-lg">20 Questions</SelectItem>
                        <SelectItem value="custom" className="rounded-lg">Custom Amount</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {questionCount === "custom" && (
                      <div className="space-y-3">
                        <Input
                          type="number"
                          placeholder="Enter number (1-50)"
                          value={customCount}
                          onChange={(e) => {
                            setCustomCount(e.target.value)
                            validateForm({ jobDescription, questionCount, customCount: e.target.value })
                          }}
                          className={`focus:ring-purple-400 rounded-xl h-12 shadow-sm transition-colors font-medium ${
                            errors.customCount 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-slate-200 focus:border-purple-400'
                          }`}
                          min="1"
                          max="50"
                        />
                        {errors.customCount && (
                          <p className="text-red-600 text-sm flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {errors.customCount}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* YOLO Mode */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Wand2 className="h-4 w-4" />
                          YOLO Mode
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="rounded-xl shadow-xl">
                              <p>Unfiltered AI generation with creative questions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-xs text-slate-500">Enable creative and unexpected questions</p>
                    </div>
                    <div className="flex items-center h-12">
                      <Switch
                        checked={yoloMode}
                        onCheckedChange={setYoloMode}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-violet-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700 font-medium">{errors.general}</p>
                </div>
              )}

              {/* Generate Button */}
              <div className="relative">
                <Button
                  onClick={handleGenerate}
                  disabled={!isFormValid || isGenerating}
                  className={`w-full font-bold py-6 text-lg shadow-lg transition-all duration-300 rounded-2xl flex items-center justify-center gap-3 ${
                    !isFormValid || isGenerating
                      ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl transform hover:scale-[1.02]'
                  } text-white`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-6 w-6 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <Brain className="h-6 w-6" />
                      Generate Questions
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
                
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300 -z-10" />
              </div>
            </div>

            {/* Generated Output Area */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-slate-200/50 p-6 h-fit sticky top-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Preview</h3>
                    <p className="text-sm text-slate-500">Generated questions will appear here</p>
                  </div>
                </div>
                {questions.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/50">
                      <div className="text-sm font-semibold text-slate-800">
                        {questions.length} questions generated
                      </div>
                      <div className="text-xs text-slate-600 px-3 py-1.5 bg-slate-100 rounded-full font-medium">
                        {questionType} type
                      </div>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {questions.map((q, index) => (
                        <div 
                          key={q.id}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                            index === currentQuestionIndex 
                              ? 'bg-gradient-to-r from-slate-50 to-blue-50/50 border-slate-300 shadow-lg' 
                              : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:shadow-md'
                          }`}
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === currentQuestionIndex 
                                ? 'bg-slate-700 text-white' 
                                : 'bg-slate-300 text-slate-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div className={`text-xs font-semibold uppercase tracking-wide ${
                              index === currentQuestionIndex 
                                ? 'text-slate-700' 
                                : 'text-slate-500'
                            }`}>
                              Question {index + 1}
                            </div>
                          </div>
                          <div className="text-sm text-slate-700 line-clamp-2 leading-relaxed font-medium">
                            {q.question}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Brain className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-semibold text-lg">Ready to generate</p>
                    <p className="text-sm text-slate-500 mt-2">Your personalized questions will appear here</p>
                    <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>~3 seconds</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>AI-powered</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>

        {/* Question Display Area */}
        {questions.length > 0 && (
          <div className="mt-12">
            <QuestionCard
              question={questions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={handlePreviousQuestion}
              onNext={handleNextQuestion}
            />
          </div>
        )}
        </main>
      </div>
    </ProtectedRoute>
  )
} 