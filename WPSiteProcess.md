# WordPress Theme Build & Deployment Guide

This project builds a React SPA and packages it as a WordPress theme zip file for CPanel deployment.

---

## Quick Start

```bash
# Install dependencies
npm install

# Build production WordPress theme
npm run build:prod
```

**Output:** `dist/wordpress-custom-theme.zip`

---

## Deployment to CPanel

1. Run `npm run build:prod`
2. Locate `dist/wordpress-custom-theme.zip`
3. Log into your CPanel WordPress Admin
4. Go to **Appearance → Themes → Add New → Upload Theme**
5. Upload `wordpress-custom-theme.zip`
6. Click **Install Now**, then **Activate**

---

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build:prod` | **Production build** — creates minified theme zip |
| `npm run build:dev` | Development build with source maps |
| `npm run build` | Local build (no minification) |
| `npm start` | Local dev server at `http://localhost:8080` |

---

## What Gets Built

The `dist/` folder contains:

```
dist/
├── bundle.js                    # Compiled React app
├── bundle.js.map                # Source map
├── index.html                   # HTML template
├── functions.php                # WordPress theme functions
├── index.php                    # WordPress main template
├── style.css                    # WordPress theme stylesheet
├── favicon.ico                  # Site favicon
└── wordpress-custom-theme.zip   # ⬅️ Upload this to WordPress
```

---

## Build Pipeline

```
src/index.tsx          →  TypeScript compilation (ts-loader)
                       →  JavaScript bundling (webpack)
                       →  Minification (TerserPlugin)
                       →  Output: bundle.js

php/functions.php      →  Copied to dist/
php/index.php          →  Copied to dist/

public/style.css       →  Copied to dist/
public/images/*        →  Copied to dist/

All dist/ files        →  Zipped into wordpress-custom-theme.zip
```

---

## WordPress Theme Structure

### `php/functions.php`
Registers the React bundle with WordPress:
```php
wp_enqueue_style('react-app', get_template_directory_uri() . '/style.css');
wp_enqueue_script('react-app', get_template_directory_uri() . '/bundle.js', array(), null, true);
```

### `php/index.php`
The WordPress template containing:
- `<div id="root"></div>` — React mount point
- WordPress hooks (`wp_head()`, `wp_footer()`)
- SEO meta tags and Open Graph properties

### `public/style.css`
WordPress requires a `style.css` with a theme header. Add this if missing:
```css
/*
Theme Name: Your Theme Name
Author: Your Name
Description: Custom React WordPress theme
Version: 1.0
*/
```

---

## Key Webpack Plugins

| Plugin | Purpose |
|--------|---------|
| `zip-webpack-plugin` | Creates the WordPress theme zip |
| `copy-webpack-plugin` | Copies PHP files and assets to dist |
| `html-webpack-plugin` | Generates HTML with bundle injection |
| `terser-webpack-plugin` | Minifies JavaScript for production |

---

## Local Development

```bash
npm start
```

Runs a dev server at `http://localhost:8080` with:
- Hot module replacement
- SPA routing support (`historyApiFallback`)
- No minification for fast rebuilds

---

## Troubleshooting

**Theme not recognized in WordPress?**
- Ensure `style.css` has the WordPress theme header comment block

**Build fails?**
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript/ESLint errors in the console

**Changes not appearing after deployment?**
- Clear your browser cache
- Check WordPress caching plugins
