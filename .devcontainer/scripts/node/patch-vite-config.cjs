const fs = require("fs");

const filePath = "./vite.config.ts";

if (!fs.existsSync(filePath)) {
  console.log(`⏭️  Skipping patch (file ${filePath} missing).`);
  return;
}

const raw = fs.readFileSync(filePath, 'utf-8');

if (raw.includes("vite-tsconfig-paths")) {
  console.log(`⏭️  Skipping patch (file ${filePath} already patched).`);
  return;
}

console.log(`🔄 Patching ${filePath}...`);

let patchedCode = raw
  .replace(
    /(import react from '@vitejs\/plugin-react';?)/, 
    `$1\nimport tsconfigPaths from 'vite-tsconfig-paths';`
  )
  .replace(
    /plugins:\s*\[(.*?)\]/s, 
    `plugins: [$1, tsconfigPaths()]`
  )
console.log(`🔧 Added 'vite-tsconfig-paths' plugin`);

patchedCode = patchedCode.replace(
    /(defineConfig\(\s*\{)/, 
    `$1\n  server: { host: true },`
  );
console.log(`🔧 Added 'server: { host: true }' to defineConfig`);

try {
  fs.writeFileSync(filePath, patchedCode);
  console.log(`✅ Patching of ${filePath} completed successfully.`);
} catch (error) {
  console.error(`❌ Failed to write ${filePath}:`, error.message);
}