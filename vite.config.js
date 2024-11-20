import { defineConfig } from 'vite';

export default defineConfig({
  base: '/graphql/', // The repository name as the base path
  build: {
    rollupOptions: {
      input: '/index.html', // Ensure Rollup resolves the correct entry point
    },
  },
});
