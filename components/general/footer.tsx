import Image from "next/image"
import { FaFacebookF, FaSpotify, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiGmail } from "react-icons/si"
import { SOCIAL_LINKS, FOOTER_INFO } from "@/constants/footer"

const ICON_MAP: Record<string, React.ElementType> = {
  twitter: FaXTwitter,
  facebook: FaFacebookF,
  spotify: FaSpotify,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  gmail: SiGmail,
}

export function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-[#F5F2E9] text-black dark:bg-[#111111] dark:text-white border-t border-black/5 dark:border-white/5">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
          
          {/* Main Row: Uses xl:items-stretch to force all 3 columns to match the tallest element's height */}
          <div className="flex flex-col xl:flex-row xl:items-stretch justify-between gap-12 xl:gap-8">
            
            {/* 1. Scaled Up Logo (Centered Vertically) */}
            <div className="flex flex-col justify-center items-center xl:items-start shrink-0">
              <div className="relative h-32.25 w-78 lg:h-35.75 lg:w-86.5">
                <Image
                  src="/assets/GGFM Logo_Black.png"
                  alt="DLSU Radio: Green Giant FM"
                  fill
                  priority
                  className="object-contain block dark:hidden"
                />
                <Image
                  src="/assets/GGFM Logo_White.png"
                  alt="DLSU Radio: Green Giant FM"
                  fill
                  priority
                  className="hidden dark:block"
                />
              </div>
            </div>

            {/* 2. Scaled Up Slogan & Stacked Socials (Tallest element that sets the height) */}
            <div className="flex flex-col items-center justify-center gap-5 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
                Keep it locked with us!
              </h2>

              <div className="flex flex-row items-center gap-1 md:gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const IconComponent = ICON_MAP[link.icon]

                  if (!IconComponent) return null;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className="inline-flex items-center justify-center shrink-0 hover:scale-110 rounded-full text-[#569429] hover:opacity-90 transition-all h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-black/5 dark:bg-white/5 xl:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2E9] dark:focus-visible:ring-offset-[#111111]"
                    >
                      <IconComponent className="text-2xl sm:text-3xl md:text-4xl" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* 3. Distinct Address & Contact Block (Stacked, stretched height) */}
            <div className="flex flex-col justify-center items-center text-center sm:items-start sm:text-left gap-5 bg-black/5 dark:bg-white/5 px-8 py-6 rounded-3xl shrink-0">
              
              {/* Address */}
              <div className="flex flex-col w-full">
                <span className="text-[16px] uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-1.5">
                  Address
                </span>
                <span className="text-[13px] font-secondary leading-snug max-w-70.5 text-gray-800 dark:text-gray-200">
                  {FOOTER_INFO.address}
                </span>
              </div>
              
              {/* Contact */}
              <div className="flex flex-col w-full">
                <span className="text-[16px] uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-1.5">
                  Contact
                </span>
                <a
                  href={FOOTER_INFO.emailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-secondary text-[#3f6f1e] hover:text-black dark:text-[#7cbf4c] dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#569429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2E9] dark:focus-visible:ring-offset-[#111111] rounded-sm"
                >
                  {FOOTER_INFO.email}
                </a>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}