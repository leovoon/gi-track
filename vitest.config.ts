import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./src/test/setup.ts",
    environment: "jsdom",
  },
  resolve: {
    alias: [{ find: "@/", replacement: "/src/" }],
  },
});
