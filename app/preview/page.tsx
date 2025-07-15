"use client"

import { useState } from "react"
import { Plus, Search, Calendar, Building, User, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sampleInterviews = [
  {
    _id: "1",
    company: "Google",
    position: "Software Engineer",
    date: "2024-01-15",
    time: "10:00",
    location: "Google Campus, Mountain View",
    type: "onsite" as const,
    status: "scheduled" as const,
    contactPerson: "Sarah Johnson",
    contactEmail: "sarah.johnson@google.com",
    notes: "Technical interview focusing on algorithms and system design",
  },
  {
    _id: "2",
    company: "Microsoft",
    position: "Frontend Developer",
    date: "2024-01-20",
    time: "14:30",
    location: "Microsoft Teams",
    type: "video" as const,
    status: "completed" as const,
    contactPerson: "Mike Chen",
    contactEmail: "mike.chen@microsoft.com",
    notes: "Great discussion about React and TypeScript. Positive feedback received.",
  },
  {
    _id: "3",
    company: "Apple",
    position: "iOS Developer",
    date: "2024-01-25",
    time: "09:00",
    location: "Phone Interview",
    type: "phone" as const,
    status: "scheduled" as const,
    contactPerson: "Lisa Wang",
    contactEmail: "lisa.wang@apple.com",
    notes: "Initial screening call with HR",
  },
  {
    _id: "4",
    company: "Netflix",
    position: "Full Stack Engineer",
    date: "2024-01-18",
    time: "16:00",
    location: "Zoom Meeting",
    type: "video" as const,
    status: "cancelled" as const,
    contactPerson: "David Rodriguez",
    contactEmail: "david.rodriguez@netflix.com",
    notes: "Interview cancelled due to scheduling conflict",
  },
  {
    _id: "5",
    company: "Amazon",
    position: "Backend Developer",
    date: "2024-02-01",
    time: "11:00",
    location: "Amazon Office, Seattle",
    type: "onsite" as const,
    status: "scheduled" as const,
    contactPerson: "Jennifer Kim",
    contactEmail: "jennifer.kim@amazon.com",
    notes: "On-site interview with multiple rounds including system design",
  },
  {
    _id: "6",
    company: "Meta",
    position: "React Developer",
    date: "2024-01-12",
    time: "13:00",
    location: "WhatsApp Video Call",
    type: "video" as const,
    status: "completed" as const,
    contactPerson: "Alex Thompson",
    contactEmail: "alex.thompson@meta.com",
    notes: "Excellent technical discussion. Moving to next round.",
  },
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const typeColors = {
  phone: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  video: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  onsite: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
}

export default function InterviewTrackerPreview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const filteredInterviews = sampleInterviews.filter((interview) => {
    const matchesSearch =
      interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || interview.status === statusFilter
    const matchesType = typeFilter === "all" || interview.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const totalCount = sampleInterviews.length
  const completedCount = sampleInterviews.filter((i) => i.status === "completed").length
  const scheduledCount = sampleInterviews.filter((i) => i.status === "scheduled").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interview Prep Tracker
          </h1>
          <p className="text-muted-foreground text-lg">Organize and track your job interviews with ease</p>
        </div>

        {/* Controls */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search interviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="date-asc">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                      <SelectItem value="date-desc">Date (Newest)</SelectItem>
                      <SelectItem value="company-asc">Company (A-Z)</SelectItem>
                      <SelectItem value="company-desc">Company (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Interview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Interviews</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalCount}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">{completedCount}</p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Scheduled</p>
                  <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{scheduledCount}</p>
                </div>
                <Building className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviews.map((interview, index) => (
            <Card
              key={interview._id}
              className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      {interview.company}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{interview.position}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={statusColors[interview.status]} variant="secondary">
                      {interview.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDate(interview.date)} at {formatTime(interview.time)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{interview.location}</span>
                  </div>

                  {interview.contactPerson && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{interview.contactPerson}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={typeColors[interview.type]} variant="outline">
                    {interview.type}
                  </Badge>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950 bg-transparent"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950 text-red-600 dark:text-red-400 bg-transparent"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {interview.notes && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground line-clamp-2">{interview.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled className="flex items-center gap-1 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
          </div>

          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Demo Form Preview */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Add New Interview Form Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company *</label>
                <Input placeholder="e.g. Google, Microsoft" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Position *</label>
                <Input placeholder="e.g. Software Engineer" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date *</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time *</label>
                <Input type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input placeholder="e.g. Zoom, Office address, Phone" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Type *</label>
                <Select defaultValue="video">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status *</label>
                <Select defaultValue="scheduled">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Create Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
