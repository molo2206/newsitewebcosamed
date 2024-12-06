import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/uploads': {
        target: 'https://apicosamed.cosamed.org',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('pdfjs-dist')) {
            return 'pdfjs';
          }
        },
      },
    },
  }
});
