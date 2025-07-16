#!/bin/sh
set -e

# Idempotency: skip if package.json exists
if [ -f "package.json" ]; then
  echo "⚠️ Project already initialized. Skipping."
  exit 0
fi

echo "🧱 Scaffolding Vite + React + TS app inside container volume..."

# Scaffold the Vite project
pnpm create vite@latest . --template react-ts

# Install Biome
echo "Installing Biome..."
pnpm install -D @biomejs/biome

# Get directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Copy biome_config.json from the script directory to project root
echo "Copying biome_config.json to project root..."
cp "$SCRIPT_DIR/biome_config.json" .

# Final install
echo "Installing project dependencies..."
pnpm install

echo "✅ Setup complete. Happy coding!"
