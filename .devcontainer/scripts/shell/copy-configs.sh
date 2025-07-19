#!/bin/sh
set -e

CONFIG_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

echo "📝 Copying biome.json..."
cp "$CONFIG_DIR/config/biome.json" ./biome.json

mkdir -p .vscode
if [ ! -f .vscode/settings.json ]; then
  echo "📝 Copying VSCode settings..."
  cp "$CONFIG_DIR/config/.vscode/settings.json" .vscode/settings.json
else
  echo "⚠️  VSCode settings already exist, skipping copy."
fi
