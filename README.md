# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Prisma

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm      


my-portfolio/
├─ app/
│  ├─ about/
│  │  └─ page.tsx
│  ├─ admin/
│  │  ├─ education/
│  │  │  └─ page.tsx
│  │  ├─ experience/
│  │  │  └─ page.tsx
│  │  ├─ projects/
│  │  │  └─ page.tsx
│  │  ├─ resume/
│  │  │  └─ page.tsx
│  │  ├─ settings/
│  │  │  └─ page.tsx
│  │  ├─ skills/
│  │  │  └─ page.tsx
│  │  ├─ testimonials/
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ api/
│  │  ├─ education/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ experience/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ projects/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ resume/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ settings/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ skills/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ testimonials/
│  │  │  ├─ [id]/
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  └─ route.ts
│  ├─ blogs/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  ├─ experience/
│  │  └─ page.tsx
│  ├─ login/
│  │  └─ page.tsx
│  ├─ projects/
│  │  └─ page.tsx
│  ├─ skills/
│  │  └─ page.tsx
│  ├─ testimonials/
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ global.d.ts
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ home/
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Section.tsx
│  │  └─ Skills.tsx
│  └─ Modal.tsx
├─ generated/
│  └─ prisma/
│     ├─ runtime/
│     │  ├─ edge-esm.js
│     │  ├─ edge.js
│     │  ├─ index-browser.d.ts
│     │  ├─ index-browser.js
│     │  ├─ library.d.ts
│     │  ├─ library.js
│     │  ├─ react-native.js
│     │  ├─ wasm-compiler-edge.js
│     │  └─ wasm-engine-edge.js
│     ├─ client.d.ts
│     ├─ client.js
│     ├─ default.d.ts
│     ├─ default.js
│     ├─ edge.d.ts
│     ├─ edge.js
│     ├─ index-browser.js
│     ├─ index.d.ts
│     ├─ index.js
│     ├─ package.json
│     ├─ query_engine-windows.dll.node
│     ├─ schema.prisma
│     ├─ wasm.d.ts
│     └─ wasm.js
├─ prisma/
│  ├─ migrations/
│  │  ├─ 20250608032612_add_skill_table_and_first_init/
│  │  │  └─ migration.sql
│  │  ├─ 20250608042433_added/
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public/
│  ├─ md-mehedi-hasan-portfolio.jpg
│  ├─ me.jpg
│  ├─ me.png
│  ├─ me2.png
│  ├─ me3-removebg-preview.png
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ testimonial-banner.png
├─ utils/
│  ├─ db.ts
│  └─ helpers.ts
├─ .env
├─ .gitignore
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next-sitemap.config.js
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json
