'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import SearchResults from '@/components/SearchResults'
import CategorySelector from '@/components/CategorySelector'
import { SearchResponse, SearchFilters } from '@/types'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const filtersParam = searchParams.get('filters') || '{}'
    
    setSearchQuery(q)
    setSelectedCategory(category)
    
    try {
      const parsedFilters = JSON.parse(decodeURIComponent(filtersParam))
      setFilters(parsedFilters)
    } catch (e) {
      setFilters({})
    }
    
    // Perform search if there are initial params
    if (q || category || filtersParam !== '{}') {
      performSearch(q, category, JSON.parse(decodeURIComponent(filtersParam)))
    }
  }, [searchParams])

  const updateURL = useCallback((query: string, category: string, newFilters: SearchFilters) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('category', category)
    if (Object.keys(newFilters).length > 0) {
      params.set('filters', encodeURIComponent(JSON.stringify(newFilters)))
    }
    
    const url = `/search${params.toString() ? `?${params.toString()}` : ''}`
    router.push(url, { scroll: false })
  }, [router])

  const performSearch = async (query: string = searchQuery, category: string = selectedCategory, searchFilters: SearchFilters = filters) => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (category) params.set('category', category)
      if (Object.keys(searchFilters).length > 0) {
        params.set('filters', encodeURIComponent(JSON.stringify(searchFilters)))
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/search?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const data = await response.json()
      setSearchResults(data)
    } catch (err) {
      setError('Failed to search. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    updateURL(searchQuery, selectedCategory, filters)
    performSearch()
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const newFilters = {} // Clear filters when changing category
    setFilters(newFilters)
    updateURL(searchQuery, category, newFilters)
    performSearch(searchQuery, category, newFilters)
  }

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    updateURL(searchQuery, selectedCategory, newFilters)
    performSearch(searchQuery, selectedCategory, newFilters)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          B2B Marketplace Search
        </h1>
        <div className="flex flex-col items-center gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search for products, suppliers, or services..."
          />
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Results Layout */}
      {(searchResults || loading) && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            {searchResults && searchResults.facets.length > 0 && (
              <FilterPanel
                facets={searchResults.facets}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            )}
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <SearchResults
              results={searchResults?.results || []}
              loading={loading}
              total={searchResults?.total || 0}
            />
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {!searchResults && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg mb-2">Start searching to discover products and suppliers</p>
            <p className="text-sm">Use the search bar above to find what you're looking for</p>
          </div>
        </div>
      )}
    </div>
  )
}