# Guess the Soccer Player - GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages.

## Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder
# Option 1: Push to gh-pages branch
npx gh-pages -d dist

# Option 2: Using GitHub API
git add dist
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Verification

After deployment, verify:
1. Site loads at `https://yourusername.github.io/Guess-the-Soccer-Player`
2. All game modes work
3. LocalStorage persistence works
4. No console errors
