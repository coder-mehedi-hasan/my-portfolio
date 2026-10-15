import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { listEntries } from './lib/content/store.mjs';
import { contentLastmod } from './lib/content/dates.mjs';

const SITE_URL = 'https://mehedihasan.dev';

// Content-based `lastmod` values, so crawlers see a real change date instead of
// the time of every build.
const lastmod = contentLastmod();

// Thin skill pages (frontmatter only) must not be indexed, so keep them out of the
// sitemap. Detail pages apply the same rule in `src/layouts/SkillDetail.astro`.
const thinSkillPaths = new Set(
  listEntries('skills')
    .filter(entry => !entry.body.trim())
    .map(entry => `/skills/${entry.slug}`),
);

// Raw Markdown endpoints are deliberately noindex and never belong in the sitemap.
const isExcludedUrl = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/blogs/raw/') || thinSkillPaths.has(pathname);
};

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // The Next.js site served extensionless URLs (`/about`, not `/about/`), so emit
  // `about.html` files and keep `Astro.url.pathname` free of trailing slashes.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Fail the build on duplicate content slugs rather than silently shadowing one.
  prerenderConflictBehavior: 'error',
  markdown: {
    // The previous site rendered Markdown with `marked` and no syntax highlighting.
    // Disabling Shiki keeps the rendered HTML and the shipped JavaScript comparable.
    syntaxHighlight: false,
    // `marked` left straight quotes/apostrophes alone; Astro's default smartypants
    // would rewrite them, so keep the source text byte-for-byte.
    smartypants: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !isExcludedUrl(page),
      serialize(item) {
        const { pathname } = new URL(item.url);
        const date = lastmod[pathname];
        return date ? { ...item, lastmod: new Date(date) } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
