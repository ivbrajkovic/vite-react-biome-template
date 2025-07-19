#!/bin/sh
set -e

echo "📦 Installing project dependencies..."
pnpm install

echo "📦 Installing Biome..."
pnpm add -D -E @biomejs/biome

echo "📦 Installing vite-tsconfig-paths..."
pnpm add -D vite-tsconfig-paths

echo "✅ Approving esbuild..."
pnpm approve-builds esbuild