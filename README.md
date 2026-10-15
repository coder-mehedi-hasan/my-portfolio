# Mehedi Hasan — Portfolio

An Astro portfolio with Markdown-managed projects, experience, skills, and writing. Content lives directly in `src/pages/` as Astro Markdown pages, is validated with Zod, and is rendered through shared layouts. No database or admin service is needed.

## Development

```sh
bun install
npm run dev
```

Open [localhost:4321](http://localhost:4321).

```sh
npm run content:validate
npm run content:test
npm run generator
npm run check
npm run build
```

`npm run build` validates all content before building (via `prebuild`) and writes the sitemap alias afterwards (via `postbuild`). Invalid content stops the build with the filename and field to fix. Static output is written to `dist/`.

| Script | What it does |
| --- | --- |
| `dev` | Start the Astro dev server |
| `build` | Validate content, build to `dist/`, then write `dist/sitemap.xml` |
| `preview` | Preview the built site locally |
| `check` | Run `astro check` (types, diagnostics) |
| `test` | Run the content tests and then the built-site SEO tests |
| `content` | Generic content CLI (`new`, `update`, `list`) |
| `content:validate` | Validate every entry and report issues |
| `content:test` | Run the content store/CLI tests |
| `seo:audit` | Audit the built HTML: metadata, canonicals, links, images, JSON-LD, sitemap |
| `seo:inventory` | Refresh `tests/route-inventory.json` from the build (route parity) |
| `seo:og` | Derive 1200 × 630 social cards from entry images |
| `images` | Derive the responsive WebP portrait variants under `public/portrait/` |
| `generator` | Open the terminal content generator (Bun) |

## Content model

Each collection lives under `src/pages/<type>/` as plain Markdown. Astro routes every file directly, so the filename is the URL and there is no `slug` frontmatter field:

```text
src/pages/
  projects/       # /projects and /projects/<slug>
  experiences/    # /experience and /experiences/<slug>
  skills/         # /skills, /skills/<slug>, and homepage highlights
  blogs/          # /blogs and /blogs/<slug>
```

Every file declares its detail layout in frontmatter, so the Markdown page and the page template stay in one place:

```markdown
---
layout: ../../layouts/ProjectDetail.astro
title: "Project name"
---
```

Each folder includes a ready-to-copy `_template.md`. Any file or folder whose name starts with `_` is never routed by Astro, which is exactly how drafts are stored.

## Content generator

`npm run generator` opens a terminal UI for the same four collections. It reads and writes the same Markdown files through the same validation as the CLI, so anything it produces passes `npm run content:validate`.

```sh
npm run generator
```

Browse screen: `n` creates, `p` publishes or moves an entry back to draft, `/` filters, `↑`/`↓` move, `tab` switches collection, `q` quits.

Editor screen: `tab` and `shift+tab` move between fields, `ctrl+s` saves and returns to the list, `esc` cancels. Fields come from the Zod schema, so required fields are enforced before anything is written. The header and the status line both name the file a save would write, the slug is derived from the title until you edit it, and a save that cannot happen says so on the status line and moves focus to the field to fix. The Markdown body is a full-height editor beside the frontmatter fields.

The generator is deliberately create-and-publish only. Changing existing content is a deliberate act, so use `npm run content -- update` or edit the Markdown files directly. Removing an entry means deleting its file:

```sh
npm run content -- update projects my-new-project --data '{"description":"Rewritten."}'
npm run content -- update projects my-new-project --unset image,live_url
rm src/pages/projects/my-new-project.md
```

The generator needs [Bun](https://bun.sh) 1.3 or newer because OpenTUI's native core needs Bun's runtime. The npm script starts Bun for you; `bun install` already added the dependencies.

Point `CONTENT_ROOT` at another content tree to run the generator against a scratch copy:

```sh
CONTENT_ROOT=/tmp/content-scratch npm run generator
```

## Add content

Use one command for all four collections:

```sh
npm run content -- new projects my-new-project --data '{"title":"My new project","sub_title":"A useful product"}'
npm run content -- new experiences my-new-role --data '{"designation":"Software Engineer","company_name":"Company","location":"Dhaka"}'
npm run content -- new skills playwright --data '{"title":"Playwright","category":"Testing & API tools","sub_title":"Browser automation and end-to-end testing."}'
npm run content -- new blogs lessons-learned --data '{"title":"Lessons learned","excerpt":"Notes from building a product."}'
```

The command copies the matching `src/pages/<type>/_template.md`, fills today's date (or start date), and creates a **draft** named `_<slug>.md`. Open the generated Markdown file, replace the starter text, and review every field. Pass an explicit date in `--data` for historical work. Existing files are never overwritten by `new`.

You can also copy a template manually. Use a unique kebab-case filename such as `my-new-project.md`. The filename determines the URL; there is no `slug` frontmatter field. Files beginning with `_` are excluded from listings and validation.

## Update content

Edit the Markdown file directly, or use the same update command for any collection:

```sh
npm run content -- update projects my-new-project --data '{"title":"Updated title","tools":["Astro","PostgreSQL"]}'
npm run content -- update experiences my-new-role --unset end_date
npm run content -- update blogs lessons-learned --body-file /path/to/article-body.md
npm run content -- update projects my-new-project --data-file /path/to/metadata.json
```

`--data` and `--data-file` merge frontmatter fields. Array fields replace the previous array. The Markdown body is preserved unless `--body-file` supplies a replacement; this file should contain only the body, without frontmatter. `--unset` removes optional fields (comma-separated). CLI updates reformat frontmatter and remove its comments. Validation happens before saving; failed updates leave the original file unchanged.

## Publish and feature content

Publishing renames the draft file to its public name (dropping the leading `_`):

```sh
npm run content -- update projects my-new-project --data '{"status":"published","featured":true,"featured_order":0}'
npm run content -- update blogs lessons-learned --data '{"status":"published"}'
npm run content:validate
```

Review the result locally, then commit your content and deploy through your normal workflow. The commands do not commit, push, or deploy. The production site uses build-time content, so additions and updates need a new build/deployment.

- `status: draft` hides an entry from public lists, detail routes, and raw Markdown routes. CLI `list` includes drafts. There is no public draft preview.
- `status: published` makes an entry eligible for the next build. A future date does **not** schedule publication.
- Existing entries without `status` remain published for compatibility. New entries default to draft.
- `sort_index` controls listing order for projects, experience, and skills; lower numbers come first. Ties use the slug.
- Blogs are ordered by date, newest first, then slug.
- `featured: true` selects homepage content: up to **two projects**, **every featured experience**, and **three skill categories with three featured skills each**. Lower `featured_order` appears first. Only published featured entries qualify; unfeatured entries remain on their full listing page.
- The homepage Experience section shows featured experiences only, ordered by `featured_order`. `/experience` and `/about` keep showing every published experience regardless of `featured`. The section is hidden entirely when nothing is featured.
- Each skill is a separate file with a required `category`. The Skills page groups entries by that field. Category names are free-form; reuse the exact same spelling to group skills together.
- The homepage groups featured skills by category, using `featured_order` to order skills and the first appearance of each category. It shows at most three groups and three skills per group, with links to the individual pages. Full listings use `sort_index`.
- `featured` and `featured_order` are available on every collection for consistency; projects, experiences, and skills all use them on the homepage.

```sh
npm run content -- list projects
npm run content -- list experiences
npm run content -- list skills
npm run content -- list blogs
npm run content -- --help
```

## Content structure and fields

```text
src/pages/
  projects/       # /projects and /projects/<slug>
  experiences/    # /experience and /experiences/<slug>
  skills/         # /skills, /skills/<slug>, and homepage highlights
  blogs/          # /blogs and /blogs/<slug>
```

Each folder includes a ready-to-copy `_template.md`.

All collections support `status`, `sort_index`, `featured`, `featured_order`, and the SEO fields `modified_date`, `social_image`, and `canonical`. Order fields must be non-negative integers. Unknown frontmatter fields are rejected to catch typos. The `layout` field is managed by Astro and is not part of the content schema.

| Collection | Required fields | Optional fields |
| --- | --- | --- |
| Projects | `title`, `sub_title`, `date` | `description`, `tools`, `image`, `live_url`, `icon`, legacy `url` |
| Experiences | `designation`, `company_name`, `location`, `start_date` | `end_date`, `job_type`, `description`, `icon` |
| Skills | `title`, `category`, `sub_title` | `description`, `icon` |
| Blogs | `title`, `excerpt`, `date` | `author`, `feature_image`, `tags` |

Every collection also accepts `modified_date` (drives `dateModified` and the sitemap `lastmod`), `social_image` (overrides the Open Graph/Twitter card), and `canonical` (a deliberate canonical override for consolidated or syndicated pages).

Use quoted `YYYY-MM-DD` dates. Experience `start_date` and `end_date` are display text: any non-empty string works (for example `September 2023` or `2023-10-03`) and is rendered exactly as written. Omit `end_date` for current roles. Website URLs must start with `http://` or `https://`. Images accept a public path such as `/projects/example.png` or an HTTP(S) URL. Lists such as `tools` and `tags` must contain nonempty strings.

Blogs default to author `Md Mehedi Hasan` and image `/me.jpg` when omitted. Existing explicit image values are preserved. Images for projects are optional. Project screenshots live in `src/assets/works/` and are optimized by Astro's `<Image />`; frontmatter still references them by their `/works/<file>` path. Stable assets — favicons, the résumé, the portrait used as the default social image — stay in `public/`, as do the generated 1200 × 630 cards under `public/og/`.

Published projects, experiences, and blogs require a nonempty Markdown body. Use `##` and `###` headings: the page already supplies the main title. Templates offer a suggested structure, not mandatory heading names. Each skill's Markdown body is rendered on its own `/skills/<slug>` page. An empty body is allowed and shows a short “notes will be added” message; those thin pages are marked `noindex` and kept out of the sitemap. Adding notes later requires editing only that skill's file.

Markdown is trusted repository content. Only accept edits from trusted contributors; HTML in Markdown is rendered as authored.

## Raw blog Markdown

- `/blogs/<slug>` — rendered article
- `/blogs/<slug>.md` — redirects to the raw Markdown route (see `vercel.json`)
- `/blogs/raw/<slug>` — raw Markdown for a published article
- `/blogs/_template.md` — the public starter template

Drafts are excluded from raw article routes as well as rendered pages.

## SEO

The built site is audited, not just reviewed by eye. `npm run build && npm run seo:audit` fails on a missing or duplicate title/description, a missing or non-absolute canonical, a missing `robots` directive, a page without exactly one `<h1>`, unparseable JSON-LD, an image without `alt` or width/height, a broken internal link, an orphan page, or a sitemap entry that is missing, `noindex`, or not self-canonical. It also warns about over-long titles and pages with fewer than three inbound internal links.

- `scripts/seo-audit.mjs` reads `dist/` only, so it checks exactly what a crawler receives.
- `scripts/route-inventory.mjs` writes `tests/route-inventory.json`. `tests/seo.test.mjs` compares the build against it so a migration never silently drops a URL; run `npm run seo:inventory` when a route change is intentional.
- `scripts/og-images.mjs` crops entry images into 1200 × 630 cards under `public/og/`; point `social_image` at the card.
- `scripts/sitemap-alias.mjs` copies the generated sitemap index to the legacy `/sitemap.xml` so the URL Search Console knows keeps working.
- Sitemap `lastmod` values come from content (`modified_date`/`date`, or the file's last git commit) rather than the build time, via `lib/content/dates.mjs`.

## Extending the system

- `lib/content/schema.mjs` defines the collection registry and field validation. TypeScript content types are inferred from these schemas.
- `lib/content/store.mjs` handles reads, sorting, draft visibility (underscore-prefixed files), featured selection, creation, updates, and deletion.
- `scripts/content.mjs` exposes the generic CLI.
- `tools/generator/` holds the terminal UI. `fields.ts` derives the form from the schema, so a new field appears in both the CLI and the generator without extra wiring. It has its own `tsconfig.json` and runs under Bun.
- `src/lib/content.ts` loads the Markdown pages at build time (via `import.meta.glob` + `gray-matter`) and exposes typed readers to the pages and layouts.
- `src/layouts/*Detail.astro` render the detail pages; each Markdown file opts in through its `layout:` frontmatter.
- `src/layouts/*Detail.astro` also cross-link related work, skills, writing, and sibling pages so no page is an orphan.
- `tests/content.test.mjs` checks draft visibility, validation, ordering, overwrite prevention, update preservation, and CLI behavior in temporary directories.
- `tests/seo.test.mjs` audits the built site and compares its routes against `tests/route-inventory.json`, the verified public route set.

To add a collection, register its schema, add `src/pages/<collection>/_template.md`, create the detail layout, and add the public page(s) that use it. The CLI and validator discover registered collections automatically. Profile text, navigation, and site-wide settings remain in the application code; these four collections are managed through Markdown.

## Write about an individual skill

For example, `src/pages/skills/react.md` owns the React summary, category, homepage visibility, and long-form notes:

```markdown
---
layout: ../../layouts/SkillDetail.astro
title: "React"
category: "Frontend & mobile"
sub_title: "Component-based web interfaces."
status: published
featured: true
featured_order: 0
sort_index: 0
---

## How I use React

Write about your approach and link to relevant projects.

## Lessons learned

Add code examples, patterns, or notes as you learn.
```

Share the resulting `/skills/react` URL. The page has its own title, description, canonical URL, and social metadata. Other skills from the same category appear below the notes. Draft skills are excluded from listings, related links, homepage highlights, and detail pages.

To move a skill to another group, update its `category`; no page code changes are needed.
