'use client'

import { SearchResult } from '@/types'
import { MapPin, IndianRupee, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface SearchResultsProps {
  results: SearchResult[]
  loading: boolean
  total: number
}

export default function SearchResults({ results, loading, total }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm">Try adjusting your search terms or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Found {total.toLocaleString()} results
      </div>
      
      {results.map((result) => (
        <Card key={result._id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">
              {result.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {result.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <IndianRupee className="h-4 w-4" />
                  {result.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  {result.location}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(result.createdAt).toLocaleDateString()}
              </div>
            </div>

            {Object.keys(result.attributes).length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(result.attributes).slice(0, 4).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}: {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}