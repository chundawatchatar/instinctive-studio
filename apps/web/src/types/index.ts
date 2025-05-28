export interface SearchFilters {
  [key: string]: string | string[] | number | boolean
}

export interface FacetOption {
  value: string
  count: number
  label: string
}

export interface Facet {
  key: string
  label: string
  type: 'checkbox' | 'select' | 'range'
  options: FacetOption[]
}

export interface SearchResult {
  _id: string
  title: string
  description: string
  price: number
  location: string
  categoryId: string
  attributes: Record<string, any>
  createdAt: string
}

export interface SearchResponse {
  results: SearchResult[]
  facets: Facet[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
