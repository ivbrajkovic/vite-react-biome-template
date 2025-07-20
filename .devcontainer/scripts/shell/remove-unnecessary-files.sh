#!/bin/sh
set -e

# This script removes unnecessary files from the project directory.

# Get the current working directory
CURRENT_DIR="$(pwd)"

echo "🗑️  Removing eslint configuration files..."
rm -rf eslint.config.js