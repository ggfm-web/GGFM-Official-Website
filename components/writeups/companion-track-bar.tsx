import { ExternalLink } from "lucide-react"
import { FaSpotify } from "react-icons/fa"
import type { CompanionTrack } from "@/types/writeups"

interface CompanionTrackBarProps {
  track: CompanionTrack
}

const BAR_HEIGHTS = [0.45, 0.95, 0.6, 0.85]

export function CompanionTrackBar({ track }: CompanionTrackBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#363636] bg-[#252525] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#569429]/40 bg-[#191919]">
          <div className="flex h-5 items-end gap-1" aria-hidden="true">
            {BAR_HEIGHTS.map((height, idx) => (
              <span
                key={idx}
                className="w-1 origin-bottom rounded-full bg-[#569429]"
                style={{
                  height: `${height * 100}%`,
                  animationName: "ggfm-equalizer",
                  animationDuration: "1.1s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${idx * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-secondary text-[11px] font-semibold uppercase tracking-[0.22em] text-[#569429]">
            Soundtrack to Read To
          </p>
          <p className="truncate font-secondary text-sm font-bold text-white sm:text-base">
            {track.title}{" "}
            <span className="font-normal text-[#a8a8a8]">— {track.artist}</span>
          </p>
        </div>
      </div>

      <a
        href={track.spotify_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#363636] bg-[#191919] px-4 py-2 font-secondary text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-[#569429] hover:text-[#569429] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429]"
      >
        <FaSpotify className="h-4 w-4 text-[#569429]" />
        Play on Spotify
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
