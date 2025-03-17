import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(),TanStackRouterVite()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  test: {
    globals: true,
    css: true,
    environment: "jsdom",
    setupFiles: "./src/setup.js",
    coverage: {
      reporter: [["lcov", { projectRoot: "./src" }]],
    },
  }, assetsInclude:['**/*.docx']
});
