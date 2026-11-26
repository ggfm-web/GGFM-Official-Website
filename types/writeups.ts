export type WriteupCategorySlug =
  | "music-reviews"
  | "campus-culture"
  | "behind-the-booth"
  | "live-coverage"
  | "hitlist-breakdown"

export type WriteupStatus = "draft" | "scheduled" | "published" | "archived"

export interface WriteupCategory {
  id: number
  slug: WriteupCategorySlug
  name: string
  description: string
  accent_color: string
  sort_order: number
}

export interface WriteupAuthor {
  id: number
  name: string
  slug: string
  initials: string
  role_title: string
  pool_name: string
  bio: string
  avatar_url: string | null
  rt_link?: string
}

export interface CompanionTrack {
  title: string
  artist: string
  spotify_url: string
}

export type WriteupBlock =
  | {
      type: "paragraph"
      text: string
      dropCap?: boolean
    }
  | {
      type: "heading"
      text: string
    }
  | {
      type: "quote"
      text: string
      attribution?: string
    }
  | {
      type: "callout"
      title: string
      items: string[]
    }

export interface Writeup {
  id: number
  slug: string
  title: string
  subtitle: string
  excerpt: string
  cover_image_url: string
  cover_caption: string
  issue_label: string
  category: WriteupCategory
  author: WriteupAuthor
  tags: string[]
  companion_track?: CompanionTrack
  blocks: WriteupBlock[]
  reading_time_minutes: number
  is_featured: boolean
  view_count: number
  status: WriteupStatus
  published_at: string
}
