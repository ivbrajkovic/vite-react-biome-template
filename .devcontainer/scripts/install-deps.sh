#!/bin/sh
set -e

echo "📦 Installing Biome..."
pnpm install -D @biomejs/biome

echo "📦 Installing vite-tsconfig-paths..."
pnpm add -D vite-tsconfig-paths

echo "📦 Installing strip-json-comments for tsconfig patching..."
pnpm add -D strip-json-comments

echo "✅ Approving esbuild..."
pnpm approve-builds esbuild