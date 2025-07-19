const fs = require('node:fs')

const filePath = 'package.json'

if (!fs.existsSync(filePath)) {
  console.log(`⏭️  Skipping patch (file ${filePath} missing).`);
  return;
}

console.log(`🔄 Patching ${filePath}...`);

const raw = fs.readFileSync(filePath, 'utf-8');

let packageJson;
try {
  packageJson = JSON.parse(raw);
} catch (error) {
  console.error(`❌ Failed to parse JSON in ${filePath}:`, error.message);
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
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ Patching of ${filePath} completed successfully.`);
} catch (error) {
  console.error(`❌ Failed to write ${filePath}:`, error.message);
}
