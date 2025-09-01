#!/bin/bash

# SAYMON Metrics Chart Build Script
echo "Building SAYMON Metrics Chart..."

# Create dist directory
mkdir -p dist

# Copy HTML files
echo "Copying HTML files..."
cp index.html dist/
cp widget.html dist/
cp standalone.html dist/

# Copy CSS files
echo "Copying CSS files..."
cp style.css dist/
cp index-Qi_VvB8y.css dist/

# Copy JavaScript files
echo "Copying JavaScript files..."
cp main.js dist/

# Copy local D3 runtime so app works offline
if [ -f public/d3.v7.min.js ]; then
  cp public/d3.v7.min.js dist/
fi

# Copy documentation
echo "Copying documentation..."
cp README.md dist/
cp WIDGET_README.md dist/

# Copy package.json for reference
cp package.json dist/

echo "Build complete! Files are in the dist/ directory:"
echo "- index.html (main application)"
echo "- widget.html (embeddable widget)"
echo "- standalone.html (standalone version)"
echo "- README.md (main documentation)"
echo "- WIDGET_README.md (widget documentation)"
