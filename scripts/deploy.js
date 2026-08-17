// GitHub Pages deployment
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying to GitHub Pages...');

try {
  // Build
  console.log('📦 Building...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Initialize gh-pages if not already
  if (!fs.existsSync('.git')) {
    execSync('git init', { stdio: 'inherit' });
  }
  
  console.log('✅ Build complete!');
  console.log('\n📍 Your site is ready at: dist/');
  console.log('\nTo deploy to GitHub Pages:');
  console.log('  npx gh-pages -d dist');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
