"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Plus,
  Calendar,
  Building2,
  MapPin,
  Clock,
  Play,
  Edit3,
  Download,
  Trash2,
  BookOpen,
  Briefcase,
  Target,
  ArrowRight,
  FileText
} from "lucide-react"

// Mock data for saved sessions
const mockSessions = [
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    dateCreated: "2024-01-15",
    questionCount: 25,
    questionTypes: ["Technical", "Behavioral"],
    status: "completed",
    lastAccessed: "2024-01-16"
  },
  {
    id: "2", 
    jobTitle: "Product Manager",
    company: "Meta",
    location: "Menlo Park, CA",
    dateCreated: "2024-01-12",
    questionCount: 18,
    questionTypes: ["Behavioral", "Strategy"],
    status: "in-progress",
    lastAccessed: "2024-01-14"
  },
  {
    id: "3",
    jobTitle: "Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA", 
    dateCreated: "2024-01-10",
    questionCount: 22,
    questionTypes: ["Technical", "Analytical"],
    status: "completed",
    lastAccessed: "2024-01-11"
  },
  {
    id: "4",
    jobTitle: "UX Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    dateCreated: "2024-01-08",
    questionCount: 15,
    questionTypes: ["Design", "Behavioral"],
    status: "completed", 
    lastAccessed: "2024-01-09"
  },
  {
    id: "5",
    jobTitle: "DevOps Engineer", 
    company: "Stripe",
    location: "San Francisco, CA",
    dateCreated: "2024-01-05",
    questionCount: 20,
    questionTypes: ["Technical", "Systems"],
    status: "archived",
    lastAccessed: "2024-01-06"
  }
]

export default function LibraryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sessions, setSessions] = useState(mockSessions)

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === "all" || session.status === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200"
      case "in-progress": return "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200"
      case "archived": return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
      default: return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleResume = (sessionId: string) => {
    // Navigate to quiz mode with session ID
    router.push(`/quiz-mode?sessionId=${sessionId}`)
  }

  const handleEdit = (sessionId: string) => {
    // Navigate to generate page with session data for editing
    router.push(`/generate?editId=${sessionId}`)
  }

  const handleDownload = (session: typeof mockSessions[0]) => {
    // Generate and download session data as JSON
    const dataStr = JSON.stringify({
      jobTitle: session.jobTitle,
      company: session.company,
      location: session.location,
      dateCreated: session.dateCreated,
      questionCount: session.questionCount,
      questionTypes: session.questionTypes,
      status: session.status,
      // In real app, would include actual questions
      questions: Array.from({ length: session.questionCount }, (_, i) => ({
        id: i + 1,
        question: `Sample question ${i + 1} for ${session.jobTitle} at ${session.company}`,
        type: session.questionTypes[i % session.questionTypes.length]
      }))
    }, null, 2)
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${session.company}-${session.jobTitle.replace(/\s+/g, '_')}-questions.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDelete = (sessionId: string) => {
    // Show confirmation and delete session
    if (window.confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      setSessions(prev => prev.filter(session => session.id !== sessionId))
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
      
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/50">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl transform -translate-x-48 -translate-y-48" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-400/10 to-purple-400/10 rounded-full blur-3xl transform translate-x-48 translate-y-48" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50/50 border border-purple-200/50 shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">Interview Library</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-slate-900">Your</span>{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    practice
                  </span>
                  <br />
                  <span className="text-slate-900">sessions</span>
                </h1>
                
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Access your saved sessions, resume practice, and track your interview preparation progress. 
                  All your hard work in one place.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/generate">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all group px-8 py-4 text-base font-semibold rounded-xl">
                    <Plus className="mr-2 h-5 w-5" />
                    New Session
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-slate-200/50 p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by job title or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-colors text-slate-700 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>
                
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("all")}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                      selectedFilter === "all" 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg" 
                        : "border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200"
                    }`}
                  >
                    All ({sessions.length})
                  </Button>
                  <Button
                    variant={selectedFilter === "completed" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("completed")}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                      selectedFilter === "completed" 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg" 
                        : "border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200"
                    }`}
                  >
                    Completed ({sessions.filter(s => s.status === "completed").length})
                  </Button>
                  <Button
                    variant={selectedFilter === "in-progress" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("in-progress")}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                      selectedFilter === "in-progress" 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg" 
                        : "border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200"
                    }`}
                  >
                    In Progress ({sessions.filter(s => s.status === "in-progress").length})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sessions Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSessions.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {searchQuery ? "No sessions found" : "No saved sessions yet"}
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                {searchQuery 
                  ? "Try adjusting your search terms or filters to find your sessions" 
                  : "Start by generating interview questions for your next job application and build your practice library"
                }
              </p>
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all px-8 py-4 text-base font-semibold rounded-xl">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            /* Sessions Grid */
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredSessions.map((session) => (
                <Card key={session.id} className="border-0 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 group bg-white rounded-2xl overflow-hidden border border-slate-200/50">
                  <CardHeader className="pb-6 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                          {session.jobTitle}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-slate-700">
                            <div className="w-5 h-5 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                              <Building2 className="h-3 w-3 text-purple-600" />
                            </div>
                            <span className="font-semibold">{session.company}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-5 h-5 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                              <MapPin className="h-3 w-3 text-slate-600" />
                            </div>
                            <span className="text-sm">{session.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(session.status)} border-0 capitalize px-3 py-1.5 text-xs font-semibold rounded-full`}>
                        {session.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-600 bg-slate-50/50 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{session.questionCount} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-500" />
                        <span className="font-medium">{formatDate(session.dateCreated)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 px-6 pb-6">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {session.questionTypes.map((type, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-700 font-medium px-3 py-1 rounded-full"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all group py-3 font-semibold rounded-xl"
                        onClick={() => handleResume(session.id)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Resume Practice
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 p-3 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors rounded-xl border-slate-200"
                          onClick={() => handleEdit(session.id)}
                          title="Edit session"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 p-3 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors rounded-xl border-slate-200"
                          onClick={() => handleDownload(session)}
                          title="Download questions"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 p-3 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors rounded-xl border-slate-200"
                          onClick={() => handleDelete(session.id)}
                          title="Delete session"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats Section */}
      {filteredSessions.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Progress</h2>
              <p className="text-xl text-slate-600">Track your interview preparation journey</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg shadow-slate-900/5 text-center bg-white rounded-2xl border border-slate-200/50 hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-3">
                    {sessions.reduce((sum, session) => sum + session.questionCount, 0)}
                  </div>
                  <p className="text-slate-600 font-medium">Total Questions Generated</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-900/5 text-center bg-white rounded-2xl border border-slate-200/50 hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-3">
                    {sessions.filter(s => s.status === "completed").length}
                  </div>
                  <p className="text-slate-600 font-medium">Completed Sessions</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-900/5 text-center bg-white rounded-2xl border border-slate-200/50 hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-3">
                    {Math.round(sessions.reduce((sum, session) => sum + session.questionCount, 0) * 2.5)}
                  </div>
                  <p className="text-slate-600 font-medium">Hours of Practice</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
      </div>
    </ProtectedRoute>
  )
}