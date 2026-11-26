import Link from "next/link"
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from "lucide-react"
import { MOCK_WRITEUPS, formatWriteupDate } from "@/constants/writeups"

export function WriteupsSection() {
  const leadStory = MOCK_WRITEUPS.find((item) => item.is_featured) ?? MOCK_WRITEUPS[0]
  const secondaryStories = MOCK_WRITEUPS.filter((item) => item.id !== leadStory.id).slice(0, 3)

  return (
    <section
      id="writeups"
      className="border-t border-[#363636] bg-[#252525] px-6 py-14 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <span className="font-secondary text-xs font-semibold uppercase tracking-[0.25em] text-[#569429]">
              The Writeups
            </span>
            <h2 className="mt-4 font-primary text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              Off the <span className="text-[#569429]">Airwaves.</span>
            </h2>
          </div>

          <p className="max-w-md font-secondary text-base text-[#a8a8a8]">
            Reviews, studio dispatches, and Hitlist deep-dives written by the student crew inside Br. Bloemen Hall.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Lead Editorial Card */}
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#363636] bg-[#191919] transition-colors duration-300 hover:border-[#569429]/60 lg:col-span-7">
            <Link
              href={`/writeups/${leadStory.slug}`}
              className="relative block aspect-16/10 overflow-hidden bg-[#111111]"
            >
              <img
                src={leadStory.cover_image_url}
                alt={leadStory.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#191919] via-transparent to-transparent" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#363636] bg-[#111111]/90 px-3.5 py-1 font-secondary text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8CEAE]">
                <BookOpen className="h-3.5 w-3.5 text-[#569429]" />
                {leadStory.category.name}
              </span>
            </Link>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center gap-3 font-secondary text-xs font-semibold uppercase tracking-[0.18em] text-[#a8a8a8]">
                  <span className="text-[#569429]">{leadStory.issue_label}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#569429]" />
                    {leadStory.reading_time_minutes} min read
                  </span>
                </div>

                <Link href={`/writeups/${leadStory.slug}`} className="mt-3 block">
                  <h3 className="font-primary text-3xl font-bold uppercase leading-[0.96] tracking-tight text-white transition-colors group-hover:text-[#569429] sm:text-4xl">
                    {leadStory.title}
                  </h3>
                </Link>

                <p className="mt-3 font-secondary text-sm leading-relaxed text-[#a8a8a8] sm:text-base">
                  {leadStory.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#363636] pt-4">
                <p className="font-secondary text-xs text-[#D8CEAE]">
                  By <span className="font-semibold text-white">{leadStory.author.name}</span> ·{" "}
                  {formatWriteupDate(leadStory.published_at)}
                </p>
                <Link
                  href={`/writeups/${leadStory.slug}`}
                  className="inline-flex items-center gap-1.5 font-secondary text-xs font-bold uppercase tracking-wider text-[#569429] transition-colors hover:text-[#63a92f]"
                >
                  Read Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Stacked Editorial Headlines */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            {secondaryStories.map((story) => (
              <Link
                key={story.id}
                href={`/writeups/${story.slug}`}
                className="group flex flex-1 flex-col justify-between rounded-2xl border border-[#363636] bg-[#191919] p-6 transition-colors duration-300 hover:border-[#569429]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-secondary text-[11px] font-semibold uppercase tracking-[0.22em] text-[#569429]">
                      {story.category.name}
                    </span>
                    <span className="font-secondary text-[11px] text-[#a8a8a8]">
                      {story.reading_time_minutes} min read
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-primary text-2xl font-bold uppercase leading-[0.98] tracking-tight text-white transition-colors group-hover:text-[#569429]">
                    {story.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 font-secondary text-sm leading-relaxed text-[#a8a8a8]">
                    {story.excerpt}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#363636] pt-3">
                  <span className="font-secondary text-xs text-[#D8CEAE]">
                    {story.author.name} · {formatWriteupDate(story.published_at)}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#a8a8a8] transition-colors group-hover:text-[#569429]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/writeups"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#646464] px-8 py-4 font-secondary text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
          >
            Read All Writeups
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
