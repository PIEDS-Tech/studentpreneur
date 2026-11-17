# Studentpreneur, Teachers' Edition

Landing page for **Studentpreneur by PIEDS, BITS Pilani**: a magazine-style site that tells teachers what the programme is and collects interest from schools.

Built with Next.js 16 (App Router), GSAP (ScrollTrigger, Draggable, Flip), Lenis and StPageFlip.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start   # production
```

## Configure

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site. Used for canonical links, Open Graph, sitemap and robots. Defaults to `http://localhost:3000`. |
| `INTEREST_WEBHOOK_URL` | Where "Register interest" submissions are POSTed as JSON (for example a Google Apps Script, Formspree or Zapier webhook). Without it, submissions are appended to `data/interest-submissions.jsonl`, which only works on a server with a writable disk. |

## Where things live

- `src/content/site.ts`: all copy, numbers, photos and logos. Edit content here.
- `src/app/page.tsx`: page composition and JSON-LD structured data.
- `src/app/layout.tsx`: metadata, fonts, viewport.
- `src/app/actions.ts`: Server Action for the interest form.
- `src/components/`: interactive client components (cover stickers, photobook, leaderboard, 72-hour clock, activity board, masthead).
- `src/components/sections/`: server-rendered page sections.
- `src/assets/`: photos and logos taken from the decks (optimised by `next/image`).
- `public/brand/`: logo masks used in CSS.
- `_legacy-static/`: the earlier plain HTML/CSS/JS version.
