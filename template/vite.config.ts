import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import zipPack from 'vite-plugin-zip-pack';
import eslint from 'vite-plugin-eslint2';
import { resolve } from 'path';

// Generate timestamp suffix (YYYYMMDDHHmmss)
const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      emitWarning: true,
      emitError: true,
    }),
    // Copy PHP files, style.css and favicon to dist root
    viteStaticCopy({
      targets: [
        { src: 'php/*', dest: '.' },
        { src: 'public/style.css', dest: '.' },
        { src: 'public/assets/icons/favicon.ico', dest: '.' },
      ],
    }),
    // Create ZIP file of the dist folder
    zipPack({
      outDir: 'dist',
      outFileName: `wordpress-custom-theme-${timestamp}.zip`,
    }),
  ],
  root: '.', // Root directory where index.html is located
  publicDir: false, // Disable Vite's default public dir copying since we're using viteStaticCopy
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode === 'production', // Generate source maps for production
    cssCodeSplit: false, // Extract all CSS into a single file
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        format: 'iife', // Output as IIFE format for browser compatibility (no ES module exports)
        entryFileNames: 'bundle.js', // Name the main bundle 'bundle.js' since required by WordPress themes
        chunkFileNames: '[name].js', // For any code-split chunks (if any)
        // For assets like images, fonts
        assetFileNames: (assetInfo) => {
          // Output bundled CSS as bundle.css (separate from WordPress theme's style.css)
          const name = assetInfo.names?.[0] || '';
          if (name.endsWith('.css')) {
            return 'bundle.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    minify: mode === 'production' ? 'terser' : false, // Minify in production
  },
  // Development server configuration
  server: {
    port: 8080,
    open: true,
  },
  // Module resolution configuration
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}));
