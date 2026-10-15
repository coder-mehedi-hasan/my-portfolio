import { profileLinks } from './profile';

export const SITE_URL = 'https://mehedihasan.dev';
export const SITE_NAME = 'Md Mehedi Hasan Portfolio';
export const DEFAULT_TITLE = 'Md Mehedi Hasan | Full-Stack Developer';
export const DEFAULT_DESCRIPTION =
  'I am Md Mehedi Hasan, a full-stack developer building fast, scalable and user-friendly web applications with React, Node.js, Next.js and more. Explore my projects, experience and blogs.';
export const DEFAULT_OG_IMAGE = '/md-mehedi-hasan-portfolio.jpg';
/** Stable identifier so articles can reference the same author entity. */
export const PERSON_ID = `${SITE_URL}/#person`;

/**
 * Intrinsic pixel dimensions for the local social images. Declaring accurate
 * `og:image:width`/`og:image:height` lets crawlers lay out rich previews; images
 * that are remote or not listed here simply omit the dimensions.
 */
export const OG_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/md-mehedi-hasan-portfolio.jpg': { width: 1599, height: 1599 },
  '/me.jpg': { width: 960, height: 699 },
  '/me2.png': { width: 585, height: 426 },
  '/me3-removebg-preview.png': { width: 500, height: 500 },
  '/testimonial-banner.png': { width: 1383, height: 326 },
  '/works/espd.png': { width: 1326, height: 619 },
  '/works/satujobs.com.png': { width: 1475, height: 889 },
  '/works/senior-places.png': { width: 1092, height: 627 },
  '/works/web.kotha.app-chat.png': { width: 1475, height: 891 },
};

/** Look up declared dimensions for a same-origin image, or `undefined`. */
export function ogImageDimensions(
  imageUrl: string,
  site: URL | string = SITE_URL,
): { width: number; height: number } | undefined {
  try {
    const image = new URL(imageUrl);
    return image.origin === new URL(site).origin ? OG_IMAGE_DIMENSIONS[image.pathname] : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The build uses `build.format: 'file'`, which makes `Astro.url.pathname` end in
 * `.html`. Public URLs never do, so strip it (and any trailing slash) here.
 */
export function normalizePath(pathname: string): string {
  let path = pathname.split('?')[0].split('#')[0];
  if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length);
  else if (path.endsWith('.html')) path = path.slice(0, -'.html'.length);
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path === '' ? '/' : path;
}

/** Absolute, canonical URL for a path or full URL. */
export function absoluteUrl(value: string, site: URL | string = SITE_URL): string {
  return new URL(value, site).href;
}

/** JSON-LD is injected with `set:html`, so `<` must be escaped to stay inert. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Md Mehedi Hasan',
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    jobTitle: 'Full-Stack Developer',
    sameAs: [profileLinks.github, profileLinks.linkedin],
    worksFor: [
      { '@type': 'Organization', name: 'Graphland' },
      { '@type': 'Organization', name: 'Interspeed Digital Solutions' },
    ],
  };
}

/**
 * Plain-text version of the first body paragraph, used as a meta-description
 * fallback for entries that omit an explicit `description`. Keeps descriptions
 * content-based (and unique) instead of duplicating the site default.
 */
export function firstParagraph(markdown: string | undefined, maxLength = 160): string | undefined {
  if (!markdown) return undefined;
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('---'));
  if (!paragraph) return undefined;

  const text = paragraph
    .replace(/^>\s?/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return undefined;
  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
