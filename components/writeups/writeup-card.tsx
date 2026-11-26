import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import type { Writeup } from "@/types/writeups"
import { formatWriteupDate } from "@/constants/writeups"

interface WriteupCardProps {
  writeup: Writeup
  variant?: "spotlight" | "standard"
}

export function WriteupCard({ writeup, variant = "standard" }: WriteupCardProps) {
  const isSpotlight = variant === "spotlight"

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#363636] bg-[#252525] transition-colors duration-300 hover:border-[#569429]/60">
      <Link
        href={`/writeups/${writeup.slug}`}
        className="relative block aspect-16/10 overflow-hidden bg-[#111111]"
      >
        <img
          src={writeup.cover_image_url}
          alt={writeup.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#111111]/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-[#363636] bg-[#111111]/90 px-3 py-1 font-secondary text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8CEAE] backdrop-blur-sm">
          {writeup.category.name}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col justify-between ${isSpotlight ? "p-6 sm:p-7" : "p-5 sm:p-6"}`}>
        <div>
          <div className="flex items-center justify-between gap-2 font-secondary text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a8a8a8]">
            <span>{writeup.issue_label}</span>
            <span className="inline-flex items-center gap-1 text-[#D8CEAE]">
              <Clock className="h-3 w-3 text-[#569429]" />
              {writeup.reading_time_minutes} min
            </span>
          </div>

          <Link href={`/writeups/${writeup.slug}`} className="mt-3 block">
            <h3
              className={`font-primary font-bold uppercase leading-[0.98] tracking-tight text-white transition-colors group-hover:text-[#569429] ${
                isSpotlight ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {writeup.title}
            </h3>
          </Link>

          <p className="mt-3 line-clamp-2 font-secondary text-sm leading-relaxed text-[#a8a8a8]">
            {writeup.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#363636] pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#363636] bg-[#191919] font-primary text-xs font-bold text-[#569429]">
              {writeup.author.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate font-secondary text-xs font-semibold text-white">
                {writeup.author.name}
              </p>
              <p className="truncate font-secondary text-[11px] text-[#a8a8a8]">
                {formatWriteupDate(writeup.published_at)}
              </p>
            </div>
          </div>

          <Link
            href={`/writeups/${writeup.slug}`}
            aria-label={`Read ${writeup.title}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#363636] bg-[#191919] text-[#D8CEAE] transition-colors group-hover:border-[#569429] group-hover:bg-[#569429] group-hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
