import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-is'], // Mark `react-is` as an external dependency
    },
  },
  base: '/', // Adjust as needed for deployment
});
