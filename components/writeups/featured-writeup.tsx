import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Writeup } from "@/types/writeups"
import { formatWriteupDate } from "@/constants/writeups"

interface FeaturedWriteupProps {
  writeup: Writeup
}

export function FeaturedWriteup({ writeup }: FeaturedWriteupProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#363636] bg-[#252525] transition-colors duration-300 hover:border-[#569429]/60">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <Link
          href={`/writeups/${writeup.slug}`}
          className="relative block aspect-16/10 overflow-hidden bg-[#111111] lg:col-span-7 lg:aspect-auto lg:min-h-[400px]"
        >
          <img
            src={writeup.cover_image_url}
            alt={writeup.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#111111]/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-[#252525]/35" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#363636] bg-[#111111]/90 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#569429]" />
            <span className="font-secondary text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8CEAE]">
              {writeup.issue_label}
            </span>
          </div>
        </Link>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-secondary text-xs font-semibold uppercase tracking-[0.25em] text-[#569429]">
                Featured Story
              </span>
              <span className="text-[#646464]">·</span>
              <span className="rounded-full border border-[#363636] bg-[#191919] px-3 py-1 font-secondary text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D8CEAE]">
                {writeup.category.name}
              </span>
            </div>

            <Link href={`/writeups/${writeup.slug}`} className="mt-5 block">
              <h2 className="font-primary text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white transition-colors group-hover:text-[#569429] sm:text-4xl xl:text-[2.65rem]">
                {writeup.title}
              </h2>
            </Link>

            <p className="mt-4 font-secondary text-sm font-medium leading-relaxed text-[#D8CEAE] sm:text-base">
              {writeup.subtitle}
            </p>

            <p className="mt-3 font-secondary text-sm leading-relaxed text-[#a8a8a8]">
              {writeup.excerpt}
            </p>
          </div>

          <div className="mt-8 border-t border-[#363636] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#569429]/40 bg-[#191919] font-primary text-base font-bold text-[#569429]">
                  {writeup.author.initials}
                </div>
                <div>
                  <p className="font-secondary text-sm font-semibold text-white">
                    {writeup.author.name}
                  </p>
                  <p className="font-secondary text-xs text-[#a8a8a8]">
                    {writeup.author.pool_name} · {formatWriteupDate(writeup.published_at)}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 font-secondary text-xs font-semibold uppercase tracking-[0.15em] text-[#a8a8a8]">
                <Clock className="h-3.5 w-3.5 text-[#569429]" />
                {writeup.reading_time_minutes} min read
              </span>
            </div>

            <Link
              href={`/writeups/${writeup.slug}`}
              className="group/btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#569429] px-8 py-3.5 font-secondary text-sm font-bold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#63a92f] hover:shadow-[0_0_35px_-5px_#569429] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525] sm:w-auto"
            >
              Read Writeup
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
