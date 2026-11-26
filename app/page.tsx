import type { Metadata } from "next"
import { HeroSection } from "./_home-sections/hero-section"
import { HitlistSection } from "./_home-sections/hitlist-section"
import { RadioTalentSection } from "./_home-sections/radio-talent-section"
import { DjHuntSection } from "./_home-sections/dj-hunt-section"
import { WriteupsSection } from "./_home-sections/writeups-section"
import { ServicesSection } from "./_home-sections/services-section"

export const metadata: Metadata = {
  title: "Green Giant FM | DLSU Radio",
  description:
    "The official student radio station of De La Salle University. Listen live, vote for your favorite tracks on The Hitlist, and meet the voices of Green Giant FM.",
};

export default function HomePage() {
  return (
    <main className="bg-[#191919]">
      <HeroSection />
      <HitlistSection />
      <RadioTalentSection />
      <DjHuntSection />
      <WriteupsSection />
      <ServicesSection />
    </main>
  );
}