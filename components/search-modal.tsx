"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Book, FileText, Mic, Video, Gift } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "./ui/badge"
import { getAllLessons } from "@/lib/services/lessons-service"
import { formatDate } from "@/lib/utils"
import { getAllBooks } from "@/lib/services/books-service"
import { getAllFatwas } from "@/lib/services/fatwas-service"
type SearchType = 'lessons' | 'books' | 'fatwas' | 'sermons' | 'lectures' | 'benefits'
type SearchResult = {
  id: string
  title: string
  description?: string
  type: SearchType
  category?: string
  date?: string
}

export default function SearchModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<SearchType>("lessons")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Reset search when modal opens
    if (open) {
      setSearchQuery(undefined)
      setActiveTab('lessons')
    }
  }, [open])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      console.log(`Debounced search query: ${searchQuery}`)
      
      performSearch()
    }, 300)
    
    return () => clearTimeout(debounceTimeout)
  }, [searchQuery, activeTab])

  const performSearch = async () => {
    // This would be replaced with actual API calls
    setIsLoading(true)
    switch (activeTab) {
      case 'lessons':
        const response = await getAllLessons(1, searchQuery, '')
        const lessons = response.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          type: 'lessons' as SearchType,
          category: lesson.category,
          date: formatDate(lesson.published_date)
        }))
        console.log('Search results:', lessons)
        setResults(lessons)
        break
      case 'books':
        const {books}= await getAllBooks(1, searchQuery, '')
        const result = books.map(book => ({
          id: book.id,
          title: book.title,
          description: book.description,
          type: 'books' as SearchType,
          category: book.category,
          date: formatDate(book.published_date)
        }))
        console.log('Search results:', books)
        setResults(result)
        break
      case 'fatwas':
        const respose = await getAllFatwas(1, searchQuery, '')
        const fatwas = respose.fatwas.map(fatwa => ({
          id: fatwa.id,
          title: fatwa.title,
          type: 'fatwas' as SearchType,
          category: fatwa.category,
          date: formatDate(fatwa.published_date)
        }))
        console.log('Search results:', fatwas)
        setResults(fatwas)
        break
      case 'lectures':
        const lectures = await getAllLessons(1, searchQuery, 'lectures')
        const lectureResults = lectures.lessons.map(lecture => ({
          id: lecture.id,
          title: lecture.title,
          description: lecture.description,
          type: 'lectures' as SearchType,
          category: lecture.category,
          date: formatDate(lecture.published_date)
        }))
        console.log('Search results:', lectureResults)
        setResults(lectureResults)
        break
      case 'benefits':
        const benefits = await getAllLessons(1, searchQuery, 'benefits')
        const benefitResults = benefits.lessons.map(benefit => ({
          id: benefit.id,
          title: benefit.title,
          description: benefit.description,
          type: 'benefits' as SearchType,
          category: benefit.category,
          date: formatDate(benefit.published_date)
        }))
        console.log('Search results:', benefitResults)
        setResults(benefitResults)
        break
      default:
        setResults([])
    }
    setIsLoading(false)
  }

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the appropriate page based on result type
    switch (result.type) {
      case 'lessons':
        router.push(`/lessons/${result.id}`)
        break
      case 'books':
        router.push(`/books/${result.id}`)
        break
      case 'fatwas':
        router.push(`/fatwas/${result.id}`)
        break
      case 'lectures':
        router.push(`/lectures/${result.id}`)
        break
      case 'benefits':
        router.push(`/benefits/${result.id}`)
        break
    }
    onOpenChange(false)
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'lesson':
        return <FileText className="h-4 w-4" />
      case 'book':
        return <Book className="h-4 w-4" />
      case 'fatwa':
        return <FileText className="h-4 w-4" />
      case 'sermon':
        return <Mic className="h-4 w-4" />
      case 'lecture':
        return <Video className="h-4 w-4" />
      case 'benefit':
        return <Gift className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[90vw]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">البحث في المكتبة</DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full mt-4">
          <Input 
            type="search" 
            placeholder="ابحث في المكتبة..." 
            className="pl-10 pr-4 py-1 h-10 text-lg w-full" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        <Tabs value={activeTab} defaultValue="lessons" onValueChange={(value) => {
          setActiveTab(value as SearchType)
          console.log(`Active tab changed to: ${value}`);
          
        }} className="w-full mt-4">
          <TabsList className="w-full flex justify-between" dir="rtl">
            <TabsTrigger value="lessons" className="flex-1">الدروس</TabsTrigger>
            <TabsTrigger value="books" className="flex-1">الكتب</TabsTrigger>
            <TabsTrigger value="fatwas" className="flex-1">الفتاوى</TabsTrigger>
            <TabsTrigger value="lectures" className="flex-1">المحاضرات</TabsTrigger>
            <TabsTrigger value="benefits" className="flex-1">الفوائد</TabsTrigger>
          </TabsList>
          
          {/* Results content */}
          <div className="mt-6 overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : searchQuery && searchQuery.length < 2 ? (
              <div className="text-center text-gray-500 py-10">
                اكتب كلمة للبحث (على الأقل حرفين)
              </div>
            ) : results.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                لا توجد نتائج للبحث
              </div>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {results.map((result) => (
                  <div 
                    key={`${result.type}-${result.id}`}
                    className="flex border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="mr-2 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            className={`
                              ${result.type === 'lessons' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''} 
                              ${result.type === 'books' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : ''}
                              ${result.type === 'fatwas' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                              ${result.type === 'sermons' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : ''}
                              ${result.type === 'lectures' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                              ${result.type === 'benefits' ? 'bg-teal-100 text-teal-800 hover:bg-teal-100' : ''}
                            `}
                          >
                            <span className="flex items-center gap-1">
                              {getIconForType(result.type)}
                              {result.type === 'lessons' && 'درس'}
                              {result.type === 'books' && 'كتاب'}
                              {result.type === 'fatwas' && 'فتوى'}
                              {result.type === 'sermons' && 'خطبة'}
                              {result.type === 'lectures' && 'محاضرة'}
                              {result.type === 'benefits' && 'فائدة'}
                            </span>
                          </Badge>
                          {result.category && (
                            <span className="text-xs text-gray-500">{result.category}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-medium">{result.title}</h3>
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{result.description}</p>
                        )}
                      </div>
                      {result.date && (
                        <div className="text-xs text-gray-500 mt-2">{result.date}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}