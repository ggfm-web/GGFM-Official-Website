"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import { useToast } from "@/hooks/general/use-toast"

interface ShareButtonProps {
  title: string
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast({
        title: "Link copied",
        description: `Ready to share "${title}".`,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: "Copy unavailable",
        description: "Copy the URL directly from your browser address bar.",
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#363636] bg-[#252525] px-4 py-2 font-secondary text-xs font-semibold uppercase tracking-wider text-[#D8CEAE] transition-colors hover:border-[#569429] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429]"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[#569429]" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5 text-[#569429]" />
          Share
        </>
      )}
    </button>
  )
}
