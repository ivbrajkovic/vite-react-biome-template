#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "📝 Copying biome.json..."
cp "$SCRIPT_DIR/config/biome.json" ./biome.json

echo "📝 Copying VSCode settings..."
mkdir -p .vscode
cp "$SCRIPT_DIR/config/.vscode/settings.json" .vscode/settings.json
