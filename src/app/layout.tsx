import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One, Montserrat } from "next/font/google";
import { SITE } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const bagel = Bagel_Fat_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bagel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | Studentpreneur",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Studentpreneur",
    "PIEDS",
    "BITS Pilani",
    "entrepreneurship programme for schools",
    "school entrepreneurship workshop",
    "startup programme for students",
    "Grades 8 to 12",
    "Demo Day",
    "APOGEE",
  ],
  authors: [{ name: "PIEDS Student Team, BITS Pilani" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: "Studentpreneur: turning school students into founders",
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studentpreneur: turning school students into founders",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#1e1936",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${montserrat.variable} ${bagel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
