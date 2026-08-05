import { BASE_PATH } from "./lib/config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Должно совпадать с mount path приложения в Webflow Cloud
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
};

export default nextConfig;
