import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves from /gk_site/
  base: process.env.GITHUB_PAGES ? '/gk_site/' : '/',
  plugins: [react(), tailwindcss()],
});
