"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, LayoutGroup, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavbar } from "@/hooks/general/use-navbar"
import { NAV_ITEMS, POLLS_MENU } from "@/constants/navbar"

// --- 1. EXTRACTED STATIC NAVBAR ---
function StaticNavbar({ linkActive }: { linkActive: (path: string) => boolean }) {
  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "bg-white text-black",
        "dark:bg-[#111111] dark:text-white"
      )}
    >
      <div className="w-full px-2">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="w-32 h-12 relative">
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
              className="object-contain hidden dark:block"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "relative text-2xl font-medium transition-colors hover:text-[#569429]",
                    linkActive(item.path) && "text-[#569429]"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <span className="text-2xl font-medium text-black dark:text-white opacity-80 select-none">
                POLLS
              </span>
            </div>

            <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
              <Sun className="h-6 w-6 hidden dark:block" />
              <Moon className="h-6 w-6 block dark:hidden" />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// --- 2. MAIN NAVBAR COMPONENT ---
export function Navbar() {
  const {
    isMobileMenuOpen, setIsMobileMenuOpen,
    mounted,
    openMenu, setOpenMenu,
    dropdownRef,
    pathname,
    theme, setTheme,
    openWithDelay, closeWithDelay,
    linkActive, groupActive
  } = useNavbar()

  // Return the static version during server-side rendering/hydration
  if (!mounted) return <StaticNavbar linkActive={linkActive} />

  return (
    <LayoutGroup>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          "bg-white text-black",
          "dark:bg-[#111111] dark:text-white"
        )}
      >
        <div className="w-full px-2">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="w-32 h-12 relative hover:scale-105">
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
                className="object-contain hidden dark:block"
              />
            </Link>

            {/* Desktop nav */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-8" ref={dropdownRef}>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "relative text-2xl font-medium transition-colors hover:scale-105 hover:text-[#569429]",
                      linkActive(item.path) && "text-[#569429]"
                    )}
                  >
                    {item.name}
                    {linkActive(item.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#569429]"
                      />
                    )}
                  </Link>
                ))}

                {/* POLLS (dropdown) */}
                <div
                  className="relative group"
                  onMouseEnter={() => openWithDelay("polls")}
                  onMouseLeave={closeWithDelay}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 text-2xl font-medium transition-colors group-hover:scale-105 hover:text-[#569429]",
                      (openMenu === "polls" || groupActive(POLLS_MENU)) && "text-[#569429]"
                    )}
                    aria-haspopup="menu"
                    aria-expanded={openMenu === "polls"}
                    onClick={() => setOpenMenu(v => (v === "polls" ? null : "polls"))}
                  >
                    POLLS <ChevronDown className="h-6 w-6" />
                  </button>

                  <div className="absolute left-0 right-0 top-full h-2" aria-hidden />

                  <AnimatePresence>
                    {openMenu === "polls" && (
                      <motion.div
                        key="polls-menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-1/2 top-full mt-2 w-28 -translate-x-1/2 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] shadow-lg overflow-hidden"
                        role="menu"
                        onMouseEnter={() => openWithDelay("polls")}
                        onMouseLeave={closeWithDelay}
                      >
                        <ul className="divide-y divide-black/10 dark:divide-white/10">
                          {POLLS_MENU.map(it => (
                            <li key={it.href}>
                              <Link
                                href={it.href}
                                className={cn(
                                  "block px-4 py-2 text-center text-2xl transition hover:scale-105",
                                  "bg-white hover:bg-gray-100 text-black",
                                  "dark:bg-[#1a1a1a] dark:hover:bg-[#2a2a2a] dark:text-white",
                                  linkActive(it.href) && "text-[#569429] dark:text-[#569429]"
                                )}
                              >
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Controls */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:scale-105"
              >
                {theme === "dark" ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg bg-white dark:bg-[#111111]"
            >
              <div className="container mx-auto px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition",
                      "hover:bg-gray-100 dark:hover:bg-[#1a1a1a]",
                      linkActive(item.path) ? "text-[#569429]" : "text-black dark:text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {POLLS_MENU.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition",
                      "hover:bg-gray-100 dark:hover:bg-[#1a1a1a]",
                      linkActive(it.href) ? "text-[#569429]" : "text-black dark:text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </LayoutGroup>
  )
}