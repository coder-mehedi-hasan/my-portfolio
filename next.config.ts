import type { NextConfig } from 'next';
import { getDistDir } from './next-dist-dir.js';

export default function nextConfig(phase: string): NextConfig {
  return {
    distDir: getDistDir(phase),
  };
}
