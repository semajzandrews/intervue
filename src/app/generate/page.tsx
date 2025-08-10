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
import { Sparkles, Loader2, HelpCircle, FileText } from "lucide-react"

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

  const handleInsertDemo = () => {
    setJobDescription(demoJobDescription)
  }

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return
    
    setIsGenerating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setQuestions(mockQuestions)
    setCurrentQuestionIndex(0)
    setIsGenerating(false)
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))
  }

  const getQuestionCountValue = () => {
    return questionCount === "custom" ? parseInt(customCount) || 10 : parseInt(questionCount)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navigation />
      
      <div className="main-content">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">AI-Powered Interview Preparation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
              Generate Interview Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Paste your job description or URL to instantly prep with tailored interview questions and expert answers.
            </p>
          </div>

          {/* Usage Banner */}
          <div className="mb-12">
            <UsageBanner 
              used={user?.usage.questionsUsed || 0} 
              limit={user?.usage.questionsLimit || 5} 
              onUpgradeClick={() => router.push('/pricing')} 
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="job-description" className="text-xl font-bold text-gray-900 block mb-2">
                        Job Description
                      </Label>
                      <p className="text-sm text-gray-500">Paste your job description or job post URL below</p>
                    </div>
                    <Button
                      onClick={handleInsertDemo}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-lg shadow-sm"
                    >
                      <FileText className="h-4 w-4" />
                      Insert Demo
                    </Button>
                  </div>
                  
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here, or enter a URL to the job posting..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[140px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-gray-700 placeholder:text-gray-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Options Panel */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⚙</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Generation Options</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Question Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Question Type</Label>
                    <Select value={questionType} onValueChange={setQuestionType}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-12 shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-xl border-gray-100">
                        <SelectItem value="behavioral" className="rounded-md">Behavioral</SelectItem>
                        <SelectItem value="technical" className="rounded-md">Technical</SelectItem>
                        <SelectItem value="mixed" className="rounded-md">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Question Count */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Question Count</Label>
                    <Select value={questionCount} onValueChange={setQuestionCount}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-12 shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-xl border-gray-100">
                        <SelectItem value="5" className="rounded-md">5 Questions</SelectItem>
                        <SelectItem value="10" className="rounded-md">10 Questions</SelectItem>
                        <SelectItem value="20" className="rounded-md">20 Questions</SelectItem>
                        <SelectItem value="custom" className="rounded-md">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {questionCount === "custom" && (
                      <Input
                        type="number"
                        placeholder="Enter number"
                        value={customCount}
                        onChange={(e) => setCustomCount(e.target.value)}
                        className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-12 shadow-sm"
                        min="1"
                        max="50"
                      />
                    )}
                  </div>

                  {/* YOLO Mode */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">YOLO Mode</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="rounded-lg shadow-xl">
                            <p>Unfiltered AI generation with creative questions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center h-12">
                      <Switch
                        checked={yoloMode}
                        onCheckedChange={setYoloMode}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!jobDescription.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl flex items-center justify-center gap-3 transform hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6" />
                    Generate Questions
                  </>
                )}
              </Button>
            </div>

            {/* Generated Output Area */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-fit backdrop-blur-sm sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📝</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Preview</h3>
                </div>
                {questions.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="text-sm font-semibold text-green-800">
                        {questions.length} questions generated
                      </div>
                      <div className="text-xs text-green-600 px-2 py-1 bg-green-100 rounded-full">
                        {questionType} type
                      </div>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {questions.map((q, index) => (
                        <div 
                          key={q.id}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 ${
                            index === currentQuestionIndex 
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-lg' 
                              : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'
                          }`}
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === currentQuestionIndex 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div className={`text-xs font-semibold uppercase tracking-wide ${
                              index === currentQuestionIndex 
                                ? 'text-blue-600' 
                                : 'text-gray-500'
                            }`}>
                              Question {index + 1}
                            </div>
                          </div>
                          <div className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                            {q.question}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <div className="w-16 h-16 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">Ready to generate</p>
                    <p className="text-sm text-gray-500 mt-1">Your questions will appear here</p>
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

      </div>
    </ProtectedRoute>
  )
} 