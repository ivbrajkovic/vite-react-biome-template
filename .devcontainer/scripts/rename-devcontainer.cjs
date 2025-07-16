const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const DEVCONTAINER_PATH = ".devcontainer/devcontainer.json";
const DEFAULT_DEVCONTAINER_NAME = "vite-react-biome-template";

const devcontainer = JSON.parse(fs.readFileSync(DEVCONTAINER_PATH, "utf-8"));

if (devcontainer.name !== DEFAULT_DEVCONTAINER_NAME) {
  console.log(`⏭️ Devcontainer name is already set to "${devcontainer.name}". No changes made.`);
  return;
}

const rl = readline.createInterface({ input, output });

rl.question(
  `Please enter a new name for your devcontainer (default: ${DEFAULT_DEVCONTAINER_NAME}): `,
  (newName) => {
    const newNameTrimmed = newName.trim();

    if (!newNameTrimmed) {
      console.log(`ℹ️ No name provided. Keeping default: "${DEFAULT_DEVCONTAINER_NAME}".`);
      newName = DEFAULT_DEVCONTAINER_NAME;
    }

    if (newNameTrimmed === devcontainer.name) {
      console.log(`⏭️ New name is the same as the current name. No changes made.`);
      rl.close();
      return;
    }

    devcontainer.name = newNameTrimmed;

    fs.writeFileSync(DEVCONTAINER_PATH, JSON.stringify(devcontainer, null, 2));
    rl.close();

    console.log(`✅ Devcontainer name updated to "${devcontainer.name}".`);
  },
);
  