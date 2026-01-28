/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development' && process.env.PWA_ENABLE_DEV !== 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
