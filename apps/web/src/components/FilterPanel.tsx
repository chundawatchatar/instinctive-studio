'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:text-primary/80"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {facets.map((facet) => (
            <Collapsible
              key={facet.key}
              open={expandedFacets.has(facet.key)}
              onOpenChange={() => toggleFacet(facet.key)}
              className="border-b border-border pb-4 last:border-b-0"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-between p-2 font-medium hover:bg-muted/50"
                >
                  <span>{facet.label}</span>
                  {expandedFacets.has(facet.key) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2">
                <ScrollArea className="h-48">
                  <div className="space-y-2 pr-3">
                    {facet.options.map((option) => {
                      const isChecked = Array.isArray(filters[facet.key]) 
                        ? (filters[facet.key] as string[]).includes(option.value)
                        : filters[facet.key] === option.value
                      
                      return (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${facet.key}-${option.value}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => 
                              handleFilterChange(facet.key, option.value, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`${facet.key}-${option.value}`}
                            className="text-sm text-muted-foreground cursor-pointer flex-1"
                          >
                            {option.label} ({option.count})
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}