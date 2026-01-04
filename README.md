# create-wp-theme-ts

A CLI tool to scaffold a custom WordPress theme powered by React, TypeScript, and Vite.

Build your WordPress theme as a modern React single-page application, then deploy it as a standard WordPress theme zip file.

## Quick Start

```bash
npx create-wp-theme-ts my-site
cd my-site
npm run dev
```

## Features

- ⚡ **Vite** - Lightning-fast HMR and optimized builds
- ⚛️ **React 18** - Latest React with concurrent features
- 📘 **TypeScript** - Full type safety out of the box
- 💅 **styled-components** - CSS-in-JS styling
- 🎨 **Font Awesome** - Icon library included
- 🔧 **ESLint + Prettier** - Code quality tools pre-configured
- 📦 **WordPress Theme Zip** - Production build outputs a ready-to-deploy theme

## Usage

### Interactive Mode

Simply run without arguments to enter interactive mode:

```bash
npx create-wp-theme-ts
```

You'll be prompted for:

- Project name
- WordPress theme name
- Author name
- Project description

### Command Line Arguments

```bash
npx create-wp-theme-ts <project-name> [options]
```

**Options:**

- `--skip-install` - Skip automatic npm install
- `--skip-git` - Skip git repository initialization

**Examples:**

```bash
# Create with custom name
npx create-wp-theme-ts my-awesome-theme

# Skip npm install (useful if you want to use yarn/pnpm)
npx create-wp-theme-ts my-site --skip-install

# Skip both install and git init
npx create-wp-theme-ts my-site --skip-install --skip-git
```

## Project Structure

After scaffolding, your project will have this structure:

```
my-site/
├── php/                    # WordPress PHP files
│   ├── functions.php       # Theme functions
│   └── index.php           # Main WordPress template
├── public/                 # Static assets
│   ├── images/             # Image files
│   └── style.css           # WordPress theme stylesheet
├── src/                    # React source code
│   ├── components/         # React components
│   │   └── Layout.tsx      # Main layout component
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page
│   │   ├── About.tsx       # About page
│   │   └── NotFound.tsx    # 404 page
│   ├── styles/             # CSS files
│   │   └── global.css      # Global styles
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point
│   └── vite-env.d.ts       # Vite type definitions
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── index.html              # HTML template
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Available Scripts

In your generated project, you can run:

### `npm run dev`

Starts the development server at [http://localhost:8080](http://localhost:8080).

Features hot module replacement for instant feedback while developing.

### `npm run build`

Creates an unminified build in the `dist/` folder.

### `npm run build:dev`

Creates a development build with source maps.

### `npm run build:prod`

Creates an optimized production build and generates `wordpress-custom-theme.zip` in the `dist/` folder.

### `npm run preview`

Preview the production build locally before deploying.

## Deploying to WordPress

1. Run the production build:

   ```bash
   npm run build:prod
   ```

2. Locate the generated zip file:

   ```
   dist/wordpress-custom-theme.zip
   ```

3. In your WordPress admin panel:
   - Go to **Appearance → Themes → Add New → Upload Theme**
   - Upload `wordpress-custom-theme.zip`
   - Click **Install Now**
   - Click **Activate**

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`:

   ```tsx
   // src/pages/Contact.tsx
   function Contact() {
     return <div>Contact Page</div>;
   }
   export default Contact;
   ```

2. Add the route in `src/App.tsx`:

   ```tsx
   import Contact from './pages/Contact';

   // Inside Routes:
   <Route path="contact" element={<Contact />} />;
   ```

3. Add navigation link in `src/components/Layout.tsx`:
   ```tsx
   <NavLink to="/contact">Contact</NavLink>
   ```

### Styling

This template uses [styled-components](https://styled-components.com/) for styling:

```tsx
import styled from 'styled-components';

const Button = styled.button`
  background: #4a9eff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3a8eef;
  }
`;
```

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My Site
```

Access them in your code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note:** Only variables prefixed with `VITE_` are exposed to your code.

## WordPress Theme Customization

### Theme Header

Edit `public/style.css` to update the WordPress theme metadata:

```css
/*
Theme Name: Your Theme Name
Author: Your Name
Author URI: https://yoursite.com
Description: Your theme description
Version: 1.0.0
License: MIT
*/
```

### Adding WordPress Features

Edit `php/functions.php` to add WordPress functionality:

```php
// Register a navigation menu
register_nav_menus(array(
    'primary' => __('Primary Menu'),
));

// Add custom post type support
// Add widget areas
// etc.
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Testing

Navigate to desired location for the created project and run the following command.

```
node "create-wp-theme-ts\bin\index.js" <name-of-template-folder>
```

## License

MIT
