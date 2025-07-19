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

const patchedCode = raw
  .replace(
    /(import react from '@vitejs\/plugin-react';?)/, 
    `$1\nimport tsconfigPaths from 'vite-tsconfig-paths';`
  )
  .replace(
    /plugins:\s*\[(.*?)\]/s, 
    `plugins: [$1, tsconfigPaths()]`
  )
  .replace(
    /(defineConfig\(\s*\{)/, 
    `$1\n  server: { host: true },`
  );

try {
  fs.writeFileSync(filePath, patchedCode);
  console.log(`✅ Patched ${filePath} with tsconfigPaths and server host.`);
} catch (error) {
  console.error(`❌ Failed to write ${filePath}:`, error.message);
}