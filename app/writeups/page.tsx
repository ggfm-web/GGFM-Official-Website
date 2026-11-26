import type { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { MOCK_WRITEUPS, WRITEUP_CATEGORIES } from "@/constants/writeups"
import { WriteupsFeed } from "@/components/writeups/writeups-feed"

export const metadata: Metadata = {
  title: "Writeups | Green Giant FM",
  description:
    "Reviews, studio dispatches, Hitlist chart breakdowns, and campus music journalism from the staff of Green Giant FM.",
}

export default function WriteupsPage() {
  return (
    <div className="min-h-screen bg-[#191919] text-white selection:bg-[#569429] selection:text-black">
      <section className="relative overflow-hidden bg-[#191919] px-6 pb-12 pt-28 text-center sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#569429]/12 blur-[110px]"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#363636] bg-[#252525] px-4 py-2 font-secondary text-xs font-semibold uppercase tracking-[0.28em] text-[#D8CEAE]">
            <BookOpen className="h-3.5 w-3.5 text-[#569429]" />
            The Off-Air Edition
          </span>

          <h1 className="font-primary text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            The <span className="text-[#569429]">Writeups</span>
          </h1>

          <p className="mt-5 max-w-2xl font-secondary text-base leading-relaxed text-[#a8a8a8] sm:text-lg">
            Music reviews, Br. Bloemen Hall studio dispatches, Hitlist chart breakdowns, and essays from the student voices behind DLSU&apos;s official radio station.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <hr className="border-[#363636]" />
      </div>

      <WriteupsFeed writeups={MOCK_WRITEUPS} categories={WRITEUP_CATEGORIES} />
    </div>
  )
}
