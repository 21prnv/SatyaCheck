"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would trigger a search
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for propaganda topics, news, or sources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-6 text-lg rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}

