---
title: "Deploy a Vite Project to Cloudflare Workers Using the Vite Plugin"
excerpt: "Learn how to deploy your Vite application to Cloudflare Workers using the official Vite plugin with this beginner-friendly step-by-step guide."
author: "Md Mehedi Hasan"
date: "2026-08-05"
tags:
  - cloudflare
  - vite
  - workers
  - deployment
---

## Introduction

If you've built a project using **Vite**, deploying it to **Cloudflare Workers** is easier than ever.

Cloudflare provides an official **Vite Plugin** that lets you develop, test, and deploy your application using the same runtime that runs in production.

In this guide, you'll learn how to set everything up from scratch.

---

## What is Vite?

**Vite** is a modern frontend build tool.

It starts your development server almost instantly and updates your browser whenever you save a file.

Some benefits of Vite:

- Fast development server
- Instant Hot Module Replacement (HMR)
- Lightweight
- Works with React, Vue, Svelte, and Vanilla JavaScript

---

## What is Cloudflare Workers?

Cloudflare Workers is a **serverless platform**.

Instead of running your application on a traditional server, your code runs on Cloudflare's global edge network.

Benefits include:

- Fast response times
- Automatic scaling
- No server management
- Global deployment

> Think of Cloudflare Workers as running your code closer to your users around the world.

---

## Why Use the Cloudflare Vite Plugin?

Normally, Vite runs your project in a Node.js environment while developing.

However, Cloudflare Workers use a different runtime.

This can sometimes cause your project to work locally but fail after deployment.

The **Cloudflare Vite Plugin** solves this problem by making your local development environment behave much closer to production.

Some advantages:

- Local development using the Workers runtime
- Easy deployment
- Production preview
- Better compatibility

---

## Create a New Vite Project

If you don't already have a project, create one.

```bash
npm create vite@latest
```

Install dependencies.

```bash
npm install
```

---

## Install Required Packages

Install the Cloudflare packages.

```bash
npm install -D vite @cloudflare/vite-plugin wrangler
```

These packages do different jobs.

| Package | Purpose |
|---------|---------|
| vite | Build tool |
| @cloudflare/vite-plugin | Connects Vite with Cloudflare Workers |
| wrangler | Deploys your application |

---

## Configure Vite

Open **vite.config.ts**.

```typescript
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [cloudflare()],
});
```

That's all you need.

The plugin automatically reads your Wrangler configuration.

---

## Create Wrangler Configuration

Create a file named **wrangler.jsonc**.

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-vite-app",
  "compatibility_date": "2026-08-05",
  "main": "./src/index.ts"
}
```

Let's understand these fields.

- **name** — Your Worker name.
- **compatibility_date** — Locks your application to a specific Workers runtime version.
- **main** — Entry file of your Worker.

---

## Create Your First Worker

Inside **src/index.ts**, write:

```typescript
export default {
  fetch() {
    return new Response("Hello from Cloudflare!");
  },
};
```

Whenever someone visits your Worker, this response will be returned.

---

## Add Scripts

Update your **package.json**.

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "npm run build && vite preview",
    "deploy": "npm run build && wrangler deploy"
  }
}
```

Now you can use:

- `npm run dev` → Start development server
- `npm run build` → Build your project
- `npm run preview` → Test production build locally
- `npm run deploy` → Deploy to Cloudflare Workers

---

## Deploy Your Project

When everything is ready, run:

```bash
npm run deploy
```

Wrangler will upload your project to Cloudflare.

After deployment, you'll receive a URL similar to:

```text
https://my-vite-app.your-subdomain.workers.dev
```

Your application is now live.

---

## Can You Build Full-Stack Applications?

Yes.

The Cloudflare Vite Plugin isn't only for frontend applications.

You can also use:

- Cloudflare D1
- KV
- Durable Objects
- Workers AI
- REST APIs

This makes it possible to build complete full-stack applications using a single Vite project.

---

## Conclusion

Deploying a Vite project to Cloudflare Workers is much easier with the official Cloudflare Vite Plugin.

You only need to install a few packages, configure Vite, create a Wrangler configuration, and deploy using Wrangler.

If you're already using Vite, this is one of the simplest ways to run your application on Cloudflare's global edge network.