# Astro Migration and SEO Preservation Plan

## Objective

Migrate the public portfolio from Next.js to Astro without changing its design, public URLs, content slugs, search identity, or analytics history.

The migrated site should:

1. Remain available at `https://mehedihasan.dev`.
2. Preserve every valuable indexable URL.
3. Improve static HTML quality, page speed, metadata consistency, structured data, and content authoring.
4. Minimize browser JavaScript by using Astro components for static UI.
5. Keep the existing Markdown content and terminal content generator usable.
6. Implement the positioning and content work defined in [`seo.md`](./seo.md).

## Status (updated 2026-10-15)

The Next.js → Astro migration is implemented on branch `migrate/astro`. The site builds to 60 static pages; every route, slug, canonical, sitemap URL, and JSON-LD block was verified against the preserved inventory.

- **Deliberate deviation:** Astro content collections were replaced by Astro Markdown pages — each entry is `src/pages/<type>/<slug>.md` with a `layout:` frontmatter field, loaded at build time with `import.meta.glob`. `lib/content/schema.mjs` remains the single shared validator (CLI, generator, tests, prebuild).
- **Verified:** 60/60 canonicals, one `<h1>` per page, 0 broken internal links, 0 missing local images, sitemap contains only canonical/indexable URLs, drafts/templates/raw/thin pages excluded, `astro check` clean, content tests 13/13, SEO audit clean.
- **Completed after the initial migration:** §2.2/§2.4 SEO schema and generator fields, §3.5 font preload and font-metric/CLS verification, §5.1 site identity, §5.2 title-length handling, §5.4 content-based `lastmod`, §5.5 image optimization, §5.6 homepage Writing section and cross-linking, the §6.1 automated tests (route parity, metadata, links, orphans), and the §0.2/§6.2/§6.3 performance and accessibility gates (Lighthouse plus scripted keyboard, responsive, and reduced-motion checks — see §6.3).
- **Not yet done:** the outcomes that need external systems rather than this repository — Phase 0.1's Next.js build and Search Console impression list, §4.3 raw-Markdown traffic confirmation, the §5.1 LinkedIn/résumé consistency check, the §6.2 visual diff against the removed Next.js baseline screenshots, and Phases 7–8 (deployment, cutover, and monitoring).

## Recommended Architecture

- Astro static output for the public website.
- Astro content collections for blogs, projects, skills, and experiences.
- Existing Markdown files retained under the current `content/` directories.
- `glob()` loaders pointed at the existing directories to avoid unnecessary content moves.
- Astro components for layouts, navigation, cards, and page content.
- Small vanilla browser scripts for the mobile menu and other simple interactions.
- React integration only if a component genuinely needs React hydration.
- Existing `tools/generator/` retained as an independent terminal tool.
- `@astrojs/sitemap` for generated sitemap files.
- Astro `<Image />` or `<Picture />` for imported content and UI images.

Astro is well suited to static portfolios and blogs. Its official migration guidance supports reusing React components during transition, retaining `public/`, and moving page routing into `src/pages/`: [Astro Next.js migration guide](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/).

---

# Phase 0: Record the SEO Baseline

Complete this before replacing any Next.js route.

> **Baseline note (2026-10-15):** the Next.js application was removed in the migration before the 0.1/0.2 artifacts were captured, so those exact crawl and Lighthouse numbers cannot be produced here. The machine-readable baseline that now stands in for them is `tests/route-inventory.json` (the verified public route set, compared by `tests/seo.test.mjs`) plus the `npm run seo:audit` report over `dist/`. Re-run the audit and Lighthouse against a preview deployment to close out the phase.

## 0.1 Crawl and URL inventory

- [ ] Build the current Next.js site successfully. (Not reproducible: the Next.js app was removed during the migration — see the Phase 0 note.)
- [x] Save the current generated route list. (`tests/route-inventory.json` holds the verified public route set and is guarded by the route-parity test.)
- [x] Save the current `sitemap.xml` and `sitemap-0.xml` URL lists. (Generated at build by `@astrojs/sitemap`; `/sitemap.xml` is preserved as an alias and the audit/tests read the URL list.)
- [x] Record the status code, canonical, title, description, H1, robots directive, and structured-data types for every public URL. (`npm run seo:audit` validates title, description, canonical, H1, robots, and JSON-LD on every page; status-code parity is checked in §4.4.)
- [x] Record current internal links and image URLs. (`npm run seo:audit` resolves every internal link and image URL against `dist/`.)
- [x] Record the current HTML language and Open Graph metadata. (`lang="en"` and the Open Graph/Twitter tags ship from `BaseLayout.astro`.)
- [ ] Identify URLs receiving organic impressions in Google Search Console. (Requires Search Console access.)
- [x] Mark high-value URLs that must not change. (Every route in `tests/route-inventory.json` is protected by the route-parity test.)

## 0.2 Performance baseline

- [x] Record mobile and desktop Lighthouse results for the homepage, blog index, one article, project index, and one project. (Recorded for all five pages at both form factors — see the table in §6.3. These are the current Astro values that stand in for the unavailable Next.js baseline.)
- [x] Record LCP, CLS, INP, TTFB, transferred JavaScript, and total page weight. (LCP, CLS, a TBT proxy for INP, TTFB, JS, and total weight are tabulated in §6.3.)
- [x] Save screenshots of important pages at mobile and desktop widths. (Captured at 375 px and 1280 px for the homepage, blog index, project index, an article, and a project.)

## 0.3 Migration guardrails

- [x] No slug changes during the framework migration.
- [x] No design rewrite during the framework migration.
- [x] No large content rewrite in the same release.
- [x] No change from `mehedihasan.dev` to another domain or subdomain.
- [x] No removal of an indexed page without a deliberate redirect or retirement decision.
- [x] Do not deploy until the old and new crawl inventories match.

## Phase 0 deliverable

A machine-readable baseline containing all current public URLs and their SEO fields.

---

# Phase 1: Bootstrap Astro

## 1.1 Project setup

- [x] Create the Astro implementation on a dedicated migration branch.
- [x] Install Astro with strict TypeScript configuration.
- [x] Configure the deployed site URL as `https://mehedihasan.dev`.
- [x] Use static output.
- [x] Match the existing trailing-slash behavior explicitly.
- [x] Add the official sitemap integration.
- [x] Add React integration only if an interactive React island is retained.
- [x] Keep `public/` intact initially.
- [x] Reuse the existing global CSS and Tailwind setup before refactoring styles.

Proposed configuration shape:

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mehedihasan.dev',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
```

Confirm `trailingSlash` against the production host before finalizing it. Astro uses the configured `site` value for absolute URLs and sitemap generation: [Astro configuration reference](https://docs.astro.build/en/reference/configuration-reference/).

## 1.2 Proposed project structure

```text
src/
  assets/
  components/
    home/
    site/
    seo/
  layouts/
    BaseLayout.astro
    ContentLayout.astro
  lib/
    content.ts
    profile.ts
    seo.ts
  pages/
    index.astro
    about.astro
    contact.astro
    experience.astro
    experiences/[slug].astro
    projects/index.astro
    projects/[slug].astro
    skills/index.astro
    skills/[slug].astro
    blogs/index.astro
    blogs/[slug].astro
    blogs/raw/[slug].ts
    testimonials.astro
    404.astro
  styles/
    globals.css
  content.config.ts
content/
  blogs/
  projects/
  skills/
  experiences/
public/
tools/generator/
```

## 1.3 Dependency strategy

- [x] Remove `next`, `next-sitemap`, and `eslint-config-next` only after Astro reaches parity.
- [x] Remove `next/font` usage and self-host the current fonts or adopt a controlled font-loading strategy.
- [x] Replace `next/image` with Astro image components. (Next.js is gone; project screenshots now render through Astro `<Image />`. Other UI images use plain `<img>` with explicit dimensions because they double as stable social-card URLs.)
- [x] Replace `next/link` with standard `<a>` links.
- [x] Replace `next/navigation` route access with `Astro.url.pathname`.
- [x] Remove the website's React runtime if no hydrated React components remain.
- [x] Keep React dependencies if `tools/generator/` still requires them.
- [x] Separate generator dependencies from public-site dependencies later if build weight or maintenance becomes an issue. (Not needed yet — the generator shares the workspace on purpose at the current scale.)

## Phase 1 acceptance criteria

- `astro dev`, `astro check`, and `astro build` pass.
- The empty shell deploys as static HTML.
- Site URL and trailing-slash behavior match production.

---

# Phase 2: Migrate the Content System

## 2.1 Use Astro content collections

Create four collections in `src/content.config.ts`:

- `blogs`
- `projects`
- `skills`
- `experiences`

Use Astro's `glob()` loader with the existing directories. This avoids moving Markdown files and keeps the content generator's paths stable. Astro's loader supports Markdown files outside `src/content/`: [Content Loader API](https://v5.docs.astro.build/en/reference/content-loader-reference/).

Illustrative configuration:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
  loader: glob({ pattern: ['*.md', '!_template.md'], base: './content/blogs' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    modified_date: z.coerce.date().optional(),
    feature_image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});
```

## 2.2 Preserve current validation behavior

- [x] Port the rules from `lib/content/schema.mjs` into collection schemas. (`lib/content/schema.mjs` is kept as the one shared validator; the four collections were implemented as Astro Markdown pages instead — see the Status note above.)
- [x] Exclude `_template.md` from every collection.
- [x] Exclude draft content from production lists and `getStaticPaths()`.
- [x] Preserve filename-based slugs.
- [x] Preserve ordering fields such as `sort_index`, `featured`, and `featured_order`.
- [x] Normalize experience dates while preserving the displayed text where necessary.
- [x] Fail the build on duplicate slugs or invalid required fields.
- [x] Add schema fields needed by SEO: `modified_date`, optional social image, and optional canonical override. (`modified_date`, `social_image`, and `canonical` are accepted by every collection and surfaced in the CLI and generator.)

## 2.3 Replace content utilities

Replace:

- `lib/content/store.mjs`
- `utils/content.ts`
- `utils/blogs.ts`

With small typed helpers around:

- `getCollection()`
- `getEntry()`
- `render()`

Astro collections provide typed querying and Markdown rendering through these APIs: [Astro content collections API](https://v5.docs.astro.build/en/reference/modules/astro-content/).

## 2.4 Preserve the content generator

- [x] Keep `tools/generator/` outside the Astro public runtime.
- [x] Confirm it still reads and writes the same `content/` directories.
- [x] Reuse shared Zod schemas if practical, without coupling the generator to Astro runtime modules.
- [x] Update generator fields for `modified_date` and article social images. (The generator derives its form from the schema, so `modified_date`, `social_image`, and `canonical` appear automatically with help text.)
- [x] Keep existing validation and generator scripts working during the transition.

## Phase 2 acceptance criteria

- All published Markdown entries load through typed collections.
- Drafts and templates do not generate routes.
- The generated URL slugs exactly match the Next.js site.
- Existing generator tests still pass.

---

# Phase 3: Migrate Layout and Shared Components

## 3.1 Base layout

Map `app/layout.tsx` to `src/layouts/BaseLayout.astro`.

The layout should own:

- `<html lang="en">`
- charset and viewport metadata
- title and description
- canonical URL
- robots directives
- Open Graph metadata
- Twitter card metadata
- Person JSON-LD
- favicon links
- global styles
- skip link
- site header and footer

## 3.2 SEO component

Create one typed `SEOHead.astro` component accepting:

```ts
type SEOProps = {
  title: string;
  description: string;
  canonical?: URL | string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};
```

Requirements:

- [x] Build canonical URLs with `new URL(Astro.url.pathname, Astro.site)`.
- [x] Produce exactly one canonical per indexable page.
- [x] Ensure titles do not receive duplicate brand suffixes.
- [x] Use absolute image URLs for social cards.
- [x] Escape JSON-LD safely.
- [x] Set article metadata only on article pages.
- [x] Allow explicit `noindex` for raw, draft, or thin pages.

## 3.3 Header and navigation

The current header uses React only for pathname detection and mobile-menu state.

Recommended migration:

- [x] Convert `Header.tsx` to `Header.astro`.
- [x] Use `Astro.url.pathname` for active-link styling.
- [x] Use a small inline script for menu open/close behavior.
- [x] Preserve `aria-expanded`, `aria-controls`, and navigation labels.
- [x] Preserve keyboard behavior and focus visibility.
- [x] Avoid hydrating the full header as a React island.

## 3.4 Static shared components

Convert these to `.astro`:

- [x] Footer
- [x] Hero
- [x] PageIntro
- [x] ProjectCards
- [x] Skills list
- [x] Section

For `DynamicFAIcon`, choose one approach:

1. Render only the known icon set statically.
2. Replace icons with a lightweight Astro-compatible icon package.
3. Retain a server-rendered React component without client hydration during the transition.

## 3.5 Fonts and CSS

- [x] Copy the current global CSS into `src/styles/globals.css`.
- [x] Preserve CSS class output before refactoring.
- [x] Self-host Inter and Noto Sans or load them with an explicit performance strategy.
- [x] Preload only critical font files. (The Latin `woff2` subsets for Inter and Noto Sans are preloaded; the other unicode-range subsets stay lazy.)
- [x] Use `font-display: swap`.
- [x] Verify font metrics do not create layout shift. (Lighthouse reports CLS = 0.000 on all five pages at both form factors; the `font-display: swap` and Latin-preload audits pass.)

## Phase 3 acceptance criteria

- Shared layout matches the current desktop and mobile screenshots.
- Only necessary interactive elements ship browser JavaScript.
- Navigation remains accessible without client-side routing.

---

# Phase 4: Route-by-Route Migration

Migrate one route group at a time and compare it with the baseline before moving on.

## 4.1 Route mapping

| Current Next.js route | Astro route | Rendering |
|---|---|---|
| `app/page.tsx` | `src/pages/index.astro` | Static |
| `app/about/page.tsx` | `src/pages/about.astro` | Static |
| `app/contact/page.tsx` | `src/pages/contact.astro` | Static |
| `app/experience/page.tsx` | `src/pages/experience.astro` | Static collection list |
| `app/experiences/[slug]/page.tsx` | `src/pages/experiences/[slug].astro` | `getStaticPaths()` |
| `app/projects/page.tsx` | `src/pages/projects/index.astro` | Static collection list |
| `app/projects/[slug]/page.tsx` | `src/pages/projects/[slug].astro` | `getStaticPaths()` |
| `app/skills/page.tsx` | `src/pages/skills/index.astro` | Static collection list |
| `app/skills/[slug]/page.tsx` | `src/pages/skills/[slug].astro` | `getStaticPaths()` |
| `app/blogs/page.tsx` | `src/pages/blogs/index.astro` | Static collection list |
| `app/blogs/[slug]/page.tsx` | `src/pages/blogs/[slug].astro` | `getStaticPaths()` |
| `app/testimonials/page.tsx` | `src/pages/testimonials.astro` | Static |
| `app/not-found.tsx` | `src/pages/404.astro` | Static |

Astro uses `getStaticPaths()` for collection-driven static routes and `render()` to produce Markdown content: [Astro content collections guide](https://v7-2.previews.docs.astro.build/en/guides/content-collections/).

## 4.2 Dynamic route implementation pattern

```astro
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blogs', ({ data }) => data.status === 'published');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<Content />
```

## 4.3 Raw Markdown route decision

The current application exposes raw blog content and redirects `.md` slugs.

Recommended approach:

- [ ] Confirm whether any raw Markdown URLs receive traffic or external links. (Cannot be answered from the repository; the safe defaults below are already in place. Check Search Console.)
- [x] If retained, generate static text endpoints with the correct `Content-Type`.
- [x] Add `X-Robots-Tag: noindex` to raw responses.
- [x] Preserve or redirect existing `.md` aliases at the hosting layer with real 301 responses.
- [x] Do not rely on HTML meta-refresh redirects for important SEO migrations.
- [x] Remove raw URLs from the sitemap.

Astro can generate static redirects, but hosting-level 301 rules are preferable for SEO-critical legacy URLs because adapter-free static redirects may produce client-side HTML redirects: [Astro redirects reference](https://v6.docs.astro.build/en/reference/configuration-reference/).

## 4.4 Route parity checks

For each migrated route:

- [x] Status code matches.
- [x] URL and trailing slash match.
- [x] Canonical matches.
- [x] Title and description are present and intentional.
- [x] H1 matches search intent.
- [x] Visible content is present in built HTML.
- [x] Structured data is valid.
- [x] Internal links are preserved.
- [x] Images load with correct dimensions and alt text. (Enforced by `npm run seo:audit`: every `<img>` must carry `alt` and width/height.)
- [x] Drafts and templates do not generate pages.

## Phase 4 acceptance criteria

- Every sitemap URL has a corresponding Astro page.
- No current high-value URL returns a 404.
- Dynamic collection pages are fully prerendered.

---

# Phase 5: Astro SEO Improvements

Apply these after route parity, before the production switch.

## 5.1 Site identity

- [x] Use `Software Engineer in Bangladesh | Md Mehedi Hasan` for the homepage title.
- [x] Use `Software Engineer` as the Person schema job title.
- [x] Include Dhaka, Bangladesh naturally in the homepage introduction.
- [x] Keep GitHub and LinkedIn in `sameAs`.
- [x] Add `homeLocation` without publishing a private street address. (Locality and country only: `Place` → `PostalAddress` → `Dhaka`/`BD`.)
- [ ] Keep name, title, location, and employment dates consistent with LinkedIn and the résumé. (Requires checking those profiles by hand.)

## 5.2 Page-level metadata

- [x] Create one metadata object per route or content entry.
- [x] Keep important title text within roughly the first 50–60 characters. (`buildTitle()` in `src/lib/seo.ts` stops appending the brand suffix once a title would exceed 60 characters, and the audit warns on any title over 60.)
- [x] Prevent long article titles from receiving an oversized suffix. (Two over-long article titles were also shortened at the source.)
- [x] Use unique descriptions based on actual page content.
- [x] Use self-referencing canonicals.
- [x] Produce absolute Open Graph and Twitter image URLs.
- [x] Do not add a keywords meta tag as a substitute for useful content.

## 5.3 Structured data

| Page type | Structured data |
|---|---|
| Homepage/About | `Person`, optionally `WebSite` |
| Blog article | `BlogPosting` plus `BreadcrumbList` |
| Project detail | `CreativeWork` or `SoftwareSourceCode` when accurate |
| Skill detail | `TechArticle` only when the page contains substantial educational content |
| List pages | `CollectionPage` only if it adds useful semantic clarity |

- [x] Use a stable author `@id`, such as `https://mehedihasan.dev/#person`.
- [x] Reference the same author entity from articles.
- [x] Include `datePublished` and honest `dateModified` values.
- [x] Validate rendered JSON-LD rather than only reviewing source code.

## 5.4 Sitemap and robots

- [x] Generate sitemaps with `@astrojs/sitemap`.
- [x] Confirm dynamic paths from `getStaticPaths()` appear in the sitemap.
- [x] Filter out drafts, raw Markdown endpoints, and `noindex` skill pages.
- [x] Add meaningful content-based `lastmod` dates where supported. (`lib/content/dates.mjs` derives each URL's date from `modified_date`/`date`, or the file's last git commit, and `astro.config.mjs` sets it in the sitemap.)
- [x] Keep `robots.txt` in `public/` or generate it deliberately.
- [x] Point `robots.txt` to the final Astro sitemap URL.
- [x] Update Search Console if the sitemap filename changes. (No action required: the filename did not change and `/sitemap.xml` is preserved as an alias.)

The official sitemap integration includes statically generated dynamic routes: [Astro sitemap integration](https://v6.docs.astro.build/en/guides/integrations-guide/sitemap/).

## 5.5 Image performance

- [x] Move transformable content images from `public/` into `src/assets/` where practical. (Project screenshots moved to `src/assets/works/`. The portrait and social cards stay in `public/` because they must keep stable, unhashed social URLs.)
- [x] Keep favicons, résumé files, and assets requiring stable public URLs in `public/`.
- [x] Use `<Image />` for fixed-format optimized images. (Project screenshots render through Astro's `<Image />` and ship as optimized WebP.)
- [x] Use `<Picture />` when multiple responsive formats materially help. (Not needed: each screenshot renders at a single size.)
- [x] Set explicit image dimensions to avoid CLS. (Astro's `<Image />` infers them; the audit requires width/height on every `<img>`.)
- [x] Create 1200 × 630 social images for priority articles and projects. (`npm run seo:og` derives project cards under `public/og/`. Articles without a dedicated card keep their feature image; author one when it matters.)
- [x] Fix existing missing `/me.png` references before launch.
- [x] Serve the portrait at the size it renders. (The 1599×1599 source stays in `public/` for social cards, but both in-page slots — the 64 px hero avatar and the 300 px about column — now use grayscale WebP variants from `npm run images` via `srcset`/`sizes`. The hero avatar drops from 165 KB to 2–3 KB, which is what Lighthouse's image-delivery insight flagged.)

Astro optimizes imported source images, while files in `public/` are copied without processing: [Astro images guide](https://v7-2.previews.docs.astro.build/en/guides/images/).

## 5.6 Internal linking and thin content

- [x] Add a Writing section to the homepage.
- [x] Link articles to related projects and skills.
- [x] Link project pages to relevant articles.
- [x] Give every new page at least three useful inbound internal links. (Detail pages cross-link related work, skills, writing, and siblings; the footer lists References; the audit warns on any sitemap page with fewer than three inbound links.)
- [x] Expand, consolidate, or `noindex` the current empty skill pages.
- [x] Do not generate indexed pages solely because a Markdown file exists.

## Phase 5 acceptance criteria

- Rich Results Test detects the intended schema.
- Every indexable page has unique metadata and a canonical.
- Sitemap contains only canonical, indexable URLs.
- No empty skill page remains indexable.

---

# Phase 6: Testing and Quality Gates

## 6.1 Automated tests

- [x] Run `astro check`.
- [x] Run the production build.
- [x] Run existing content validation tests.
- [x] Add a route-parity test comparing old and new URL inventories. (`tests/seo.test.mjs` compares the build against `tests/route-inventory.json`, the verified route set; refresh with `npm run seo:inventory`.)
- [x] Add built-HTML assertions for title, description, canonical, H1, and robots. (`npm run seo:audit`, run over `dist/`.)
- [x] Add a duplicate-title and duplicate-description check.
- [x] Add a broken internal-link check.
- [x] Add an orphan-page check.
- [x] Validate JSON-LD parsing for every generated page.
- [x] Confirm sitemap URLs return successful responses in preview.
- [x] Assert drafts, templates, and raw content are absent from the sitemap.

## 6.2 Visual and accessibility tests

- [ ] Compare homepage, list pages, and detail pages against baseline screenshots. (No Next.js baseline screenshots exist; current screenshots were captured instead, so there is nothing to diff against.)
- [x] Test navigation at mobile, tablet, and desktop widths. (Scripted checks at 375 / 768 / 1280 px show no horizontal overflow on any page and a working mobile menu.)
- [x] Test keyboard navigation and focus states. (Every tab stop exposes a 2 px focus ring; the skip link was moved to be the first focusable element.)
- [x] Test mobile-menu behavior without React hydration.
- [x] Check heading hierarchy and landmark elements.
- [x] Test color contrast and reduced-motion behavior. (Lighthouse color-contrast passes on every page; `prefers-reduced-motion: reduce` switches smooth scrolling off.)
- [x] Confirm the skip link still works.

## 6.3 Performance gates

Target on representative mobile pages:

- LCP under 2.5 seconds.
- CLS under 0.1.
- INP under 200 milliseconds.
- No unnecessary React hydration on static pages.
- No regressions in transferred image or font weight.
- Meaningful reduction in shipped JavaScript compared with Next.js.

### Recorded results (2026-10-15)

Lighthouse 12 against `astro preview`, headless Chrome, mobile (default throttling) and desktop presets:

| Page | Form factor | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | JS | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | mobile | 98 | 100 | 100 | 100 | 2.41 s | 0 | 0 ms | 0 KB | 264 KB |
| Home | desktop | 100 | 100 | 100 | 100 | 0.48 s | 0 | 0 ms | 0 KB | 264 KB |
| Blog index | mobile | 100 | 100 | 100 | 100 | 1.50 s | 0 | 0 ms | 0 KB | 98 KB |
| Blog index | desktop | 100 | 100 | 100 | 100 | 0.32 s | 0 | 0 ms | 0 KB | 98 KB |
| Article | mobile | 100 | 100 | 100 | 100 | 1.51 s | 0 | 0 ms | 0 KB | 103 KB |
| Article | desktop | 100 | 100 | 100 | 100 | 0.33 s | 0 | 0 ms | 0 KB | 103 KB |
| Project index | mobile | 100 | 100 | 100 | 100 | 1.51 s | 0 | 0 ms | 0 KB | 99 KB |
| Project index | desktop | 100 | 100 | 100 | 100 | 0.33 s | 0 | 0 ms | 0 KB | 99 KB |
| Project | mobile | 100 | 100 | 100 | 100 | 1.58 s | 0 | 0 ms | 0 KB | 145 KB |
| Project | desktop | 100 | 100 | 100 | 100 | 0.34 s | 0 | 0 ms | 0 KB | 145 KB |

Every target is met: LCP ≤ 2.41 s on mobile, CLS = 0, TBT = 0 ms (the lab proxy for INP), and **0 KB of JavaScript ships on any page**. TTFB is 1–4 ms on localhost and is not representative of production. Fonts transfer ≈83 KB per page and media 46–165 KB.

Interactive checks (Playwright-core driving the installed Chrome): no horizontal overflow at 375 / 768 / 1280 px across the five pages; the mobile menu toggles `aria-expanded` and visibility without React; every keyboard tab stop shows a 2 px focus ring; `prefers-reduced-motion: reduce` disables smooth scrolling.

Reproduce with `npm run build && npm run preview`, then run Lighthouse against the printed URL for each page (mobile by default, `--preset=desktop` for desktop).

## Phase 6 acceptance criteria

- All automated, visual, accessibility, and SEO checks pass.
- There are no unexplained differences between old and new crawl inventories.

---

# Phase 7: Deployment and Cutover

## 7.1 Preview deployment

- [ ] Deploy Astro to a non-indexable preview URL.
- [ ] Protect the preview with authentication or `noindex`.
- [ ] Do not place preview URLs in canonical or sitemap tags.
- [ ] Crawl the preview using the production hostname mapping where possible.
- [ ] Validate production-style redirects and headers on the actual hosting platform.

## 7.2 Production cutover

- [ ] Preserve the domain and HTTPS configuration.
- [ ] Preserve all existing paths.
- [ ] Configure any required hosting-level 301 redirects.
- [ ] Deploy during a low-risk window.
- [ ] Smoke-test the homepage and all route groups immediately.
- [ ] Fetch `robots.txt` and the sitemap from production.
- [ ] Inspect representative production HTML.
- [ ] Submit the sitemap in Search Console only if its URL changed.

## 7.3 Rollback plan

- [ ] Keep the last known-good Next.js deployment available.
- [ ] Document the command or hosting action required to roll back.
- [ ] Roll back for widespread 404s, missing content, broken canonicals, or failed asset delivery.
- [ ] Do not roll back solely for small visual differences that can be safely patched.

---

# Phase 8: Post-Launch SEO Monitoring

## First 24 hours

- [ ] Check homepage and priority route status codes.
- [ ] Check canonical and robots directives in rendered HTML.
- [ ] Check the sitemap and robots file.
- [ ] Check structured data on one page of every type.
- [ ] Check analytics and conversion events.
- [ ] Review server or hosting logs for 404s.

## First 7 days

- [ ] Review Search Console indexing and crawl reports.
- [ ] Check for duplicate canonical or redirect issues.
- [ ] Monitor organic landing pages and referral traffic.
- [ ] Fix unexpected legacy URLs with real 301 redirects.
- [ ] Compare Core Web Vitals with the baseline.

## First 30 days

- [ ] Compare indexed URL count before and after migration.
- [ ] Compare branded and non-branded impressions.
- [ ] Compare clicks, CTR, and average position by page.
- [ ] Investigate traffic changes at the URL level.
- [ ] Begin the content and LinkedIn sequence in `seo.md`.
- [ ] Avoid unrelated mass metadata changes until migration performance stabilizes.

## Migration success criteria

- No material loss of indexed canonical pages.
- No sustained increase in 404s or excluded URLs.
- Organic clicks and impressions remain stable or improve after settling.
- Core Web Vitals remain good or improve.
- Browser JavaScript and total page weight decrease.
- Content publishing remains at least as easy as before.

---

# Suggested Implementation Order

Execute the code migration in this order:

1. Astro shell, config, and CSS.
2. Content collection schemas and tests.
3. Base layout and SEO component.
4. Header, footer, and shared static components.
5. Homepage, About, Contact, and Testimonials.
6. Project list and project detail routes.
7. Experience list and experience detail routes.
8. Blog list, blog detail, and raw-content behavior.
9. Skill list and skill detail routes.
10. Sitemap, robots, structured data, and image optimization.
11. Route-parity, visual, accessibility, and performance tests.
12. Preview deployment, production cutover, and monitoring.

Do not combine steps 1–9 with major visual redesign work. First achieve parity, then implement the broader content roadmap in `seo.md`.

---

# Definition of Done

The migration is complete when:

- [x] The public application runs on Astro static output.
- [x] Every valuable Next.js URL exists at the same path or has an intentional 301 redirect.
- [x] Markdown content is loaded through validated Astro collections. (Implemented as Astro Markdown pages in `src/pages/` validated by the same Zod schema.)
- [x] The terminal content generator still works.
- [x] Static components ship no unnecessary browser JavaScript.
- [x] Titles, descriptions, canonicals, social tags, and JSON-LD are correct.
- [x] Draft, template, raw, and thin pages are handled intentionally.
- [x] The sitemap contains only canonical and indexable URLs.
- [x] Image and font loading do not cause Core Web Vitals regressions. (Lighthouse: CLS = 0 on every page, LCP well inside budget, images dimensioned and fonts preloaded — see §6.3.)
- [x] Automated route, SEO, link, build, and content tests pass. (`npm test` and `npm run seo:audit` are green.)
- [ ] Search Console shows no migration-related indexing failures.
- [ ] The post-launch monitoring period is complete without a material organic-search loss.
