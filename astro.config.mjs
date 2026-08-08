import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Language routing is handled manually via /[lang]/ dynamic segments
// (see src/i18n) rather than Astro's built-in i18n router, so that
// wiki pages can nest cleanly under /[lang]/wiki/[country]/[city]/.
export default defineConfig({
  site: "https://example-travel-wiki.com",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
