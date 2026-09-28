const PHASE_DEVELOPMENT_SERVER = 'phase-development-server';

const DEV_DIST_DIR = '.next';
const PROD_DIST_DIR = '.next-production';

/**
 * Resolves the Next.js output directory.
 *
 * Vercel hardcodes `.next` as its build output directory, so the custom
 * distDir has to stay local-only. Locally it keeps a running dev server
 * from overwriting production build artifacts.
 *
 * Shared by next.config.ts and next-sitemap.config.js so the two cannot drift.
 */
function getDistDir(phase) {
  const isLocalBuild = !process.env.VERCEL;

  if (!isLocalBuild || phase === PHASE_DEVELOPMENT_SERVER) {
    return DEV_DIST_DIR;
  }

  return PROD_DIST_DIR;
}

module.exports = { getDistDir, DEV_DIST_DIR, PROD_DIST_DIR };
