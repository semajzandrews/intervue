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
      case "completed": return "bg-green-100 text-green-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "archived": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
      
      {/* Header Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Your Interview Library
              </h1>
              <p className="text-lg text-gray-600">
                Access your saved sessions, resume practice, and track your progress
              </p>
            </div>
            
            <Link href="/generate">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all group">
                <Plus className="mr-2 h-4 w-4" />
                New Session
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className="px-4 py-3"
              >
                All ({sessions.length})
              </Button>
              <Button
                variant={selectedFilter === "completed" ? "default" : "outline"}
                onClick={() => setSelectedFilter("completed")}
                className="px-4 py-3"
              >
                Completed ({sessions.filter(s => s.status === "completed").length})
              </Button>
              <Button
                variant={selectedFilter === "in-progress" ? "default" : "outline"}
                onClick={() => setSelectedFilter("in-progress")}
                className="px-4 py-3"
              >
                In Progress ({sessions.filter(s => s.status === "in-progress").length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSessions.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "No sessions found" : "No saved sessions yet"}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? "Try adjusting your search terms or filters" 
                  : "Start by generating interview questions for your next job application"
                }
              </p>
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Session
                </Button>
              </Link>
            </div>
          ) : (
            /* Sessions Grid */
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSessions.map((session) => (
                <Card key={session.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                          {session.jobTitle}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{session.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(session.status)} border-0 capitalize`}>
                        {session.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{session.questionCount} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(session.dateCreated)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {session.questionTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-sm hover:shadow-lg transition-all group"
                        onClick={() => handleResume(session.id)}
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Resume
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-2 hover:bg-gray-50"
                        onClick={() => handleEdit(session.id)}
                        title="Edit session"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-2 hover:bg-gray-50"
                        onClick={() => handleDownload(session)}
                        title="Download questions"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        onClick={() => handleDelete(session.id)}
                        title="Delete session"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {sessions.reduce((sum, session) => sum + session.questionCount, 0)}
                  </div>
                  <p className="text-gray-600">Total Questions Generated</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {sessions.filter(s => s.status === "completed").length}
                  </div>
                  <p className="text-gray-600">Completed Sessions</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {Math.round(sessions.reduce((sum, session) => sum + session.questionCount, 0) * 2.5)}
                  </div>
                  <p className="text-gray-600">Hours of Practice</p>
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