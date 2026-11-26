"use client"

import { useMemo, useState } from "react"
import { BookOpen, RotateCcw, Search, X } from "lucide-react"
import type { Writeup, WriteupCategory, WriteupCategorySlug } from "@/types/writeups"
import { FeaturedWriteup } from "./featured-writeup"
import { WriteupCard } from "./writeup-card"
import { WriteupsSidebar } from "./writeups-sidebar"

interface WriteupsFeedProps {
  writeups: Writeup[]
  categories: WriteupCategory[]
}

type SortOrder = "latest" | "popular"

export function WriteupsFeed({ writeups, categories }: WriteupsFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<WriteupCategorySlug | "all">("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOrder>("latest")

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const item of writeups) {
      for (const tag of item.tags) tagSet.add(tag)
    }
    return Array.from(tagSet).sort()
  }, [writeups])

  const trendingWriteups = useMemo(
    () => [...writeups].sort((a, b) => b.view_count - a.view_count).slice(0, 4),
    [writeups]
  )

  const isDefaultView =
    selectedCategory === "all" &&
    selectedTag === null &&
    searchQuery.trim() === "" &&
    sortBy === "latest"

  const filteredWriteups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return [...writeups]
      .filter((item) => {
        if (selectedCategory !== "all" && item.category.slug !== selectedCategory) {
          return false
        }
        if (selectedTag && !item.tags.includes(selectedTag)) {
          return false
        }
        if (query) {
          const haystack = [
            item.title,
            item.subtitle,
            item.excerpt,
            item.author.name,
            item.category.name,
            ...item.tags,
          ]
            .join(" ")
            .toLowerCase()
          if (!haystack.includes(query)) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.view_count - a.view_count
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      })
  }, [writeups, selectedCategory, selectedTag, searchQuery, sortBy])

  const featuredStory = useMemo(
    () => writeups.find((item) => item.is_featured) ?? writeups[0],
    [writeups]
  )

  const remainingDefaultStories = useMemo(() => {
    if (!featuredStory) return []
    return [...writeups]
      .filter((item) => item.id !== featuredStory.id)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  }, [writeups, featuredStory])

  const spotlightStories = remainingDefaultStories.slice(0, 2)
  const archiveStories = remainingDefaultStories.slice(2)

  const handleToggleTag = (tag: string) => {
    setSelectedTag((current) => (current === tag ? null : tag))
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedTag(null)
    setSearchQuery("")
    setSortBy("latest")
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 sm:px-10 lg:px-16">
      {/* Editorial Filter & Search Bar */}
      <div className="flex flex-col gap-4 border-b border-[#363636] pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter writeups by category">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`cursor-pointer rounded-full border px-4 py-2 font-secondary text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] ${
                selectedCategory === "all"
                  ? "border-[#569429] bg-[#569429] text-black"
                  : "border-[#363636] bg-[#252525] text-[#a8a8a8] hover:border-[#646464] hover:text-white"
              }`}
            >
              All Stories
            </button>
            {categories.map((category) => {
              const active = selectedCategory === category.slug
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`cursor-pointer rounded-full border px-4 py-2 font-secondary text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] ${
                    active
                      ? "border-[#569429] bg-[#569429] text-black"
                      : "border-[#363636] bg-[#252525] text-[#a8a8a8] hover:border-[#646464] hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8a8a8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search writeups..."
                aria-label="Search writeups"
                className="w-full rounded-full border border-[#363636] bg-[#252525] py-2 pl-10 pr-9 font-secondary text-sm text-white placeholder:text-[#a8a8a8] focus:border-[#569429] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8a8a8] hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="inline-flex shrink-0 rounded-full border border-[#363636] bg-[#252525] p-1">
              <button
                type="button"
                onClick={() => setSortBy("latest")}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 font-secondary text-xs font-bold uppercase tracking-wider transition-colors ${
                  sortBy === "latest"
                    ? "bg-[#569429] text-black"
                    : "text-[#a8a8a8] hover:text-white"
                }`}
              >
                Latest
              </button>
              <button
                type="button"
                onClick={() => setSortBy("popular")}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 font-secondary text-xs font-bold uppercase tracking-wider transition-colors ${
                  sortBy === "popular"
                    ? "bg-[#569429] text-black"
                    : "text-[#a8a8a8] hover:text-white"
                }`}
              >
                Most Read
              </button>
            </div>
          </div>
        </div>

        {/* Active filter bar */}
        {!isDefaultView && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#363636] bg-[#252525]/60 px-4 py-2.5">
            <p className="font-secondary text-xs text-[#a8a8a8]">
              Showing <span className="font-bold text-white">{filteredWriteups.length}</span>{" "}
              {filteredWriteups.length === 1 ? "writeup" : "writeups"}
              {selectedTag && (
                <>
                  {" "}
                  tagged <span className="font-semibold text-[#569429]">#{selectedTag}</span>
                </>
              )}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex cursor-pointer items-center gap-1.5 font-secondary text-xs font-semibold uppercase tracking-wider text-[#D8CEAE] transition-colors hover:text-[#569429]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      {isDefaultView ? (
        <div className="mt-10 space-y-12">
          {featuredStory && <FeaturedWriteup writeup={featuredStory} />}

          {spotlightStories.length > 0 && (
            <section aria-label="Editor's spotlights">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-secondary text-xs font-semibold uppercase tracking-[0.25em] text-[#D8CEAE]">
                  Fresh Off The Desk
                </span>
                <span className="font-secondary text-xs text-[#a8a8a8]">
                  Curated by Digital Communications &amp; RT
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {spotlightStories.map((story) => (
                  <WriteupCard key={story.id} writeup={story} variant="spotlight" />
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <section aria-label="More writeups" className="lg:col-span-8">
              <div className="mb-6 flex items-center justify-between border-b border-[#363636] pb-3">
                <h2 className="font-primary text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                  From the <span className="text-[#569429]">Archive</span>
                </h2>
                <span className="font-secondary text-xs uppercase tracking-[0.2em] text-[#a8a8a8]">
                  {archiveStories.length} Stories
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {archiveStories.map((story) => (
                  <WriteupCard key={story.id} writeup={story} />
                ))}
              </div>
            </section>

            <div className="lg:col-span-4">
              <WriteupsSidebar
                trending={trendingWriteups}
                tags={allTags}
                activeTag={selectedTag}
                onSelectTag={handleToggleTag}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {filteredWriteups.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#363636] bg-[#252525] px-6 py-20 text-center">
                <BookOpen className="h-10 w-10 text-[#569429]" />
                <h3 className="mt-4 font-primary text-2xl font-bold uppercase tracking-tight text-white">
                  No Matching Writeups
                </h3>
                <p className="mt-2 max-w-md font-secondary text-sm text-[#a8a8a8]">
                  Try clearing your search query or switching back to all editorial categories.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 cursor-pointer rounded-full bg-[#569429] px-6 py-2.5 font-secondary text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#63a92f]"
                >
                  Show All Writeups
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filteredWriteups.map((story) => (
                  <WriteupCard key={story.id} writeup={story} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <WriteupsSidebar
              trending={trendingWriteups}
              tags={allTags}
              activeTag={selectedTag}
              onSelectTag={handleToggleTag}
            />
          </div>
        </div>
      )}
    </div>
  )
}
