import type {
  Writeup,
  WriteupAuthor,
  WriteupCategory,
} from "@/types/writeups"

export const WRITEUP_CATEGORIES: WriteupCategory[] = [
  {
    id: 1,
    slug: "behind-the-booth",
    name: "Behind the Booth",
    description:
      "Inside Br. Bloemen Hall — studio routines, broadcast tech, and the student crew keeping the stream alive.",
    accent_color: "#569429",
    sort_order: 1,
  },
  {
    id: 2,
    slug: "music-reviews",
    name: "Music Reviews",
    description:
      "Deep listens on OPM releases, campus indie records, and late-night rotation picks from our Audio and RT pools.",
    accent_color: "#D8CEAE",
    sort_order: 2,
  },
  {
    id: 3,
    slug: "live-coverage",
    name: "Live Coverage",
    description:
      "Field dispatches from Taft Avenue gigs, university concerts, and GGFM-hosted stage nights.",
    accent_color: "#569429",
    sort_order: 3,
  },
  {
    id: 4,
    slug: "hitlist-breakdown",
    name: "Hitlist Breakdown",
    description:
      "Bi-weekly chart trajectories, listener voting swings, and the tracks climbing Green Giant FM's top countdown.",
    accent_color: "#D8CEAE",
    sort_order: 4,
  },
  {
    id: 5,
    slug: "campus-culture",
    name: "Campus Culture",
    description:
      "Essays and observations on student radio, Lasallian soundscapes, and life along Taft.",
    accent_color: "#569429",
    sort_order: 5,
  },
]

const categoryBySlug = Object.fromEntries(
  WRITEUP_CATEGORIES.map((category) => [category.slug, category])
) as Record<WriteupCategory["slug"], WriteupCategory>

export const WRITEUP_AUTHORS: WriteupAuthor[] = [
  {
    id: 1,
    name: "Mikaela Soriano",
    slug: "mikaela-soriano",
    initials: "MS",
    role_title: "Senior Editor",
    pool_name: "Digital Communications",
    bio: "Covers campus audio culture, late-night radio programming, and the intersection of student press and independent music in Manila.",
    avatar_url: null,
  },
  {
    id: 2,
    name: "Rafael Mendoza",
    slug: "rafael-mendoza",
    initials: "RM",
    role_title: "Senior DJ & Music Critic",
    pool_name: "Radio Talent",
    bio: "Hosts evening indie and OPM blocks at Br. Bloemen Hall while digging through local bedroom-pop releases and Taft gig lineups.",
    avatar_url: null,
    rt_link: "/radio-talent",
  },
  {
    id: 3,
    name: "Clarisse Villanueva",
    slug: "clarisse-villanueva",
    initials: "CV",
    role_title: "Audio Producer",
    pool_name: "Audio",
    bio: "Mixes live studio sessions, stingers, and station soundboards. Has strong opinions about condenser placement and low-end headroom.",
    avatar_url: null,
  },
  {
    id: 4,
    name: "Anton De Guzman",
    slug: "anton-de-guzman",
    initials: "AD",
    role_title: "Senior DJ & Chart Analyst",
    pool_name: "Radio Talent",
    bio: "Tracks every bi-weekly Hitlist cycle and breaks down why certain OPM deep cuts outlast viral singles on campus airwaves.",
    avatar_url: null,
    rt_link: "/radio-talent",
  },
  {
    id: 5,
    name: "Sienna Evangelista",
    slug: "sienna-evangelista",
    initials: "SE",
    role_title: "Field Correspondent",
    pool_name: "Publicity & Productions",
    bio: "Documents live campus performances, org week stages, and back-of-house soundchecks around Malate and Taft Avenue.",
    avatar_url: null,
  },
]

const authorBySlug = Object.fromEntries(
  WRITEUP_AUTHORS.map((author) => [author.slug, author])
) as Record<string, WriteupAuthor>

export const MOCK_WRITEUPS: Writeup[] = [
  {
    id: 1,
    slug: "inside-br-bloemen-hall-keeping-the-campus-frequency-alive",
    title: "Inside Br. Bloemen Hall: How Student DJs Keep the Campus Frequency Alive",
    subtitle:
      "Between seven-thirty morning classes and midnight cram sessions, a small glass booth in Bloemen keeps De La Salle University sounding awake.",
    excerpt:
      "Step past the studio doors at Br. Bloemen Hall and you find sticky-note cue sheets, tangled XLR cables, and twenty-five student voices turning dead air into community.",
    cover_image_url: "/assets/writeups/bloemen-booth.svg",
    cover_caption:
      "Studio A signal chain and cue console inside Br. Bloemen Hall before the evening block.",
    issue_label: "ISSUE 01 · COVER STORY",
    category: categoryBySlug["behind-the-booth"],
    author: authorBySlug["mikaela-soriano"],
    tags: ["bloemen-hall", "student-radio", "studio-life", "ggfm-history"],
    companion_track: {
      title: "Pag-Ibig ay Kanibalismo II",
      artist: "fitterkarma",
      spotify_url: "https://open.spotify.com/search/fitterkarma%20Pag-Ibig%20ay%20Kanibalismo",
    },
    reading_time_minutes: 6,
    is_featured: true,
    view_count: 1480,
    status: "published",
    published_at: "2026-11-18T09:00:00+08:00",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "At 4:45 PM on a Tuesday, Br. Bloemen Hall feels caught between two schedules. Outside the booth, students cut across campus with iced coffee and lab manuals tucked under their arms; inside, a DJ trainee is squinting at a fader bank, rehearsing a thirty-second back-announce out loud before the red light flips on.",
      },
      {
        type: "paragraph",
        text: "Running Green Giant FM since 2008 has never meant pretending to be a commercial FM powerhouse. Founded through a collaboration between Team Communications and the Electronics and Communications Engineering Society, the station was built on a simpler premise: students deserve a room where their taste, humor, and late-night thoughts can travel across Taft in real time.",
      },
      {
        type: "heading",
        text: "Two minutes before the hour",
      },
      {
        type: "paragraph",
        text: "Every broadcast block begins long before the first mic check. Show pairs trade shared playlists in the hallway, argue over whether an OPM ballad kills the pacing after an upbeat synth opener, and check with the Audio pool whenever a cable crackles on channel three. What sounds effortless over earphones on a jeepney ride home is usually held together by gaffer tape and quiet teamwork.",
      },
      {
        type: "quote",
        text: "You never know if three people are listening or three hundred—so you talk to the booth like a friend is sitting across the table.",
        attribution: "Station Producer note taped beside Studio A's mic arm",
      },
      {
        type: "heading",
        text: "Seven pools, one stream",
      },
      {
        type: "paragraph",
        text: "While Radio Talent carries the voice on air, six other pools keep the signal moving. Digital Communications shapes how shows live after sign-off, Publicity & Productions turns passing jokes into visual campaigns, Documentations & Logistics keeps gear accounted for, and Web Management keeps the online stream and Hitlist polls running cleanly.",
      },
      {
        type: "callout",
        title: "Booth Liner Notes",
        items: [
          "Founded in 2008 at De La Salle University-Manila by TeamComm & ECES",
          "25+ active Senior DJs and trainees rotating across weekly live blocks",
          "7 internal & external operational pools powering broadcast and campus events",
        ],
      },
      {
        type: "paragraph",
        text: "When the outro fades and the next DJ slides into the chair, nobody clocks out right away. Half the crew lingers in the doorway talking about a new local EP or fixing tomorrow's rundown. That overlap—the five minutes between shifts—is where Green Giant FM actually lives.",
      },
    ],
  },
  {
    id: 2,
    slug: "taft-after-hours-opm-bedroom-ep-review",
    title: "Track-by-Track: Why Manila's Bedroom Shoegaze Wave Owns Campus Headphones",
    subtitle:
      "A closer listen to the washed-out guitars, Tagalog hooks, and tape hiss dominating GGFM's late-afternoon rotation.",
    excerpt:
      "Local independent EPs recorded in dorm rooms and small home setups are out-connecting slick studio singles across Taft Avenue. Here is why the lo-fi turn stuck.",
    cover_image_url: "/assets/writeups/opm-indie-review.svg",
    cover_caption:
      "Heavy rotation sleeve notes from the Audio and Radio Talent listening room.",
    issue_label: "ISSUE 01 · ALBUM NOTES",
    category: categoryBySlug["music-reviews"],
    author: authorBySlug["rafael-mendoza"],
    tags: ["opm-indie", "album-review", "shoegaze", "heavy-rotation"],
    companion_track: {
      title: "Tahanan",
      artist: "Munimuni",
      spotify_url: "https://open.spotify.com/search/Munimuni%20Tahanan",
    },
    reading_time_minutes: 5,
    is_featured: false,
    view_count: 1120,
    status: "published",
    published_at: "2026-11-15T14:30:00+08:00",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "Walk along Agno or wait out a sudden five o'clock downpour near Henry Sy Sr. Hall and you can almost guess what is playing through half the wired earphones around you. Somewhere along the way, Manila's student listeners traded over-compressed festival drops for chorus-drenched guitars and vocals mixed just beneath the snare.",
      },
      {
        type: "paragraph",
        text: "What makes this wave compelling isn't nostalgia for nineties distortion—it is the specificity of the songwriting. Lines arrive conversational, unhurried, and anchored in ordinary commutes: missed trains at Vito Cruz, humid dorm electric fans, half-sent drafts at 2 AM.",
      },
      {
        type: "heading",
        text: "The power of leaving room in the mix",
      },
      {
        type: "paragraph",
        text: "On air, tracks with dynamic breathing room translate better than brick-walled masters. When a song drops from full-band fuzz down to a single acoustic strum right before a DJ talk-break, the transition feels alive rather than jarring.",
      },
      {
        type: "quote",
        text: "A great campus record doesn't try to fill a stadium; it makes a crowded walkway feel quiet for three minutes.",
        attribution: "Rafael Mendoza, Radio Talent",
      },
      {
        type: "callout",
        title: "Essential Rotation Picks",
        items: [
          "Opener: Warm tape-saturated guitars that build across 40 seconds before the vocal enters",
          "Mid-set anchor: Mid-tempo Tagalog chorus tailored for sunset traffic broadcasts",
          "Closer: Feedback fade-out with zero quantized drums and plenty of natural room air",
        ],
      },
      {
        type: "paragraph",
        text: "If the latest Hitlist nominations are any indication, listeners aren't treating bedroom OPM as a passing micro-genre. They're keeping it in rotation all term.",
      },
    ],
  },
  {
    id: 3,
    slug: "anatomy-of-a-dj-hunt-stinger",
    title: "60 Seconds on the Clock: Inside the Making of a DJ Hunt Stinger",
    subtitle:
      "How sixteen finalists turned raw voiceovers, tight music beds, and nerve-wracking studio takes into signature station IDs.",
    excerpt:
      "Anyone can talk over an intro—doing it cleanly in twenty seconds with personality, timing, and zero dead air is what separates a finalist from the rest.",
    cover_image_url: "/assets/writeups/dj-hunt-spotlight.svg",
    cover_caption:
      "Vocal booth prep during DJ Hunt 2026 stinger and segue recording sessions.",
    issue_label: "ISSUE 01 · SPOTLIGHT",
    category: categoryBySlug["behind-the-booth"],
    author: authorBySlug["clarisse-villanueva"],
    tags: ["dj-hunt", "audio-production", "stingers", "training"],
    companion_track: {
      title: "Know My Name",
      artist: "True Damage",
      spotify_url: "https://open.spotify.com/search/True%20Damage%20Know%20My%20Name",
    },
    reading_time_minutes: 4,
    is_featured: false,
    view_count: 985,
    status: "published",
    published_at: "2026-11-11T11:00:00+08:00",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "Every DJ Hunt season leaves behind dozens of takes that never make the public voting page. Before a twenty-second finalist stinger lands on the site, there are three warm-up reads, one laugh that clipped the preamp, and a quiet moment when a contestant finally hears how their voice sits over a beat.",
      },
      {
        type: "heading",
        text: "Hitting the post without rushing",
      },
      {
        type: "paragraph",
        text: "In radio production, hitting the post—landing your final line the exact split-second a track's vocals kick in—looks like a parlor trick until you try it yourself. Finalists quickly learn that speed isn't energy; crisp phrasing and intentional pauses carry twice as far over an instrumental bed.",
      },
      {
        type: "callout",
        title: "Three Elements of a Great Stinger",
        items: [
          "Hook in the first 3 seconds so listeners immediately know whose voice is on air",
          "Clean ducking between the vocal bus and music bed with zero muddy low-mids",
          "One memorable sign-off line that fits the finalist's natural cadence",
        ],
      },
      {
        type: "quote",
        text: "The best take is rarely the loudest one—it's the take where the finalist stops performing and starts talking to you.",
        attribution: "Audio Pool Session Notes",
      },
      {
        type: "paragraph",
        text: "Listening back to all sixteen finalists side by side reminds us why DJ Hunt stays one of GGFM's loudest traditions: every batch brings voices nobody could have scripted beforehand.",
      },
    ],
  },
  {
    id: 4,
    slug: "taft-avenue-under-stage-lights-org-night-recap",
    title: "Taft Under Stage Lights: Notes From a Packed Friday Night Soundcheck",
    subtitle:
      "Three student bands, one stubborn monitor mix, and a crowd that sang every chorus loud enough to rattle the bleachers.",
    excerpt:
      "From afternoon load-in to the final encore, our field crew logged the setlists, crowd energy, and back-of-house scramble that turned a campus quadrangle into a proper gig.",
    cover_image_url: "/assets/writeups/taft-live-gig.svg",
    cover_caption:
      "Stage frequency sweep and live host cues recorded from front-of-house.",
    issue_label: "ISSUE 01 · FIELD DISPATCH",
    category: categoryBySlug["live-coverage"],
    author: authorBySlug["sienna-evangelista"],
    tags: ["live-coverage", "taft-avenue", "campus-gigs", "event-hosting"],
    companion_track: {
      title: "Creep",
      artist: "Radiohead",
      spotify_url: "https://open.spotify.com/search/Radiohead%20Creep",
    },
    reading_time_minutes: 5,
    is_featured: false,
    view_count: 840,
    status: "published",
    published_at: "2026-11-06T18:00:00+08:00",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "At 3:15 PM, nobody is thinking about an encore. You're watching two guitarists trace cable runs across warm concrete while GGFM hosts test wireless mics against the hum of nearby construction along Taft. Campus gigs always look glamorous in recap reels; in person, they smell like rain, gaffer tape, and rush-hour exhaust.",
      },
      {
        type: "heading",
        text: "When the courtyard fills up",
      },
      {
        type: "paragraph",
        text: "By 6:30 PM, the first chords of the opening set pulled stragglers out of nearby buildings. Within two songs, the front barricade stopped feeling like a polite school program and started moving like a weekend gig in Cubao—phone flashlights up, backpacks piled near the tech tent, and hosts improvising crowd banter between line checks.",
      },
      {
        type: "quote",
        text: "Hearing an entire courtyard shout back a chorus you first played on an empty midnight shift never gets old.",
        attribution: "GGFM Event Host backstage",
      },
      {
        type: "callout",
        title: "Field Log: Friday Night Run-of-Show",
        items: [
          "15:15 — Line check & wireless RF sweep with Audio and Events teams",
          "18:30 — Doors & DJ warm-up crate spinning OPM and alt-rock staples",
          "21:10 — Closing band encore after a five-minute impromptu crowd chant",
        ],
      },
      {
        type: "paragraph",
        text: "Live coverage isn't just about documenting who played. It is about bottle-capturing why campus stages matter while you're still in college—before everyone scatters to different jobs and cities.",
      },
    ],
  },
  {
    id: 5,
    slug: "how-the-hitlist-moves-two-week-chart-breakdown",
    title: "Five Days, Twenty Tracks: Reading the Patterns Behind The Hitlist",
    subtitle:
      "Every bi-weekly voting cycle tells a story about what Lasallian listeners actually replay when nobody's watching.",
    excerpt:
      "Why steady mid-table sleepers beat first-day spikes, how Spotify previews sway undecided voters, and what the last three Hitlist cycles reveal about campus taste.",
    cover_image_url: "/assets/writeups/hitlist-breakdown.svg",
    cover_caption:
      "Bi-weekly Hitlist cycle telemetry and leaderboard pacing overview.",
    issue_label: "ISSUE 01 · CHART REPORT",
    category: categoryBySlug["hitlist-breakdown"],
    author: authorBySlug["anton-de-guzman"],
    tags: ["hitlist", "chart-report", "opm", "listener-votes"],
    companion_track: {
      title: "Girl Like Me",
      artist: "PinkPantheress",
      spotify_url: "https://open.spotify.com/search/PinkPantheress%20Girl%20Like%20Me",
    },
    reading_time_minutes: 4,
    is_featured: false,
    view_count: 1310,
    status: "published",
    published_at: "2026-11-01T10:15:00+08:00",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "Monday morning on a fresh Hitlist cycle always starts with a sprint. Fanbases drop group-chat links, early voters lock in their top picks before first period, and the leaderboard looks settled by lunch. By Thursday night, that table almost never looks the same.",
      },
      {
        type: "heading",
        text: "The Wednesday plateau and late surge",
      },
      {
        type: "paragraph",
        text: "Across recent five-and-a-half-day voting windows, tracks that climb steadily from #7 to #2 tend to share one trait: high preview-to-vote conversion. Casual voters click the Spotify player inside the Hitlist carousel out of curiosity, hear an unexpected hook, and hand over their final ballot slot.",
      },
      {
        type: "callout",
        title: "Cycle Snapshot Takeaways",
        items: [
          "14-day rotation cadence keeps active and upcoming playlists fresh each term",
          "OPM indie and alt-R&B tracks consistently show the strongest late-week surges",
          "Top 3 tracks stay glued to prime afternoon airplay throughout the tally window",
        ],
      },
      {
        type: "paragraph",
        text: "That unpredictability is why The Hitlist remains our favorite pulse check on campus listening habits—every single vote visibly bends what hits the airwaves next Monday.",
      },
    ],
  },
  {
    id: 6,
    slug: "why-student-radio-still-matters-in-an-algorithm-era",
    title: "No Algorithm Required: Why Student Radio Still Hits Different at Midnight",
    subtitle:
      "Streaming feeds know what you played yesterday. A student DJ in Bloemen Hall knows what the whole campus feels like tonight.",
    excerpt:
      "In an era of infinite autoplay queues, there is still something irreplaceable about hearing a real voice stumble through a track intro and nail the feeling of a rainy Manila week.",
    cover_image_url: "/assets/writeups/midnight-frequency.svg",
    cover_caption:
      "Late-night broadcast dial illustration inspired by GGFM's midnight blocks.",
    issue_label: "ISSUE 01 · ESSAY",
    category: categoryBySlug["campus-culture"],
    author: authorBySlug["mikaela-soriano"],
    tags: ["campus-culture", "student-radio", "midnight-block", "editorial"],
    companion_track: {
      title: "Love Is a Long Road",
      artist: "Tom Petty",
      spotify_url: "https://open.spotify.com/search/Tom%20Petty%20Love%20Is%20a%20Long%20Road",
    },
    reading_time_minutes: 5,
    is_featured: false,
    view_count: 910,
    status: "published",
    published_at: "2026-10-25T22:00:00+08:00",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "Algorithms are remarkably good at keeping you comfortable. Give a streaming app three sleepy acoustic tracks during finals week and it will dutifully serve you thirty more that sound just like them until sunrise—smooth, frictionless, and completely lonely.",
      },
      {
        type: "paragraph",
        text: "Student radio refuses to be frictionless. A live DJ will interrupt a melancholic indie ballad to remind you that your 7:30 AM prof probably isn't canceling class, read an inside joke sent from a study table in Gokongwei, and immediately pivot into an upbeat 2000s throwaway track just because the booth felt too quiet.",
      },
      {
        type: "quote",
        text: "Curation with a pulse means someone took responsibility for the next four minutes of your evening.",
        attribution: "GGFM Editorial Desk",
      },
      {
        type: "heading",
        text: "A shared room without walls",
      },
      {
        type: "paragraph",
        text: "That is ultimately what keeps listeners coming back to Green Giant FM—and why we built this Writeups page alongside the stream. Whether you're tuned in live or reading liner notes between classes, the point is the same: real people making noise together on one campus frequency.",
      },
    ],
  },
]

export function getWriteupBySlug(slug: string): Writeup | undefined {
  return MOCK_WRITEUPS.find((writeup) => writeup.slug === slug)
}

export function getRelatedWriteups(current: Writeup, limit = 3): Writeup[] {
  return [...MOCK_WRITEUPS]
    .filter((item) => item.id !== current.id)
    .sort((a, b) => {
      const aSameCategory = a.category.slug === current.category.slug ? 1 : 0
      const bSameCategory = b.category.slug === current.category.slug ? 1 : 0
      if (aSameCategory !== bSameCategory) return bSameCategory - aSameCategory
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    })
    .slice(0, limit)
}

export function getTrendingWriteups(limit = 4): Writeup[] {
  return [...MOCK_WRITEUPS]
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, limit)
}

export function getAllWriteupTags(): string[] {
  const tagSet = new Set<string>()
  for (const writeup of MOCK_WRITEUPS) {
    for (const tag of writeup.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

export function formatWriteupDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
