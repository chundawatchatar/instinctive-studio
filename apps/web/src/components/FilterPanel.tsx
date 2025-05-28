'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { Facet, SearchFilters } from '@/types'

interface FilterPanelProps {
  facets: Facet[]
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export default function FilterPanel({ facets, filters, onFiltersChange }: FilterPanelProps) {
  const [expandedFacets, setExpandedFacets] = useState<Set<string>>(new Set())

  const toggleFacet = (facetKey: string) => {
    const newExpanded = new Set(expandedFacets)
    if (newExpanded.has(facetKey)) {
      newExpanded.delete(facetKey)
    } else {
      newExpanded.add(facetKey)
    }
    setExpandedFacets(newExpanded)
  }

  const handleFilterChange = (facetKey: string, value: string, checked: boolean) => {
    const newFilters = { ...filters }
    
    if (checked) {
      // Add filter
      if (Array.isArray(newFilters[facetKey])) {
        newFilters[facetKey] = [...(newFilters[facetKey] as string[]), value]
      } else {
        newFilters[facetKey] = [value]
      }
    } else {
      // Remove filter
      if (Array.isArray(newFilters[facetKey])) {
        const currentValues = newFilters[facetKey] as string[]
        newFilters[facetKey] = currentValues.filter(v => v !== value)
        if ((newFilters[facetKey] as string[]).length === 0) {
          delete newFilters[facetKey]
        }
      } else {
        delete newFilters[facetKey]
      }
    }
    
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  if (facets.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {facets.map((facet) => (
          <div key={facet.key} className="border-b border-gray-100 pb-4 last:border-b-0">
            <button
              onClick={() => toggleFacet(facet.key)}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <span className="font-medium text-gray-700">{facet.label}</span>
              {expandedFacets.has(facet.key) ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {expandedFacets.has(facet.key) && (
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {facet.options.map((option) => {
                  const isChecked = Array.isArray(filters[facet.key]) 
                    ? (filters[facet.key] as string[]).includes(option.value)
                    : filters[facet.key] === option.value
                  
                  return (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleFilterChange(facet.key, option.value, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">
                        {option.label} ({option.count})
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}