import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves the site from /gk_site/; local dev and Vercel use /.
  base: process.env.GITHUB_PAGES ? '/gk_site/' : '/',
  plugins: [react(), tailwindcss()],
});
