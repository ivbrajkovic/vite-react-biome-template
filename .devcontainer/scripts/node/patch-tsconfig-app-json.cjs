const fs = require('node:fs')
const path = require('path');

const tsconfigPath =  path.join(process.cwd(), 'tsconfig.app.json');

if (!fs.existsSync(tsconfigPath)) {
  console.log(`⏭️  Skipping patch (file ${tsconfigPath} missing).`);
  return;
}

console.log(`🔄 Patching ${tsconfigPath}...`);

// Read and clean JSON file
const raw = fs.readFileSync(tsconfigPath, 'utf-8');
const cleanJson = raw.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '').trim();

// Parse JSON safely
let tsconfig;
try {
  tsconfig = JSON.parse(cleanJson);
} catch (error) {
  console.error(`❌ Failed to parse JSON in ${tsconfigPath}:`, error.message);
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
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log(`✅ Patching of ${tsconfigPath} completed successfully.`);
} catch (error) {
  console.error(`❌ Failed to write ${tsconfigPath}:`, error.message);
  return;
}
