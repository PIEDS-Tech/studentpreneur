import Cover from "@/components/Cover";
import Masthead from "@/components/Masthead";
import SmoothScroll from "@/components/SmoothScroll";
import { Bitsians, Letter, Pieds } from "@/components/sections/Intro";
import { Activities, DemoDay, Journey, OnlineWeek, Takeaways, Workshop } from "@/components/sections/Programme";
import { EditionOne, PhotobookSection } from "@/components/sections/Story";
import { Footer, Interest, ProgrammeDetails } from "@/components/sections/Signup";
import { faqs, SITE } from "@/content/site";

function Marquee({ words, tone }: { words: string[]; tone?: "lemon" }) {
  const loop = [...words, ...words];
  return (
    <div className={`marquee${tone ? ` marquee--${tone}` : ""}`} aria-hidden="true">
      <div className="marquee__track">
        {loop.map((w, i) => <span key={`${w}-${i}`}>{w}</span>)}
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#pieds`,
      name: "PIEDS, BITS Pilani",
      alternateName: "Pilani Innovation and Entrepreneurship Development Society",
      description: "The Technology Business Incubator at BITS Pilani.",
      parentOrganization: { "@type": "CollegeOrUniversity", name: "Birla Institute of Technology and Science, Pilani" },
    },
    {
      "@type": "EducationalOccupationalProgram",
      "@id": `${SITE.url}/#programme`,
      name: "Studentpreneur",
      url: SITE.url,
      description: SITE.description,
      provider: { "@id": `${SITE.url}/#pieds` },
      educationalProgramMode: "blended",
      programPrerequisites: "Students of Grades 8 to 12",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a className="skip" href="#letter">Skip to content</a>
      <SmoothScroll />
      <Masthead />
      <main>
        <Cover />
        <Marquee words={["Start-up", "Entrepreneurship", "Business", "Venture capital", "Pitching", "Prototypes"]} />
        <Letter />
        <Bitsians />
        <Pieds />
        <Journey />
        <Workshop />
        <Activities />
        <OnlineWeek />
        <DemoDay />
        <Takeaways />
        <EditionOne />
        <PhotobookSection />
        <Marquee tone="lemon" words={["Edition 2.0", "Now inviting schools", "Grades 8 to 12", "Demo Day at BITS Pilani"]} />
        <ProgrammeDetails />
        <Interest />
      </main>
      <Footer />
    </>
  );
}
