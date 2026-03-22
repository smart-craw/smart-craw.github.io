import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { playwright } from "@vitest/browser-playwright";
// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      include: ["src"],
    },
  },
});
