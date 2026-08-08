# Wayfarer — travel news + destinations wiki

Astro + Tailwind + React scaffold. Static-first (SSG), islands only where
there's real interactivity (globe/language menu, carousels).

## Run it

```bash
npm install
npm run dev
```

## What's here

```
src/
  i18n/
    languages.ts   ← the list of 8 languages. Edit this to add/remove one.
    ui.ts           ← short UI strings (nav, buttons) per language.
    utils.ts        ← getLangFromUrl, useTranslations(lang), getLocalizedPath
  content/
    countries/{lang}/{slug}.md   ← one file per country per language
    cities/{lang}/{slug}.md      ← one file per city per language, linked
                                    to its country via `countrySlug`
    news/{lang}/{slug}.md        ← travel news articles
    config.ts       ← zod schemas for all three collections
  layouts/
    BaseLayout.astro  ← <head> SEO: hreflang alternates, canonical, JSON-LD
    WikiLayout.astro  ← adds breadcrumbs on top of BaseLayout
  components/
    Header.astro             ← logo, search, mounts the globe menu island
    LanguageGlobeMenu.tsx     ← React island: globe icon → dropdown with
                                8 languages + link to the wiki
    HeroMosaic.astro          ← homepage hero: 1 main story + 2 secondary
    NewsCard.astro            ← horizontal news list card
    Carousel.tsx               ← React island, horizontal scroll w/ arrows,
                                used for "related cities" / "related news"
    Badge.astro / ReadTime.astro
  pages/
    index.astro                       ← redirects "/" → "/en/"
    [lang]/index.astro                ← homepage (news feed)
    [lang]/news/[slug].astro          ← single article
    [lang]/wiki/index.astro           ← wiki hub: list of countries
    [lang]/wiki/[country]/index.astro ← country overview + list of cities
    [lang]/wiki/[country]/[city].astro← city overview
```

## URL structure

```
/en/                              home (news)
/en/news/japan-rail-pass/         article
/en/wiki/                         wiki hub
/en/wiki/japan/                   country overview
/en/wiki/japan/tokyo/             city overview
/ru/wiki/japan/tokyo/             same page, different language
```

Every route is mirrored across all 8 languages via `getStaticPaths`, and
`BaseLayout` emits `hreflang` alternates for all of them plus
`x-default` — this is the part that actually matters for SEO, not just
having translated text.

## What's stubbed / needs real content

- Only `japan` (country) and `tokyo` (city) exist, in `en` + `ru`, as a
  pattern to copy. Add the rest of your destinations the same way.
- `ui.ts` has all 8 languages fully translated for **UI chrome only**
  (nav, labels). Long-form content (article bodies, country/city prose)
  needs an actual translator or editorial pass per language — it's not
  something to auto-generate for a real SEO site.
- Search input in the header is visual only — no logic wired up yet.
- No sitemap.xml generation config beyond the `@astrojs/sitemap`
  integration being installed; verify `site` in `astro.config.mjs`
  matches your real domain before deploying.
- No image optimization (`astro:assets`) — hero images currently point
  straight at Unsplash URLs as placeholders. Swap for real, optimized
  assets before launch.
- No pagination on the homepage news list or wiki hub — fine for a
  handful of entries, but wire up `astro-pagination`-style chunking
  before you have hundreds of countries.

## Design notes

- Language switcher **preserves your current page** (`getLocalizedPath`
  swaps only the `/[lang]/` segment) — switching from a Tokyo city page
  goes to the Tokyo page in the new language, not back to the homepage.
- Arabic (`ar`) is wired for `dir="rtl"` at the `<html>` level via
  `BaseLayout`; the rest of the layout uses logical Tailwind spacing
  where it matters, but double-check mirrored components (carousel
  arrows, breadcrumb chevrons) render sensibly in RTL before shipping.
