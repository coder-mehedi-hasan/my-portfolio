// next-sitemap loads this config as CommonJS, so require() is required here.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDistDir, DEV_DIST_DIR } = require('./next-dist-dir.js');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // postbuild runs after next build, so target the same directory the build used.
    sourceDir: getDistDir(DEV_DIST_DIR),
    siteUrl: 'https://mehedi-info.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude: ['/private'],
};
