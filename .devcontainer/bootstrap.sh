#!/bin/sh
set -e

# Check if project is already initialized
if [ -f "package.json" ]; then
  echo "⚠️  Project already initialized."

  printf "❓ Do you want to reset the project (delete everything except .devcontainer)? [y/N]: "
  read -r response

  if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
    echo "♻️  Clearing project directory..."
    find . -mindepth 1 -maxdepth 1 ! -name '.devcontainer' -exec rm -rf {} +
    echo "🔁 Continuing bootstrap after cleanup..."
  else
    echo "⏭️  Skipping bootstrap."
    exit 0
  fi
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

"$SCRIPT_DIR/scripts/setup-git-user.sh"
"$SCRIPT_DIR/scripts/scaffold-project.sh"
node "$SCRIPT_DIR/scripts/clean-eslint.cjs"
"$SCRIPT_DIR/scripts/install-deps.sh"
"$SCRIPT_DIR/scripts/copy-configs.sh"
node "$SCRIPT_DIR/scripts/patch-vite-config.cjs"
node "$SCRIPT_DIR/scripts/update-tsconfig.cjs"

echo "📦 Final dependency install..."
pnpm install

echo "✅ Setup complete. Happy coding!"
