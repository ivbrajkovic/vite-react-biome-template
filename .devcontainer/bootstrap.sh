# This script bootstraps the project by setting up the necessary files and configurations.

#!/bin/sh
set -e

# Get the directory of the current script
# This allows the script to be run from anywhere without needing to specify the full path
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check if the project is already bootstrapped
# "$SCRIPT_DIR/scripts/shell/check-bootstrap.sh" || exit 0;

echo "🔄 Starting project bootstrap..."

# Set up the project structure
"$SCRIPT_DIR/scripts/shell/scaffold-project.sh"

# Patch necessary files
# node "$SCRIPT_DIR/scripts/node/patch-package-json.cjs"
# node "$SCRIPT_DIR/scripts/node/patch-tsconfig-app-json.cjs"
# node "$SCRIPT_DIR/scripts/node/patch-vite-config.cjs"

# Copy configuration files
# "$SCRIPT_DIR/scripts/shell/copy-configs.sh"

# Install dependencies
# "$SCRIPT_DIR/scripts/shell/install-deps.sh"

# Set up Git user configuration
# "$SCRIPT_DIR/scripts/shell/setup-git-user.sh"

echo "✅ Setup complete. Happy coding!"
