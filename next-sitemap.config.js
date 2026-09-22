/** @type {import('next-sitemap').IConfig} */
module.exports = {
    sourceDir: '.next-production',
    siteUrl: 'https://mehedi-info.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude: ['/private'],
};
