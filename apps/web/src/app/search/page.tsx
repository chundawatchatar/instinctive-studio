"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import SearchResults from "@/components/SearchResults";
import CategorySelector from "@/components/CategorySelector";
import { SearchResponse, SearchFilters } from "@/types";
import Pagination from "@/components/Pagination";

const PAGINATION_LIMIT = 10;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const filtersParam = searchParams.get("filters") || "{}";
    const page = parseInt(searchParams.get("page") || "1", 10);

    setSearchQuery(q);
    setSelectedCategory(category);
    setCurrentPage(page);

    try {
      const parsedFilters = JSON.parse(decodeURIComponent(filtersParam));
      setFilters(parsedFilters);
    } catch (e) {
      setFilters({});
    }

    if (q || category || filtersParam !== "{}" || page !== 1) {
      performSearch(
        q,
        category,
        JSON.parse(decodeURIComponent(filtersParam)),
        page
      );
    }
  }, [searchParams]);

  const updateURL = useCallback(
    (
      query: string,
      category: string,
      newFilters: SearchFilters,
      page: number
    ) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category) params.set("category", category);
      if (Object.keys(newFilters).length > 0) {
        params.set("filters", encodeURIComponent(JSON.stringify(newFilters)));
      }
      if (page > 1) {
        params.set("page", String(page));
      }

      const url = `/search${params.toString() ? `?${params.toString()}` : ""}`;
      router.push(url, { scroll: false });
    },
    [router]
  );

  const performSearch = async (
    query: string = searchQuery,
    category: string = selectedCategory,
    searchFilters: SearchFilters = filters,
    page: number = currentPage
  ) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category) params.set("category", category);
      if (Object.keys(searchFilters).length > 0) {
        params.set(
          "filters",
          encodeURIComponent(JSON.stringify(searchFilters))
        );
      }
      params.set("page", String(page));
      params.set("limit", String(PAGINATION_LIMIT));

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/v1/search?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data: SearchResponse = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  const handleSearch = () => {
    resetPagination();
    updateURL(searchQuery, selectedCategory, filters, 1);
    performSearch(searchQuery, selectedCategory, filters, 1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newFilters = {};
    setFilters(newFilters);
    resetPagination();
    updateURL(searchQuery, category, newFilters, 1);
    performSearch(searchQuery, category, newFilters, 1);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    resetPagination();
    updateURL(searchQuery, selectedCategory, newFilters, 1);
    performSearch(searchQuery, selectedCategory, newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(searchQuery, selectedCategory, filters, page);
    performSearch(searchQuery, selectedCategory, filters, page);
  };

  const totalResults = searchResults?.total || 0;
  const totalPages = Math.ceil(totalResults / PAGINATION_LIMIT);

  return (
    <div className="h-screen flex flex-col">
      <nav className="p-6 text-center">
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
      </nav>

      {!searchResults && !loading && (
        <div className="text-center">
          <div className="text-gray-500">
            <p className="text-lg mb-2">
              Start searching to discover products and suppliers
            </p>
            <p className="text-sm">
              Use the search bar above to find what you're looking for
            </p>
          </div>
        </div>
      )}

      {(searchResults || loading) && (
        <div className="flex-1 flex">
          <aside className="w-64 p-4">
            <div className="lg:col-span-1">
              {searchResults && searchResults.facets.length > 0 && (
                <FilterPanel
                  facets={searchResults.facets}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              )}
            </div>
          </aside>

          <main className="flex-1 p-4 overflow-y-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="lg:col-span-3">
              <SearchResults
                results={searchResults?.results || []}
                loading={loading}
                total={totalResults}
              />
            </div>

            {totalPages > 1 && (
              <div className="p-4 text-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  siblingCount={2}
                  showFirstLast={true}
                />
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
