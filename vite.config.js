import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite config. base: '/' because the site lives at https://elixi-core.github.io/ (the org's
// user-pages URL), not at a /<repo>/ subpath. If the repo name ever changes, set base to
// '/<repo-name>/' to keep asset URLs correct.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Keep the chunk names readable so deploys are debuggable.
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: { port: 5173, host: true, strictPort: false },
});
