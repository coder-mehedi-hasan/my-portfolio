# Mehedi Hasan — Portfolio

A Next.js portfolio with Markdown-managed projects, experience, skills, and writing. Content is validated with Zod and rendered through shared readers. No database or admin service is needed.

## Development

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000), or the port printed by Next.js.

```sh
npm run content:validate
npm run content:test
npm run lint
npm run build
```

`npm run build` validates all content before building. Invalid content stops the build with the filename and field to fix. Google Fonts require network access during a fresh build. Development uses `.next/`; production builds use `.next-production/` so a running dev server cannot overwrite production artifacts.

## Add content

Use one command for all four collections:

```sh
npm run content -- new projects my-new-project --data '{"title":"My new project","sub_title":"A useful product"}'
npm run content -- new experiences my-new-role --data '{"designation":"Software Engineer","company_name":"Company","location":"Dhaka"}'
npm run content -- new skills playwright --data '{"title":"Playwright","category":"Testing & API tools","sub_title":"Browser automation and end-to-end testing."}'
npm run content -- new blogs lessons-learned --data '{"title":"Lessons learned","excerpt":"Notes from building a product."}'
```

The command copies the matching `_template.md`, fills today's date (or start date), and creates a **draft**. Open the generated Markdown file, replace the starter text, and review every field. Pass an explicit date in `--data` for historical work. Existing files are never overwritten by `new`.

You can also copy a template manually. Use a unique kebab-case filename such as `my-new-project.md`. The filename determines the URL; there is no `slug` frontmatter field. Files beginning with `_` are excluded from listings and validation.

## Update content

Edit the Markdown file directly, or use the same update command for any collection:

```sh
npm run content -- update projects my-new-project --data '{"title":"Updated title","tools":["Next.js","PostgreSQL"]}'
npm run content -- update experiences my-new-role --unset end_date
npm run content -- update blogs lessons-learned --body-file /path/to/article-body.md
npm run content -- update projects my-new-project --data-file /path/to/metadata.json
```

`--data` and `--data-file` merge frontmatter fields. Array fields replace the previous array. The Markdown body is preserved unless `--body-file` supplies a replacement; this file should contain only the body, without frontmatter. `--unset` removes optional fields (comma-separated). CLI updates reformat frontmatter and remove its comments. Validation happens before saving; failed updates leave the original file unchanged.

## Publish and feature content

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
- `featured: true` selects homepage content: up to **two projects** and **three skill categories with three featured skills each**. Lower `featured_order` appears first. Only published featured entries qualify; unfeatured entries remain on their full listing page.
- Each skill is a separate file with a required `category`. The Skills page groups entries by that field. Category names are free-form; reuse the exact same spelling to group skills together.
- The homepage groups featured skills by category, using `featured_order` to order skills and the first appearance of each category. It shows at most three groups and three skills per group, with links to the individual pages. Full listings use `sort_index`.
- `featured` and `featured_order` are available on every collection for consistency; only projects and skills currently use them on the homepage.

```sh
npm run content -- list projects
npm run content -- list experiences
npm run content -- list skills
npm run content -- list blogs
npm run content -- --help
```

## Content structure and fields

```text
content/
  projects/       # /projects and /projects/<slug>
  experiences/    # /experience and /experiences/<slug>
  skills/         # /skills, /skills/<slug>, and homepage highlights
  blogs/          # /blogs and /blogs/<slug>
```

Each folder includes a ready-to-copy `_template.md`.

All collections support `status`, `sort_index`, `featured`, and `featured_order`. Order fields must be non-negative integers. Unknown frontmatter fields are rejected to catch typos.

| Collection | Required fields | Optional fields |
| --- | --- | --- |
| Projects | `title`, `sub_title`, `date` | `description`, `tools`, `image`, `live_url`, `icon`, legacy `url` |
| Experiences | `designation`, `company_name`, `location`, `start_date` | `end_date`, `job_type`, `description`, `icon` |
| Skills | `title`, `category`, `sub_title` | `description`, `icon` |
| Blogs | `title`, `excerpt`, `date` | `author`, `feature_image`, `tags` |

Use quoted `YYYY-MM-DD` dates. Experience end dates cannot precede start dates; omit `end_date` for current roles. Website URLs must start with `http://` or `https://`. Images accept a public path such as `/projects/example.png` or an HTTP(S) URL. Lists such as `tools` and `tags` must contain nonempty strings.

Blogs default to author `Md Mehedi Hasan` and image `/me.png` when omitted. Existing explicit image values are preserved. Images for projects are optional. Put local image assets under `public/` and reference them without the `public` prefix.

Published projects, experiences, and blogs require a nonempty Markdown body. Use `##` and `###` headings: the page already supplies the main title. Templates offer a suggested structure, not mandatory heading names. Each skill’s Markdown body is rendered on its own `/skills/<slug>` page. An empty body is allowed and shows a short “notes will be added” message. Adding notes later requires editing only that skill’s file.

Markdown is trusted repository content. Only accept edits from trusted contributors; HTML in Markdown is rendered as authored.

## Raw blog Markdown

- `/blogs/<slug>` — rendered article
- `/blogs/<slug>.md` — redirects to the raw Markdown route
- `/blogs/raw/<slug>` — raw Markdown for a published article
- `/blogs/_template.md` — the public starter template

Drafts are excluded from raw article routes as well as rendered pages.

## Extending the system

- `lib/content/schema.mjs` defines the collection registry and field validation. TypeScript content types are inferred from these schemas.
- `lib/content/store.mjs` handles reads, sorting, draft visibility, featured selection, creation, and updates.
- `scripts/content.mjs` exposes the generic CLI.
- `utils/content.ts` and `utils/blogs.ts` provide typed readers and Markdown rendering for the pages.
- `tests/content.test.mjs` checks draft visibility, validation, ordering, overwrite prevention, update preservation, and CLI behavior in temporary directories.

To add a collection, register its schema, add `content/<collection>/_template.md`, and create the public page(s) that use it. The CLI and validator discover registered collections automatically. Profile text, navigation, and site-wide settings remain in the application code; these four collections are managed through Markdown.

## Write about an individual skill

For example, `content/skills/react.md` owns the React summary, category, homepage visibility, and long-form notes:

```markdown
---
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

To move a skill to another group, update its `category`; no page code changes are needed. The existing category files have been replaced by individual skill files, with repeated tools consolidated into a single entry.
