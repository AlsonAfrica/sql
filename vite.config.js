import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['sql.js']
    }
  },
  server: {
    fs: {
      allow: ['node_modules/sql.js/dist']
    }
  }
});
