#!/bin/bash
set -e

# Compile mainapp/main.ts into build/mainapp/main.js and dependencies
npx tsc

# Combine build/mainapp/main.js and dependencies into website/mainapp.js
npx rollup build/mainapp/main.js \
	--file website/mainapp.js \
	--format iife \
	--output.name mainapp \
	--context exports \
	--sourcemap \
	--plugin rollup-plugin-sourcemaps \
	--plugin @rollup/plugin-node-resolve

# Minify website/mainapp.js into website/mainapp.min.js
npx terser \
	website/mainapp.js \
	--source-map "content='website/mainapp.js.map',url=mainapp.min.js.map" \
	-o website/mainapp.min.js \
	--compress \
	--define OFFLINE=false \
	--mangle \
	--mangle-props regex="/^_.+/;"
	

