import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [
    react(),
    markdown({ mode: 'yaml' })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content')
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/AkisWebsite/' : '/',
  build: {
    outDir: 'docs'
  }
});