import type { WriteupBlock } from "@/types/writeups"

interface ArticleBodyProps {
  blocks: WriteupBlock[]
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-4 font-primary text-3xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-4xl"
            >
              {block.text}
            </h2>
          )
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-8 rounded-r-2xl border-l-4 border-[#569429] bg-[#252525]/70 px-6 py-5"
            >
              <p className="font-secondary text-lg font-medium italic leading-relaxed text-white sm:text-xl">
                &ldquo;{block.text}&rdquo;
              </p>
              {block.attribution && (
                <footer className="mt-3 font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-[#D8CEAE]">
                  — {block.attribution}
                </footer>
              )}
            </blockquote>
          )
        }

        if (block.type === "callout") {
          return (
            <aside
              key={index}
              className="my-8 rounded-2xl border border-[#363636] bg-[#252525] p-6"
            >
              <p className="font-secondary text-xs font-semibold uppercase tracking-[0.24em] text-[#569429]">
                {block.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-3 font-secondary text-sm leading-relaxed text-[#d4d4d4] sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#569429]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )
        }

        return (
          <p
            key={index}
            className={`font-secondary text-base leading-[1.85] text-[#d4d4d4] sm:text-lg ${
              block.dropCap
                ? "first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5 first-letter:font-primary first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#569429]"
                : ""
            }`}
          >
            {block.text}
          </p>
        )
      })}
    </div>
  )
}
