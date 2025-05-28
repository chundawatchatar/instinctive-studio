'use client'

import { SearchResult } from '@/types'
import { MapPin, IndianRupee, Search } from 'lucide-react'

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
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-5 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No results found</p>
          <p className="text-sm">Try adjusting your search terms or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Found {total.toLocaleString()} results
      </div>
      
      {results.map((result) => (
        <div key={result._id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {result.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {result.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <IndianRupee className="h-4 w-4" />
                {result.price.toLocaleString()}
              </div>
              
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="h-4 w-4" />
                {result.location}
              </div>
            </div>
            
            <div className="text-xs text-gray-400">
              {new Date(result.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          {Object.keys(result.attributes).length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.attributes).slice(0, 4).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                  >
                    {key}: {String(value)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}