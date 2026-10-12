# SEO Execution Plan

## Goal

Build a consistent search identity for:

> **Md Mehedi Hasan — Software Engineer in Dhaka, Bangladesh, specializing in full-stack web, mobile, healthcare, and platform engineering.**

Primary outcomes:

1. Rank for searches around `Md Mehedi Hasan`, `software engineer in Bangladesh`, and `software engineer in Dhaka`.
2. Attract relevant software engineering roles, freelance projects, and professional connections.
3. Build authority through useful technical writing based on real project experience.
4. Connect the portfolio, blog, LinkedIn, GitHub, and search profiles into one consistent professional entity.

## Positioning Rules

- Lead with **Software Engineer** everywhere.
- Use **full-stack web and mobile engineering** as the specialization.
- Use the location naturally as **Dhaka, Bangladesh** or **software engineer in Bangladesh**.
- Keep the same name everywhere: **Md Mehedi Hasan**.
- Use `https://mehedihasan.dev` as the canonical personal website.
- Do not create repetitive location/technology doorway pages.
- Publish first-hand lessons, examples, decisions, and results instead of generic AI-written summaries.

---

# Platform 1: Portfolio Website

Complete this platform first because every other platform will link back to it.

## 1.1 Homepage positioning

- [ ] Change the default title to `Software Engineer in Bangladesh | Md Mehedi Hasan`.
- [ ] Change the visible role from `Full-stack developer` to `Software Engineer`.
- [ ] Replace the current H1 with `Software engineer building web, mobile, and platform products`.
- [ ] Mention `Dhaka, Bangladesh` in the first visible introduction paragraph.
- [ ] Keep React, Next.js, Node.js, React Native, and PostgreSQL in supporting copy.
- [ ] Add a visible link to the Writing section from the homepage.
- [ ] Add a short availability statement if actively seeking work or contracts.

Recommended homepage description:

> Md Mehedi Hasan is a software engineer in Dhaka, Bangladesh, building full-stack web and mobile products with React, Next.js, Node.js, React Native, and PostgreSQL.

## 1.2 Core page titles

| Page | Target title |
|---|---|
| `/` | `Software Engineer in Bangladesh | Md Mehedi Hasan` |
| `/about` | `About Md Mehedi Hasan, Software Engineer in Bangladesh` |
| `/projects` | `Software Engineering Projects | Md Mehedi Hasan` |
| `/experience` | `Software Engineering Experience | Md Mehedi Hasan` |
| `/skills` | `Software Engineering Skills | Md Mehedi Hasan` |
| `/blogs` | `Software Engineering Writing | Md Mehedi Hasan` |
| `/contact` | `Contact Md Mehedi Hasan | Software Engineer` |

## 1.3 About and experience pages

- [ ] Open the About page with the name, role, location, and specialization.
- [ ] Explain the industries worked in: healthcare, e-commerce, social platforms, and business systems.
- [ ] Link the About page to the strongest projects and articles.
- [ ] Use `Dhaka, Bangladesh` instead of the abbreviation `BD` in experience entries.
- [ ] Ensure company names, titles, and dates match LinkedIn and the résumé.
- [ ] Add measurable outcomes where evidence is available.
- [ ] Avoid inventing traffic, revenue, performance, or team-size numbers.

## 1.4 Project case studies

Give each important project one primary search purpose.

| Project | Primary angle |
|---|---|
| MyCare360 | React Native healthcare app and offline-first mobile engineering |
| QuantumLeap EMR | Electronic medical record software development |
| LabQFusion LIS | Laboratory information system and RabbitMQ workflows |
| StoreOS | NestJS and Next.js SaaS e-commerce architecture |
| Gravitee JSON–HL7 Policy | Java, HL7, healthcare integration, and open source |
| Kotha Web | Real-time chat and frontend engineering in Bangladesh |

For every flagship case study:

- [ ] Write a unique, query-aligned title and description.
- [ ] Explain the problem, constraints, role, architecture, decisions, and result.
- [ ] Add links to relevant skills and articles.
- [ ] Add a link back from at least three related pages.
- [ ] Use descriptive image alt text.
- [ ] Add project or creative-work structured data where appropriate.

## 1.5 Skill-page quality

The current individual skill pages have frontmatter but no body content. Do not leave all of them indexed as thin pages.

First priority skills:

1. React Native
2. Node.js
3. Next.js
4. NestJS
5. TypeScript
6. React
7. PostgreSQL
8. Docker
9. CI/CD
10. RabbitMQ

For each priority skill:

- [ ] Add 300–600 words of original content.
- [ ] Describe where the skill was used.
- [ ] Include one real engineering decision or lesson.
- [ ] Link to related projects, experience, and writing.
- [ ] Add a unique title and meta description.

For all remaining empty skill pages:

- [ ] Either write useful content, consolidate them into a broader page, or temporarily apply `noindex`.
- [ ] Remove `noindex` pages from the XML sitemap.

## 1.6 Technical SEO

- [ ] Change Person schema `jobTitle` to `Software Engineer`.
- [ ] Add `homeLocation` for Dhaka, Bangladesh without publishing a private street address.
- [ ] Keep GitHub and LinkedIn in the Person schema `sameAs` list.
- [ ] Add `BlogPosting` schema to every article.
- [ ] Add breadcrumb schema to article, project, skill, and experience detail pages.
- [ ] Add `datePublished` and `dateModified` to articles.
- [ ] Confirm every indexable page has one self-referencing canonical.
- [ ] Prevent raw Markdown routes from being indexed.
- [ ] Give stable pages realistic sitemap frequencies.
- [ ] Generate sitemap `lastmod` values from content changes rather than every build.
- [ ] Exclude drafts, raw routes, and thin `noindex` pages from the sitemap.
- [ ] Validate schema with Google Rich Results Test after deployment.
- [ ] Check mobile Core Web Vitals after deployment.

## 1.7 Known fixes

- [ ] Replace missing `/me.png` references in blog frontmatter with valid images.
- [ ] Shorten long article titles before the global brand suffix is applied.
- [ ] Add article-specific social sharing images at 1200 × 630 pixels.
- [ ] Confirm all project URLs use HTTPS where supported.
- [ ] Check internal and outbound links for 404s.

## Website success criteria

- All indexed pages contain useful original content.
- Homepage clearly states role and location above the fold.
- Every new page has at least three contextual internal links.
- All important pages have valid metadata, canonical URLs, and schema.
- Search Console reports no unexpected indexing or structured-data errors.

---

# Platform 2: Google Search Console

Start after the first website fixes are deployed.

## Setup

- [ ] Verify the domain property for `mehedihasan.dev`.
- [ ] Submit `https://mehedihasan.dev/sitemap.xml` once.
- [ ] Inspect the homepage, About page, project index, blog index, and flagship articles.
- [ ] Request indexing only after meaningful new or corrected content is deployed.
- [ ] Review Page Indexing and Core Web Vitals reports.

## Weekly workflow

- [ ] Export query and page performance for the previous 28 days.
- [ ] Find queries in positions 8–20 with meaningful impressions.
- [ ] Find pages in positions 1–5 with weak click-through rates.
- [ ] Check whether multiple pages compete for the same query.
- [ ] Update one page at a time and record the baseline.
- [ ] Wait three to four weeks before judging a title or content change.

## Initial query groups

- `Md Mehedi Hasan`
- `Mehedi Hasan software engineer`
- `software engineer in Bangladesh`
- `software engineer in Dhaka`
- `React Native developer Bangladesh`
- `Node.js developer Bangladesh`
- `Next.js developer Bangladesh`
- `healthcare software engineer`
- Article-specific deployment and architecture queries

## Search Console success criteria

- Branded pages are indexed and returned for name searches.
- Non-branded impressions grow month over month.
- Priority pages move from positions 8–20 toward the first page.
- Sitemap and canonical reports contain no unexplained conflicts.

---

# Platform 3: Bing Webmaster Tools

- [ ] Verify the domain or import the site from Google Search Console.
- [ ] Submit the sitemap.
- [ ] Inspect the homepage and priority articles.
- [ ] Review crawl and index coverage monthly.
- [ ] Keep page language declared as English.
- [ ] Use IndexNow only if it can be maintained reliably.

Success criterion: priority pages are indexed without crawl or canonical errors.

---

# Platform 4: LinkedIn

LinkedIn should repeat and validate the website positioning.

## 4.1 Profile optimization

Recommended headline:

> Software Engineer | React, Next.js, Node.js & React Native | Web, Mobile and Healthcare Platforms | Dhaka, Bangladesh

- [ ] Use `Md Mehedi Hasan` as the profile name.
- [ ] Set location to Dhaka, Bangladesh.
- [ ] Add `https://mehedihasan.dev` to Contact Info.
- [ ] Use the same profile photo and professional title as the website.
- [ ] Rewrite About using role, specializations, industries, proof, and contact CTA.
- [ ] Align employment titles and dates with the website and résumé.
- [ ] Add portfolio case studies to relevant Experience entries.
- [ ] Add the portfolio, strongest case study, and strongest article to Featured.
- [ ] List the same priority skills used on the website.

## 4.2 About-section structure

1. Who you are and where you are based.
2. What types of software you build.
3. Your primary web, mobile, backend, and infrastructure stack.
4. Industries and representative projects.
5. What opportunities or collaborations you welcome.
6. Link to the portfolio.

## 4.3 Publishing workflow

For every website article:

- [ ] Publish one LinkedIn post with the problem, one key lesson, and the article link.
- [ ] Use a tagged link: `?utm_source=linkedin&utm_medium=social&utm_campaign=ARTICLE_SLUG`.
- [ ] Publish one follow-up post showing a diagram, code decision, or mistake learned.
- [ ] Reply to relevant technical comments with useful context.
- [ ] Avoid copying the complete article into LinkedIn.

Suggested cadence:

- One original technical post each week.
- One project or engineering lesson each week.
- One new long-form website article every two weeks.

## LinkedIn success criteria

- Profile views from relevant engineering and hiring audiences increase.
- Featured links receive measurable portfolio visits.
- Posts generate conversations, profile searches, and qualified connections.
- Titles, dates, and professional positioning remain consistent with the website.

---

# Platform 5: GitHub

GitHub provides technical proof and supports name/entity searches.

- [ ] Update the profile README title to `Md Mehedi Hasan — Software Engineer`.
- [ ] Mention Dhaka, Bangladesh and the main engineering specializations.
- [ ] Link to the portfolio, LinkedIn, and technical writing.
- [ ] Pin six repositories that best support the desired positioning.
- [ ] Improve pinned repository READMEs with problem, architecture, setup, screenshots, and contribution.
- [ ] Add repository topics and clear descriptions.
- [ ] Link open-source project pages back to the corresponding portfolio case study.
- [ ] Link portfolio project pages to their public repositories.
- [ ] Keep public contact details consistent with the portfolio.

Priority proof asset:

- [ ] Strengthen the Gravitee JSON–HL7 repository as a healthcare-integration case study.

Success criterion: someone arriving from search can verify skills and project ownership without relying only on portfolio claims.

---

# Platform 6: Blog and Writing

## 6.1 Content clusters

### Cluster A: React Native and mobile engineering

- [ ] How I Designed Offline-First Sync for a React Native Healthcare App
- [ ] Secure Token Handling in Mobile Healthcare Applications
- [ ] React Native Push Notifications for Appointment Workflows
- [ ] Common Flutter App Store and Google Play Rejection Fixes

### Cluster B: Node.js, NestJS, and platform architecture

- [ ] How I Structure a Full-Stack Next.js and NestJS Project
- [ ] NestJS vs Express for Production APIs
- [ ] Multi-Organization Access Control in SaaS Applications
- [ ] Background Jobs and Reliable Messaging with RabbitMQ

### Cluster C: Healthcare software

- [ ] Designing Software for EMR and LIS Workflows
- [ ] Working with JSON and HL7 in API Management
- [ ] Offline-First Patient Applications and Data Consistency
- [ ] Security Lessons from Building Healthcare Applications

### Cluster D: Deployment and infrastructure

- [ ] Vite on Cloudflare Workers: Routing, Variables, and Debugging
- [ ] Docker and GitLab CI/CD for Node.js Applications
- [ ] Deploying Full-Stack Applications on AWS
- [ ] Nginx and Load Balancing for Node.js Services

### Cluster E: E-commerce systems

- [ ] Scalable E-commerce Architecture with Node.js and PostgreSQL
- [ ] Caching Product Catalogs Without Serving Stale Inventory
- [ ] Designing Orders, Inventory, and Checkout Boundaries
- [ ] Building Multi-Tenant Store Management with NestJS

## 6.2 Article requirements

Every article must:

- [ ] Target one clear search intent.
- [ ] Answer the main query in the first two sentences.
- [ ] Use one descriptive H1 and a logical H2/H3 hierarchy.
- [ ] Include first-hand experience, examples, trade-offs, or code.
- [ ] Link to at least one project, one skill, and one other article where relevant.
- [ ] Include a concise author box linked to `/about`.
- [ ] Include a publication date and honest modification date.
- [ ] Have a unique social image and descriptive alt text.
- [ ] Include a useful conclusion or next step, not filler.

## 6.3 Existing article improvements

- [ ] Expand `Building Scalable E-commerce Platforms` with real architecture decisions and internal links.
- [ ] Expand `Creating Elegant Websites from Scratch` with concrete examples and performance evidence.
- [ ] Add troubleshooting and common-error sections to the Cloudflare Workers guide.
- [ ] Keep the Flutter deployment guide current with platform policy and tooling changes.
- [ ] Shorten titles where the global title template causes truncation.

## Writing success criteria

- Publish two substantial articles per month.
- Every article joins a content cluster instead of standing alone.
- Articles generate impressions for non-branded technical queries.
- Readers continue from articles to projects, skills, the résumé, or contact page.

---

# Platform 7: Analytics and Conversion Tracking

- [ ] Install a privacy-conscious analytics solution or Google Analytics 4.
- [ ] Connect analytics with Search Console where applicable.
- [ ] Track résumé clicks.
- [ ] Track LinkedIn and GitHub outbound clicks.
- [ ] Track email/contact actions.
- [ ] Track project and article visits from LinkedIn UTMs.
- [ ] Track article-to-project and project-to-contact navigation.
- [ ] Create a monthly SEO dashboard.

Monthly dashboard metrics:

| Metric | Purpose |
|---|---|
| Branded impressions | Measures name/entity discovery |
| Non-branded impressions | Measures topic and role discovery |
| Indexed useful pages | Detects thin or missing content |
| Queries in positions 8–20 | Identifies the fastest ranking opportunities |
| Organic article visits | Measures writing growth |
| LinkedIn referral visits | Measures distribution performance |
| Résumé clicks | Measures recruiter intent |
| Contact actions | Measures qualified conversion |

---

# Platform 8: External Authority

Only begin systematic promotion after the website and priority content are ready.

- [ ] Link the portfolio from current company/team profiles where permitted.
- [ ] Add the site to relevant professional profiles using consistent name and title.
- [ ] Contribute useful answers and examples in appropriate developer communities.
- [ ] Publish or maintain open-source tools related to real project work.
- [ ] Seek relevant guest-writing or podcast opportunities based on healthcare, mobile, or full-stack experience.
- [ ] Ask collaborators for accurate testimonials or references, not keyword-heavy endorsements.
- [ ] Avoid bulk directories, purchased links, and unrelated guest-post schemes.

Success criterion: links and mentions come from relevant professional or technical contexts.

---

# 90-Day Execution Sequence

## Days 1–14: Website foundation

- [ ] Complete homepage role/location alignment.
- [ ] Update core metadata and Person schema.
- [ ] Fix missing blog images.
- [ ] Resolve thin skill pages.
- [ ] Improve sitemap dates, frequencies, and exclusions.
- [ ] Add blog schema, author links, and breadcrumbs.
- [ ] Validate the production build and deployed metadata.

## Days 15–30: Search platforms and profiles

- [ ] Configure Google Search Console.
- [ ] Configure Bing Webmaster Tools.
- [ ] Submit the sitemap.
- [ ] Align LinkedIn headline, About, Experience, and Featured sections.
- [ ] Align GitHub profile and pinned repositories.
- [ ] Configure analytics and conversion events.

## Days 31–60: Content authority

- [ ] Upgrade the two thin existing articles.
- [ ] Publish two React Native/healthcare articles.
- [ ] Publish two Node.js/deployment articles.
- [ ] Add internal links across blogs, projects, experience, and skills.
- [ ] Distribute every article through LinkedIn.

## Days 61–90: Optimize what gains traction

- [ ] Review Search Console query/page pairs.
- [ ] Improve pages ranking in positions 8–20.
- [ ] Test titles on top-five pages with weak CTR.
- [ ] Check for keyword cannibalization.
- [ ] Expand the content clusters producing impressions.
- [ ] Begin relevant external-authority outreach.

---

# Definition of Done

The initial SEO rollout is complete when:

- [ ] The portfolio, LinkedIn, GitHub, and résumé use the same name, role, location, and employment facts.
- [ ] The homepage clearly targets software engineering in Bangladesh without keyword stuffing.
- [ ] Empty skill pages are improved, consolidated, or excluded from indexing.
- [ ] Every important page has unique metadata, a canonical URL, and useful internal links.
- [ ] Articles have author information, structured data, related content, and valid social images.
- [ ] Google Search Console and Bing Webmaster Tools are configured.
- [ ] Analytics measure résumé, profile, and contact actions.
- [ ] At least four new first-hand technical articles are published.
- [ ] A monthly measurement and improvement routine is active.
