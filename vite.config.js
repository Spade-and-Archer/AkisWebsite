import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { plugin as markdown } from 'vite-plugin-markdown';
import fs from 'fs'; 

export default defineConfig({
  plugins: [
    react(),
    markdown({ mode: 'yaml' }),
    {
        name: 'create-nojekyll',
        closeBundle() {
          fs.writeFileSync('docs/.nojekyll', '');
        }
      }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content')
    }
  },
  base: '/',
  build: {
    outDir: 'docs'
  }
});