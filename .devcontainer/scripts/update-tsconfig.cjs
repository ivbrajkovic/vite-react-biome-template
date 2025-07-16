// biome-ignore lint/style/useNodejsImportProtocol: This will be run in a Node.js environment.
// .devcontainer/scripts/update-tsconfig.cjs
const fs = require("fs");
const stripJsonComments = require("strip-json-comments").default;

const tsconfigPath = "./tsconfig.app.json";

if (!fs.existsSync(tsconfigPath)) {
  console.log("⏭️ Skipping tsconfig update (file missing).");
  return;
}

try {
  const raw = fs.readFileSync(tsconfigPath, "utf-8");
  const tsconfig = JSON.parse(stripJsonComments(raw));

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.baseUrl = "src";
  tsconfig.compilerOptions.allowUnreachableCode = true;

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log(`✅ Updated ${tsconfigPath} with baseUrl and allowUnreachableCode options.`);
} catch (error) {
  console.error(`❌ Failed to update ${tsconfigPath}:`, error.message);
}

