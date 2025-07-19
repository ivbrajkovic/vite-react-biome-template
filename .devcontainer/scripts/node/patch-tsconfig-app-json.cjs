const fs = require('node:fs')

const filePath = 'tsconfig.app.json'

if (!fs.existsSync(filePath)) {
  console.log(`⏭️  Skipping patch (file ${filePath} missing).`);
  return;
}

console.log(`🔄 Patching ${filePath}...`);

// Read and clean JSON file
const raw = fs.readFileSync(filePath, 'utf-8');
const cleanJson = raw.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '').trim();

// Parse JSON safely
let tsconfig;
try {
  tsconfig = JSON.parse(cleanJson);
} catch (error) {
  console.error(`❌ Failed to parse JSON in ${filePath}:`, error.message);
  return;
}

// Update compiler options

tsconfig.compilerOptions.allowUnreachableCode = true;
console.log(`🔧 Setting allowUnreachableCode to true.`);

tsconfig.compilerOptions.baseUrl = 'src';
console.log(`🔧 Setting baseUrl to 'src'.`);

tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};
tsconfig.compilerOptions.paths['@/*'] = ['*'];
console.log(`🔧 Setting paths mapping for '@/'`);

// Write updated JSON back to file
try {
  fs.writeFileSync(filePath, JSON.stringify(tsconfig, null, 2));
  console.log(`✅ Patching of ${filePath} completed successfully.`);
} catch (error) {
  console.error(`❌ Failed to write ${filePath}:`, error.message);
  return;
}
