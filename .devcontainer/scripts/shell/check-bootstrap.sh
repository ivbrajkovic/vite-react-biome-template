#!/bin/sh
set -e

# Check if project is already initialized
if [ -f "package.json" ]; then
  echo "⚠️  Project already initialized."

  printf "❓ Do you want to reset the project (delete everything except .devcontainer)? [y/N]: "
  read -r response

  if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
    echo "♻️  Clearing project directory..."
    find . -mindepth 1 -maxdepth 1 \
      ! -name '.devcontainer' \
      ! -name '.vscode' \
      ! -name '.git' \
      -exec rm -rf {} +
    echo "✅ Project directory cleared."
    echo "🔁 Continuing bootstrap after cleanup..."
  else
    echo "⏭️  Skipping bootstrap."
    exit 1
  fi
fi