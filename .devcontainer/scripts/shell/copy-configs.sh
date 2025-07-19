#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "📝 Copying biome.json..."
cp "$SCRIPT_DIR/config/biome.json" ./biome.json

mkdir -p .vscode
if [ ! -f .vscode/settings.json ]; then
  echo "📝 Copying VSCode settings..."
  cp "$SCRIPT_DIR/config/.vscode/settings.json" .vscode/settings.json
else
  echo "⚠️  VSCode settings already exist, skipping copy."
fi
