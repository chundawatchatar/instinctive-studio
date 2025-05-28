"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  siblingCount = 1,
}: PaginationProps) {

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (showFirstLast && currentPage > siblingCount + 1) {
      pages.push(1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    if (showFirstLast && leftSibling > 2) {
      pages.push("...");
    }

    for (let page = leftSibling; page <= rightSibling; page++) {
      pages.push(page);
    }

    if (showFirstLast && rightSibling < totalPages - 1) {
      pages.push("...");
    }

    if (showFirstLast && totalPages > rightSibling) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pages = generatePageNumbers();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className="h-9 w-9 p-0 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="sm"
              disabled
              className="h-9 w-9 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            variant={isCurrentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(pageNumber)}
            className="h-9 w-9 p-0  cursor-pointer"
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="h-9 w-9 p-0  cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
