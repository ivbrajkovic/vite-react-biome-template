const fs = require('node:fs')
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.log(`⏭️  Skipping patch (file ${packageJsonPath} missing).`);
  return;
}

console.log(`🔄 Patching ${packageJsonPath}...`);

let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
} catch (error) {
  console.error(`❌ Failed to parse JSON in ${packageJsonPath}:`, error.message);
  return;
}

// Update package.json fields
packageJson.scripts.lint = "biome lint .";
console.log(`🔧 Setting lint script to 'biome lint .'`);

packageJson.scripts.format = "biome format . --write";
console.log(`🔧 Setting format script to 'biome format . --write'`);

// Delete eslint dependencies if they exist
const eslintDeps = [
  "eslint",
  "@eslint/js",
  "eslint-plugin-react",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react-refresh",
  "globals",
  "typescript-eslint"
];

eslintDeps.forEach(dep => {
  if (packageJson.devDependencies[dep]) {
    delete packageJson.devDependencies[dep];
    console.log(`🗑️  Removed ${dep} from devDependencies`);
  }
});

// Write updated JSON back to file
try {
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ Patching of ${packageJsonPath} completed successfully.`);
} catch (error) {
  console.error(`❌ Failed to write ${packageJsonPath}:`, error.message);
}
