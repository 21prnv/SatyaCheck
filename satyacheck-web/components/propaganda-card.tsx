import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AlertTriangle, Clock } from "lucide-react"

interface PropagandaNewsProps {
  news: {
    id: number
    title: string
    description: string
    source: string
    date: string
    category: string
  }
}

export function PropagandaCard({ news }: PropagandaNewsProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-blue-100 h-full flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="bg-white/20 text-white border-none">
            {news.category}
          </Badge>
          <AlertTriangle className="h-5 w-5 text-yellow-300" />
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-grow">
        <h3 className="font-bold text-lg text-blue-900 mb-3">{news.title}</h3>
        <p className="text-blue-700 text-sm">{news.description}</p>
      </CardContent>

      <CardFooter className="bg-blue-50 p-4 text-xs text-blue-600 flex justify-between items-center">
        <span>{news.source}</span>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{news.date}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

