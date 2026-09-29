# Graph Report - .  (2026-09-29)

## Corpus Check
- 109 files · ~126,078 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 494 nodes · 724 edges · 53 communities (27 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Content Generator UI
- Blog Pages and Routes
- Backend and DevOps Skills
- Application Package Scripts
- Project Pages and Home
- FontAwesome Dependencies
- Application TypeScript Config
- Site Information Pages
- Generator TypeScript Config
- Portfolio Content System
- Healthcare Products
- Global Layout and Header
- Reusable UI Components
- E-commerce Architecture
- Cloudflare Deployment
- BitPixel Engineering Experience
- Next.js Build Configuration
- ESLint Configuration
- ESPD Tutoring Platform
- Senior Places Discovery
- Kotha Chat Experience
- Android Release Signing
- Kotha Frontend Experience
- SatuJobs Marketplace
- Contact Page Layout
- Modal Component
- iOS Release Workflow
- Flutter Release Workflow
- Search Engine Metadata
- Utility Helpers
- Global Settings
- Authentication Skills
- Database Skills
- API Documentation Skills
- PostCSS Configuration
- Navy Portrait Assets
- White Shirt Portraits
- Tailwind Configuration
- Site Constants
- Blog Content Template
- Interspeed Engineering Experience
- Experience Content Template
- Project Content Template
- Algorithms Skill
- Docker Skill
- Electron Skill
- Express Skill
- Git Skill
- Java Skill
- Skill Content Template
- WebSocket Skill
- MyCare360 Patient App
- Testimonial Visual Asset

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `compilerOptions` - 15 edges
3. `listEntries()` - 14 edges
4. `Interspeed` - 14 edges
5. `getEntry()` - 12 edges
6. `Md. Mehedi Hasan` - 12 edges
7. `scripts` - 11 edges
8. `contentPath()` - 10 edges
9. `createDraft()` - 10 edges
10. `PageIntro()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Build-time Rendering` --semantically_similar_to--> `Build-time Content Delivery`  [INFERRED] [semantically similar]
  content/blogs/creating-elegant-websites-from-scratch.md → README.md
- `Interspeed` --references--> `GitLab CI`  [EXTRACTED]
  public/resume-mehedi.pdf → content/skills/gitlab-ci.md
- `Md. Mehedi Hasan` --references--> `JMeter`  [EXTRACTED]
  public/resume-mehedi.pdf → content/skills/jmeter.md
- `Bitpixel BD` --references--> `NestJS`  [EXTRACTED]
  public/resume-mehedi.pdf → content/skills/nestjs.md
- `Md. Mehedi Hasan` --references--> `Nginx`  [EXTRACTED]
  public/resume-mehedi.pdf → content/skills/nginx.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **E-commerce Domain Service Partition** — content_blogs_building_scalable_ecommerce_platforms_cart_service, content_blogs_building_scalable_ecommerce_platforms_catalog_service, content_blogs_building_scalable_ecommerce_platforms_order_service [EXTRACTED 1.00]
- **Flutter Dual-store Release Flow** — content_blogs_flutter_application_deploy_flutter_store_release_workflow, content_blogs_flutter_application_deploy_google_play_release, content_blogs_flutter_application_deploy_app_store_connect, content_blogs_flutter_application_deploy_testflight_validation [EXTRACTED 1.00]
- **Healthcare Product Ecosystem** — content_projects_mycare360_mycare360, content_projects_quantumleap_emr_quantumleap_emr, content_projects_mycare360_phi_security, content_projects_quantumleap_emr_auditable_clinical_data_model [INFERRED 0.85]
- **Full-stack Core Technology Portfolio** — content_skills_react_react, content_skills_react_native_react_native, content_skills_nodejs_node_js, content_skills_php_php [EXTRACTED 1.00]
- **Clinical Software Portfolio** — public_resume_mehedi_quantumleap_emr, public_resume_mehedi_labqfusion_lis, public_resume_mehedi_patient_mobile_app [INFERRED 0.85]
- **Scalable Deployment Toolchain** — content_skills_rabbitmq_rabbitmq, public_resume_mehedi_docker, content_skills_gitlab_ci_gitlab_ci, public_resume_mehedi_aws [EXTRACTED 1.00]
- **ESPD Tutoring Discovery Experience** — public_works_espd_personalised_online_tutoring, public_works_espd_uk_qualified_tutors, public_works_espd_tutor_discovery [EXTRACTED 1.00]
- **Senior Places Matching Flow** — public_works_senior_places_senior_living_search, public_works_senior_places_smart_match_quiz, public_works_senior_places_personalized_recommendations, public_works_senior_places_preference_criteria [EXTRACTED 1.00]
- **Kotha Chat Interaction Flow** — public_works_web_kotha_app_chat_people_directory, public_works_web_kotha_app_chat_one_to_one_chat, public_works_web_kotha_app_chat_multimedia_messages, public_works_web_kotha_app_chat_voice_and_attachment_controls [EXTRACTED 1.00]

## Communities (53 total, 26 thin omitted)

### Community 0 - "Content Generator UI"
Cohesion: 0.06
Nodes (69): App(), Notice, View, Browse(), BrowseProps, isChar(), matches(), Mode (+61 more)

### Community 1 - "Blog Pages and Routes"
Cohesion: 0.11
Nodes (33): BlogsPage(), metadata, GET(), BlogDetailPage(), generateMetadata(), generateStaticParams(), common, contentTypes (+25 more)

### Community 2 - "Backend and DevOps Skills"
Cohesion: 0.07
Nodes (38): GitLab CI, JavaScript, JMeter, NestJS, Next.js, Nginx, Node.js, PHP (+30 more)

### Community 3 - "Application Package Scripts"
Cohesion: 0.05
Nodes (37): eslint, eslint-config-next, @eslint/eslintrc, next-sitemap, devDependencies, eslint, eslint-config-next, @eslint/eslintrc (+29 more)

### Community 4 - "Project Pages and Home"
Cohesion: 0.11
Nodes (26): Home(), metadata, ProjectsPage(), generateMetadata(), generateStaticParams(), ProjectDetailPage(), generateMetadata(), generateStaticParams() (+18 more)

### Community 5 - "FontAwesome Dependencies"
Cohesion: 0.07
Nodes (29): @fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-regular-svg-icons, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome, gray-matter, marked, next (+21 more)

### Community 6 - "Application TypeScript Config"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, next-env.d.ts, .next-production/types/**/*.ts, .next/types/**/*.ts, node_modules, tools, compilerOptions (+20 more)

### Community 7 - "Site Information Pages"
Cohesion: 0.13
Nodes (15): AboutPage(), metadata, date(), ExperiencePage(), metadata, ExperienceDetailPage(), generateMetadata(), generateStaticParams() (+7 more)

### Community 8 - "Generator TypeScript Config"
Cohesion: 0.10
Nodes (20): node, compilerOptions, allowJs, esModuleInterop, jsx, jsxImportSource, lib, module (+12 more)

### Community 9 - "Portfolio Content System"
Cohesion: 0.15
Nodes (13): Build-time Rendering, Consistent Visual Scale, Elegant Website Design, Web Performance Basics, Build-time Content Delivery, Create-and-publish-only Generator, Featured Content Selection, Markdown-managed Collections (+5 more)

### Community 10 - "Healthcare Products"
Cohesion: 0.17
Nodes (13): Appointment Notification Flows, Mobile Patient Experience, MyCare360, Offline-first Synchronization, Protected Health Information Security, Auditable Clinical Data Model, Clinical Workflow Dashboard, QuantumLeap EMR (+5 more)

### Community 11 - "Global Layout and Header"
Cohesion: 0.18
Nodes (7): inter, jsonLd, metadata, noto, viewport, links, Footer()

### Community 12 - "Reusable UI Components"
Cohesion: 0.22
Nodes (6): DynamicFAIcon(), DynamicFAIconProps, icons, SectionItem, SectionProps, SkillItem

### Community 13 - "E-commerce Architecture"
Cohesion: 0.29
Nodes (7): API-boundary Caching, Cart Service, Catalog Service, Evolutionary Service Decomposition, Order Service, PostgreSQL Consistency for Orders, Scalable E-commerce Architecture

### Community 14 - "Cloudflare Deployment"
Cohesion: 0.29
Nodes (7): Cloudflare Vite Plugin, Cloudflare Workers, Full-stack Workers Platform, Workers Runtime Parity, Vite, Worker Configuration, Wrangler

### Community 15 - "BitPixel Engineering Experience"
Cohesion: 0.29
Nodes (7): BitPixel Full-stack Developer Role, Deployment Discipline, End-to-end Feature Ownership, REST API and Frontend Delivery, CI/CD, GitHub Actions, GitHub

### Community 16 - "Next.js Build Configuration"
Cohesion: 0.53
Nodes (3): nextConfig(), getDistDir(), { getDistDir, DEV_DIST_DIR }

### Community 17 - "ESLint Configuration"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 18 - "ESPD Tutoring Platform"
Cohesion: 0.50
Nodes (5): ESPD Online Tutoring Landing Page, Live Chat Support, Personalised Online Tutoring, Tutor Discovery, UK Qualified Tutors

### Community 19 - "Senior Places Discovery"
Cohesion: 0.50
Nodes (5): Personalized Senior Living Recommendations, Senior Living Preference Criteria, Senior Living Community Search, Senior Places Discovery Landing Page, Smart Match Quiz

### Community 20 - "Kotha Chat Experience"
Cohesion: 0.40
Nodes (5): Kotha Social Chat Interface, Multimedia Messages, One-to-One Chat, People Directory, Voice and Attachment Controls

### Community 21 - "Android Release Signing"
Cohesion: 0.50
Nodes (4): Android App Bundle, Android Upload Signing, Google Play Release, Signing Secret Protection

### Community 22 - "Kotha Frontend Experience"
Cohesion: 0.50
Nodes (4): Accessible Interfaces, Design-to-interface Translation, Kotha Frontend Developer Role, Reusable Component Architecture

### Community 23 - "SatuJobs Marketplace"
Cohesion: 0.67
Nodes (4): Employee Hiring, Freelance and Project Discovery, Job and Talent Search, SatuJobs Employment Marketplace Landing Page

### Community 26 - "iOS Release Workflow"
Cohesion: 0.67
Nodes (3): App Store Connect, iOS Archive, TestFlight Validation

### Community 27 - "Flutter Release Workflow"
Cohesion: 0.67
Nodes (3): Application Identity, Flutter Store Release Workflow, Release Versioning

### Community 28 - "Search Engine Metadata"
Cohesion: 0.67
Nodes (3): Mehedi Info Site, Mehedi Info Sitemap, Robots Directives

## Knowledge Gaps
- **207 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `setting` (+202 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `listEntries()` connect `Blog Pages and Routes` to `Content Generator UI`, `Project Pages and Home`, `Site Information Pages`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `dependencies` connect `FontAwesome Dependencies` to `Application Package Scripts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Interspeed` (e.g. with `LabQFusion LIS` and `NextGen AI Plugin`) actually correct?**
  _`Interspeed` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _207 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Content Generator UI` be split into smaller, more focused modules?**
  _Cohesion score 0.06037000973709834 - nodes in this community are weakly interconnected._
- **Should `Blog Pages and Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.11149825783972125 - nodes in this community are weakly interconnected._
- **Should `Backend and DevOps Skills` be split into smaller, more focused modules?**
  _Cohesion score 0.07396870554765292 - nodes in this community are weakly interconnected._