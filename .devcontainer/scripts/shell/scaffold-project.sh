#!/bin/sh
set -e

echo "🧱 Scaffolding Vite + React + TS..."
pnpm create vite@latest . --template react-ts --ignore
