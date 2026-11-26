import Link from "next/link"
import { ArrowRight, Flame, Hash, PenLine } from "lucide-react"
import type { Writeup } from "@/types/writeups"

interface WriteupsSidebarProps {
  trending: Writeup[]
  tags: string[]
  activeTag: string | null
  onSelectTag: (tag: string) => void
}

export function WriteupsSidebar({
  trending,
  tags,
  activeTag,
  onSelectTag,
}: WriteupsSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* On Heavy Rotation */}
      <div className="rounded-2xl border border-[#363636] bg-[#252525] p-6">
        <div className="flex items-center gap-2 border-b border-[#363636] pb-4">
          <Flame className="h-4 w-4 text-[#569429]" />
          <h3 className="font-secondary text-xs font-semibold uppercase tracking-[0.22em] text-[#D8CEAE]">
            On Heavy Rotation
          </h3>
        </div>

        <ol className="mt-4 divide-y divide-[#363636]">
          {trending.map((item, index) => (
            <li key={item.id} className="py-4 first:pt-1 last:pb-1">
              <Link
                href={`/writeups/${item.slug}`}
                className="group flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] rounded-lg"
              >
                <span className="font-primary text-3xl font-bold leading-none text-[#569429] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-secondary text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a8a8a8]">
                    {item.category.name}
                  </p>
                  <h4 className="mt-1 font-primary text-lg font-bold uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-[#569429]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 font-secondary text-xs text-[#a8a8a8]">
                    {item.reading_time_minutes} min read · {item.view_count.toLocaleString()} reads
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Browse by Tag */}
      <div className="rounded-2xl border border-[#363636] bg-[#252525] p-6">
        <div className="flex items-center gap-2 border-b border-[#363636] pb-4">
          <Hash className="h-4 w-4 text-[#569429]" />
          <h3 className="font-secondary text-xs font-semibold uppercase tracking-[0.22em] text-[#D8CEAE]">
            Browse by Tag
          </h3>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = activeTag === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag(tag)}
                aria-pressed={isActive}
                className={`cursor-pointer rounded-full border px-3 py-1.5 font-secondary text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] ${
                  isActive
                    ? "border-[#569429] bg-[#569429] text-black"
                    : "border-[#363636] bg-[#191919] text-[#a8a8a8] hover:border-[#646464] hover:text-white"
                }`}
              >
                #{tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Pitch a Writeup CTA */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#569429]/30 bg-linear-to-br from-[#569429]/10 to-transparent p-6">
        <div>
          <PenLine className="h-7 w-7 text-[#569429]" />
          <h3 className="mt-4 font-primary text-2xl font-bold uppercase leading-tight text-white">
            Got a campus gig or OPM release to pitch?
          </h3>
          <p className="mt-2.5 font-secondary text-sm leading-relaxed text-[#a8a8a8]">
            Partner with Green Giant FM for live coverage, artist spotlights, and editorial features.
          </p>
        </div>

        <Link
          href="/services"
          className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#569429] px-6 py-3 font-secondary text-xs font-bold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#63a92f] hover:shadow-[0_0_30px_-5px_#569429] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191919]"
        >
          Send a Pitch
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </aside>
  )
}
