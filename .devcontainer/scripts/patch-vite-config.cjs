const fs = require("fs");

const VITE_CONFIG_PATH = "./vite.config.ts";

if (!fs.existsSync(VITE_CONFIG_PATH)) {
  console.log("⏭️ Skipping vite config patch (file missing).");
  return;
}

const addTsconfigPaths = (code) => {
  if (code.includes("vite-tsconfig-paths")) {
    console.log("⏭️ tsconfigPaths already imported.");
    return code;
  }

  const importMarker = "import react from '@vitejs/plugin-react';";
  if (!code.includes(importMarker)) {
    console.warn("⚠️ vite.config.ts structure not recognized. Skipping tsconfigPaths patch.");
    return code;
  }

  const updated = code
    .replace(
      importMarker,
      `${importMarker}\nimport tsconfigPaths from 'vite-tsconfig-paths';`,
    )
    .replace(
      /plugins:\s*\[\s*react\(\)\s*\]/,
      "plugins: [react(), tsconfigPaths()]",
    );

  console.log("✅ Added tsconfigPaths to plugins.");
  return updated;
};

const patchServerProp = (code) => {
  const serverPattern = /server:\s*\{[^}]*host:\s*true/;
  if (serverPattern.test(code)) {
    console.log("⏭️ server.host already set to true.");
    return code;
  }

  const definePattern = /defineConfig\(\{([\s\S]*?)\}\)/;
  if (!definePattern.test(code)) {
    console.warn("⚠️ Cannot find defineConfig body. Skipping server patch.");
    return code;
  }

  const updated = code.replace(definePattern, (_, inner) =>
    `defineConfig({\n${inner.trim()},\n  server: { host: true }\n})`,
  );

  console.log("✅ Added server: { host: true }.");
  return updated;
};

try {
  let code = fs.readFileSync(VITE_CONFIG_PATH, "utf-8");

  const originalCode = code;
  code = addTsconfigPaths(code);
  code = patchServerProp(code);

  if (code !== originalCode) {
    fs.writeFileSync(VITE_CONFIG_PATH, code);
    console.log("✅ vite.config.ts successfully updated.");
  } else {
    console.log("ℹ️ No changes were made to vite.config.ts.");
  }
} catch (error) {
  console.error(`❌ Failed to patch ${VITE_CONFIG_PATH}:`, error.message);
}
