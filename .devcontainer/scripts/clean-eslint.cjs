// .devcontainer/scripts/clean-eslint.cjs
// biome-ignore lint/style/useNodejsImportProtocol: This will be run in a Node.js environment.
const fs = require("fs");

const eslintConfigPath = "./eslint.config.js";
const packageJsonPath = "./package.json";

const removeEslintConfig = () => {
  if (fs.existsSync(eslintConfigPath)) {
    fs.unlinkSync(eslintConfigPath);
    console.log("🧹 Removed eslint.config.js");
  } else {
    console.log("⏭️ No eslint.config.js found.");
  }
};

const updatePackageJson = () => {
  if (!fs.existsSync(packageJsonPath)) {
    console.warn("⚠️ package.json not found. Skipping ESLint cleanup.");
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    const removeDeps = [
      "eslint",
      "@eslint/js",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "eslint-plugin-react-refresh",
      "globals",
      "typescript-eslint",
    ];

    const beforeCount = Object.keys(packageJson.devDependencies || {}).length;

    packageJson.devDependencies = Object.fromEntries(
      Object.entries(packageJson.devDependencies || {}).filter(
        ([k]) => !removeDeps.includes(k),
      ),
    );

    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.lint = "biome lint .";
    packageJson.scripts.format = "biome format . --write";

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const afterCount = Object.keys(packageJson.devDependencies).length;
    const removedCount = beforeCount - afterCount;

    console.log(`✅ Updated package.json (${removedCount} ESLint deps removed).`);
  } catch (error) {
    console.error(`❌ Failed to update package.json:`, error.message);
  }
};

removeEslintConfig();
updatePackageJson();
