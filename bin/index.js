#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

// Files and directories to ignore when copying the template
const IGNORED_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  '.DS_Store',
  'Thumbs.db',
  '*.log',
  '.eslintcache',
];

// Filter function to exclude ignored files/directories
function shouldCopyFile(src) {
  const basename = path.basename(src);

  for (const pattern of IGNORED_PATTERNS) {
    // Handle glob patterns with *
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
      if (regex.test(basename)) {
        return false;
      }
    } else if (basename === pattern) {
      return false;
    }
  }

  return true;
}

program
  .name('create-wp-theme-ts')
  .description('Create a new WordPress theme powered by React, TypeScript, and Vite')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .option('--skip-install', 'Skip npm install')
  .option('--skip-git', 'Skip git initialization')
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold('\n🚀 Create WP React Site\n'));

    // If no project name provided, prompt for it
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is your project name?',
          default: 'my-wp-site',
          validate: (input) => {
            if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
            return 'Project name may only include letters, numbers, dashes, and underscores.';
          },
        },
      ]);
      projectName = answers.projectName;
    }

    // Gather additional project info
    const projectInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'themeName',
        message: 'What is your WordPress theme name?',
        default: projectName
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name:',
        default: '',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'A custom WordPress theme built with React and Vite',
      },
    ]);

    const targetDir = path.resolve(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(targetDir)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory ${projectName} already exists. Overwrite?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('\n⚠️  Operation cancelled.\n'));
        process.exit(0);
      }

      await fs.remove(targetDir);
    }

    // Copy template files
    const copySpinner = ora('Creating project structure...').start();
    try {
      await fs.copy(TEMPLATE_DIR, targetDir, { filter: shouldCopyFile });
      copySpinner.succeed('Project structure created');
    } catch (error) {
      copySpinner.fail('Failed to create project structure');
      console.error(chalk.red(error.message));
      process.exit(1);
    }

    // Update package.json with project info
    const updateSpinner = ora('Customizing project files...').start();
    try {
      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      packageJson.description = projectInfo.description;
      packageJson.author = projectInfo.author;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      // Update style.css with theme info
      const styleCssPath = path.join(targetDir, 'public', 'style.css');
      if (await fs.pathExists(styleCssPath)) {
        let styleContent = await fs.readFile(styleCssPath, 'utf-8');
        styleContent = styleContent
          .replace(/Theme Name:.*/, `Theme Name: ${projectInfo.themeName}`)
          .replace(/Author:.*/, `Author: ${projectInfo.author}`)
          .replace(/Description:.*/, `Description: ${projectInfo.description}`);
        await fs.writeFile(styleCssPath, styleContent);
      }

      // Update index.html title
      const indexHtmlPath = path.join(targetDir, 'index.html');
      if (await fs.pathExists(indexHtmlPath)) {
        let htmlContent = await fs.readFile(indexHtmlPath, 'utf-8');
        htmlContent = htmlContent.replace(
          /<title>.*<\/title>/,
          `<title>${projectInfo.themeName}</title>`
        );
        htmlContent = htmlContent.replace(
          /<meta property="og:title" content=".*" \/>/,
          `<meta property="og:title" content="${projectInfo.themeName}" />`
        );
        await fs.writeFile(indexHtmlPath, htmlContent);
      }

      updateSpinner.succeed('Project files customized');
    } catch (error) {
      updateSpinner.fail('Failed to customize project files');
      console.error(chalk.red(error.message));
    }

    // Initialize git repository
    if (!options.skipGit) {
      const gitSpinner = ora('Initializing git repository...').start();
      try {
        execSync('git init', { cwd: targetDir, stdio: 'ignore' });
        gitSpinner.succeed('Git repository initialized');
      } catch (error) {
        gitSpinner.fail('Failed to initialize git repository');
      }
    }

    // Install dependencies
    if (!options.skipInstall) {
      const installSpinner = ora(
        'Installing dependencies (this may take a few minutes)...'
      ).start();
      try {
        execSync('npm install', { cwd: targetDir, stdio: 'ignore' });
        installSpinner.succeed('Dependencies installed');
      } catch (error) {
        installSpinner.fail('Failed to install dependencies');
        console.log(
          chalk.yellow('\nYou can install dependencies manually by running: npm install\n')
        );
      }
    }

    // Success message
    console.log(chalk.green.bold('\n✅ Project created successfully!\n'));
    console.log(chalk.white('Next steps:\n'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    if (options.skipInstall) {
      console.log(chalk.cyan('  npm install'));
    }
    console.log(chalk.cyan('  npm run dev         # Start development server'));
    console.log(chalk.cyan('  npm run build:prod  # Build for production\n'));
    console.log(
      chalk.gray('The production build creates a WordPress theme zip file in the dist/ folder.')
    );
    console.log(
      chalk.gray('Upload it via WordPress Admin > Appearance > Themes > Add New > Upload Theme\n')
    );
  });

program.parse();
