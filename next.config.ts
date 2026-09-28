import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

export default function nextConfig(phase: string): NextConfig {
  // Vercel hardcodes `.next` as the build output directory, so the custom
  // distDir has to stay local-only. Locally it keeps a running dev server
  // from overwriting production build artifacts.
  const isLocalBuild = !process.env.VERCEL;

  return {
    distDir: isLocalBuild && phase !== PHASE_DEVELOPMENT_SERVER ? '.next-production' : '.next',
  };
}
