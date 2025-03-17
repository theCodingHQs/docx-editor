"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useState } from "react"
import { Button } from "./button/Button"

interface PaginationControlProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControl({ currentPage, totalPages, onPageChange }: PaginationControlProps) {
  const [jumpToPage, setJumpToPage] = useState("")
  const [error, setError] = useState("")

  const handleJumpToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePageJump()
    }
  }

  const handlePageJump = () => {
    const pageNumber = Number.parseInt(jumpToPage)
    if (isValidPageNumber(pageNumber)) {
      onPageChange(pageNumber)
      setJumpToPage("")
      setError("")
    } else {
      setError(`Invalid page`)
      setTimeout(() => setError(""), 2000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setJumpToPage(value)
      setError("")
    }
  }

  const isValidPageNumber = (pageNumber: number) => !isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages

  const renderPageButton = (page: number) => (
    <Button
      size="sm"
      disabled={currentPage === page}
      onClick={() => onPageChange(page)}
      className={cn("h-8 min-w-[32px] px-2", currentPage === page ? "text-gray-400" : "border-blue-200")}
    >
      {page}
    </Button>
  )

  const renderNavigationButton = (onClick: () => void, disabled: boolean, icon: React.ReactNode) => (
    <Button
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn("h-8 w-8", disabled ? "text-gray-400" : "border-blue-200")}
    >
      {icon}
    </Button>
  )

  return (
    <div className="flex items-center justify-center space-x-2">
      {renderNavigationButton(() => onPageChange(1), currentPage === 1, <ChevronsLeft className="h-4 w-4" />)}
      {renderNavigationButton(
        () => onPageChange(currentPage - 1),
        currentPage === 1,
        <ChevronLeft className="h-4 w-4" />,
      )}

      {renderPageButton(1)}
      {totalPages > 1 && renderPageButton(2)}

      <div className="relative">
        <input
          type="text"
          value={jumpToPage}
          onChange={handleInputChange}
          onKeyDown={handleJumpToPage}
          placeholder={`${currentPage}`}
          className={cn(
            "h-8 w-16 text-center px-2 border rounded border-blue-200",
            error && "border-red-500 focus-visible:ring-red-500",
          )}
          aria-label="Jump to page"
          disabled={totalPages === 1}
        />
        {error && (
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs text-red-500 whitespace-nowrap">
            {error}
          </div>
        )}
      </div>

      {totalPages > 1 && renderPageButton(totalPages - 1)}
      {renderPageButton(totalPages)}

      {renderNavigationButton(
        () => onPageChange(currentPage + 1),
        currentPage === totalPages,
        <ChevronRight className="h-4 w-4" />,
      )}
      {renderNavigationButton(
        () => onPageChange(totalPages),
        currentPage === totalPages,
        <ChevronsRight className="h-4 w-4" />,
      )}
    </div>
  )
}
