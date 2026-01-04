import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import zipPack from 'vite-plugin-zip-pack';

/**
 * Vite Configuration for WordPress React Theme
 */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (.env, .env.development, .env.production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // ========================================
    // PLUGINS
    // ========================================
    plugins: [
      // React support with Fast Refresh for HMR
      react(),

      // ESLint integration - shows lint errors in terminal during dev
      eslint({
        failOnError: false,
        failOnWarning: false,
      }),

      // Copy static files to dist
      // - PHP files for WordPress theme
      // - WordPress theme style.css (with required header)
      // - Images from public folder
      viteStaticCopy({
        targets: [
          {
            src: 'php/*',
            dest: '',
          },
          {
            src: 'public/style.css',
            dest: '',
          },
          {
            src: 'public/images/*',
            dest: 'images',
          },
        ],
      }),

      // Create WordPress theme zip after build
      zipPack({
        inDir: 'dist',
        outDir: 'dist',
        outFileName: 'wordpress-custom-theme.zip',
      }),
    ],

    // Static assets directory (favicon, images, etc.)
    publicDir: 'public',

    // ========================================
    // BUILD OPTIONS
    // ========================================
    build: {
      outDir: 'dist',
      emptyOutDir: true,

      // Source maps: inline for dev debugging, disabled for production
      sourcemap: mode === 'development' ? 'inline' : false,

      // Target modern browsers
      target: 'esnext',

      // Rollup output configuration
      rollupOptions: {
        output: {
          // Fixed filenames for WordPress compatibility (no hashes)
          // WordPress functions.php expects bundle.js and bundle.css
          // style.css is reserved for WordPress theme header
          entryFileNames: 'bundle.js',
          chunkFileNames: '[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'bundle.css';
            }
            return 'assets/[name][extname]';
          },
        },
      },
    },

    // ========================================
    // DEV SERVER
    // ========================================
    server: {
      port: 8080,
      open: true, // Auto-open browser on start
    },

    // Preview server (for testing production builds locally)
    preview: {
      port: 8080,
    },

    // Polyfill process.env for libraries that expect Node.js environment
    define: {
      'process.env': {},
    },
  };
});
