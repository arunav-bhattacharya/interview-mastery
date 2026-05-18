# Interview Mastery

A visual, structured 8-week interview-prep site built with [Docusaurus](https://docusaurus.io/). Static, hostable on GitHub Pages.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static-content hosting service.

## Deployment

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site to GitHub Pages.

If you prefer to deploy manually:

```bash
# Using SSH:
USE_SSH=true npm run deploy

# Not using SSH:
GIT_USER=<Your GitHub username> npm run deploy
```

Before deploying, update `url`, `baseUrl`, `organizationName`, and `projectName` in `docusaurus.config.ts` to match your target GitHub Pages site.
