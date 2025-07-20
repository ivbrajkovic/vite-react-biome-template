const fs = require("fs");
const path = require('path');

const viteConfigPath = path.join(process.cwd(), "vite.config.ts");

if (!fs.existsSync(viteConfigPath)) {
  console.log(`⏭️  Skipping patch (file ${viteConfigPath} missing).`);
  return;
}

let viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');

if (viteConfig.includes("vite-tsconfig-paths")) {
  console.log(`⏭️  Skipping patch (file ${viteConfigPath} already patched).`);
  return;
}

console.log(`🔄 Patching ${viteConfigPath}...`);

viteConfig = viteConfig
  .replace(
    /(import react from '@vitejs\/plugin-react';?)/, 
    `$1\nimport tsconfigPaths from 'vite-tsconfig-paths';`
  )
  .replace(
    /plugins:\s*\[(.*?)\]/s, 
    `plugins: [$1, tsconfigPaths()]`
  )
console.log(`🔧 Added 'vite-tsconfig-paths' plugin`);

viteConfig = viteConfig.replace(
    /(defineConfig\(\s*\{)/, 
    `$1\n  server: { host: true },`
  );
console.log(`🔧 Added 'server: { host: true }' to defineConfig`);

try {
  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log(`✅ Patching of ${viteConfigPath} completed successfully.`);
} catch (error) {
  console.error(`❌ Failed to write ${viteConfigPath}:`, error.message);
}