import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Eye } from "lucide-react"
import {
  MOCK_WRITEUPS,
  formatWriteupDate,
  getRelatedWriteups,
  getWriteupBySlug,
} from "@/constants/writeups"
import { ReadingProgress } from "@/components/writeups/reading-progress"
import { CompanionTrackBar } from "@/components/writeups/companion-track-bar"
import { ArticleBody } from "@/components/writeups/article-body"
import { ShareButton } from "@/components/writeups/share-button"
import { WriteupCard } from "@/components/writeups/writeup-card"

interface WriteupDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return MOCK_WRITEUPS.map((writeup) => ({
    slug: writeup.slug,
  }))
}

export async function generateMetadata({ params }: WriteupDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const writeup = getWriteupBySlug(slug)

  if (!writeup) {
    return { title: "Writeup Not Found | Green Giant FM" }
  }

  return {
    title: `${writeup.title} | Writeups | Green Giant FM`,
    description: writeup.excerpt,
  }
}

export default async function WriteupDetailPage({ params }: WriteupDetailPageProps) {
  const { slug } = await params
  const writeup = getWriteupBySlug(slug)

  if (!writeup) {
    notFound()
  }

  const related = getRelatedWriteups(writeup, 3)

  return (
    <article className="min-h-screen bg-[#191919] text-white selection:bg-[#569429] selection:text-black">
      <ReadingProgress />

      {/* Editorial Article Header */}
      <header className="relative overflow-hidden px-6 pb-10 pt-28 sm:px-10 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#569429]/10 blur-[110px]"
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/writeups"
            className="inline-flex items-center gap-2 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-[#a8a8a8] transition-colors hover:text-[#569429]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Writeups
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#569429]/40 bg-[#569429]/10 px-3.5 py-1 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-[#569429]">
              {writeup.category.name}
            </span>
            <span className="font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-[#D8CEAE]">
              {writeup.issue_label}
            </span>
          </div>

          <h1 className="mt-5 font-primary text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {writeup.title}
          </h1>

          <p className="mt-5 font-secondary text-lg font-medium leading-relaxed text-[#D8CEAE] sm:text-xl">
            {writeup.subtitle}
          </p>

          {/* Byline & Actions */}
          <div className="mt-8 flex flex-col gap-4 border-y border-[#363636] py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#569429]/40 bg-[#252525] font-primary text-base font-bold text-[#569429]">
                {writeup.author.initials}
              </div>
              <div>
                <p className="font-secondary text-sm font-bold text-white">
                  {writeup.author.name}
                </p>
                <p className="font-secondary text-xs text-[#a8a8a8]">
                  {writeup.author.role_title} · {writeup.author.pool_name}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4 font-secondary text-xs uppercase tracking-wider text-[#a8a8a8]">
                <span>{formatWriteupDate(writeup.published_at)}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#569429]" />
                  {writeup.reading_time_minutes} min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-[#569429]" />
                  {writeup.view_count.toLocaleString()}
                </span>
              </div>

              <ShareButton title={writeup.title} />
            </div>
          </div>
        </div>
      </header>

      {/* Cover Artwork */}
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
        <figure className="overflow-hidden rounded-2xl border border-[#363636] bg-[#111111]">
          <div className="aspect-16/10 w-full overflow-hidden">
            <img
              src={writeup.cover_image_url}
              alt={writeup.title}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="border-t border-[#363636] bg-[#252525] px-5 py-3 font-secondary text-xs text-[#a8a8a8]">
            {writeup.cover_caption}
          </figcaption>
        </figure>
      </div>

      {/* Article Prose Column */}
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
        {writeup.companion_track && (
          <div className="mb-10">
            <CompanionTrackBar track={writeup.companion_track} />
          </div>
        )}

        <ArticleBody blocks={writeup.blocks} />

        {/* Tags */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-[#363636] pt-8">
          <span className="mr-2 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-[#a8a8a8]">
            Filed Under
          </span>
          {writeup.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#363636] bg-[#252525] px-3 py-1 font-secondary text-xs font-semibold text-[#D8CEAE]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-[#363636] bg-[#252525] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#569429]/50 bg-[#191919] font-primary text-xl font-bold text-[#569429]">
              {writeup.author.initials}
            </div>
            <div>
              <p className="font-secondary text-[11px] font-semibold uppercase tracking-[0.22em] text-[#569429]">
                Written By
              </p>
              <h3 className="mt-1 font-primary text-2xl font-bold uppercase tracking-tight text-white">
                {writeup.author.name}
              </h3>
              <p className="font-secondary text-xs font-semibold text-[#D8CEAE]">
                {writeup.author.role_title} · {writeup.author.pool_name}
              </p>
              <p className="mt-2 font-secondary text-sm leading-relaxed text-[#a8a8a8]">
                {writeup.author.bio}
              </p>
            </div>
          </div>

          {writeup.author.rt_link && (
            <Link
              href={writeup.author.rt_link}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#646464] px-5 py-2.5 font-secondary text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-[#569429] hover:text-[#569429]"
            >
              View DJ Profile
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Up Next / Related Stories */}
      <section className="border-t border-[#363636] bg-[#111111]/60 px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-secondary text-xs font-semibold uppercase tracking-[0.25em] text-[#569429]">
                Up Next
              </span>
              <h2 className="mt-2 font-primary text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">
                Keep <span className="text-[#569429]">Reading</span>
              </h2>
            </div>

            <Link
              href="/writeups"
              className="group inline-flex items-center gap-2 font-secondary text-xs font-bold uppercase tracking-wider text-[#D8CEAE] transition-colors hover:text-[#569429]"
            >
              Browse All Writeups
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <WriteupCard key={item.id} writeup={item} />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
