import { Metadata } from "next"
import { TitleSection } from "./sections/title"
import { ServicesContainer } from "./sections/services-container"

export const metadata: Metadata = {
  title: "Services | Green Giant FM",
  description: "Explore the media, partnership, and talent services offered by Green Giant FM.",
}

export default function ServicesPage() {
  return (
    <div className="bg-[#191919] text-white mt-12 pb-12 font-sans">
      <div className="mx-auto min-h-screen max-w-6xl px-6 space-y-12">
        <TitleSection />
        <hr className="border-[#363636]" />
        <ServicesContainer />
      </div>
    </div>
  )
}