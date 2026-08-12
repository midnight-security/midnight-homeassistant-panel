#!/usr/bin/env bash
# Run by semantic-release's @semantic-release/exec prepareCmd. Stamps the new
# version into every place this repo tracks it, rebuilds the frontend bundle
# so its baked-in VERSION string isn't stale, and zips the integration folder
# for the GitHub Release - deliberately excluding frontend/'s dev-only tree
# (node_modules, src, build config) which must never ship to HACS users.
set -euo pipefail

VERSION="$1"
PLUGIN_DIR="custom_components/midnight_911_frontend_plugin"

# Only manifest.json gets bumped here - it's the one version string anything
# actually reads (HA core / HACS). Root package.json and frontend/package.json
# also have "version" fields, but nothing consumes either at runtime or build
# time (semantic-release itself determines the next version from git tags, not
# from package.json's own field) - bumping them would just be cosmetic
# bookkeeping for two extra sed targets, not worth the risk. Also deliberately
# not touching frontend/package-lock.json: a lockfile has one "version" entry
# per dependency (hundreds of them), and a blind regex replace would corrupt
# every locked dependency version, not just a root package's self-reference.
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" \
  "$PLUGIN_DIR/manifest.json"

sed -i "s/export const VERSION = '[^']*'/export const VERSION = '$VERSION'/" \
  "$PLUGIN_DIR/frontend/src/const.ts"

(cd "$PLUGIN_DIR/frontend" && npm install && npm run build)

rm -f midnight_911_frontend_plugin.zip
(cd "$PLUGIN_DIR" && zip -r ../../midnight_911_frontend_plugin.zip . \
  -x '.*' \
  -x '*/.*' \
  -x '__pycache__/*' \
  -x 'release-prepare.sh' \
  -x 'frontend/node_modules/*' \
  -x 'frontend/src/*' \
  -x 'frontend/localize/*' \
  -x 'frontend/package.json' \
  -x 'frontend/package-lock.json' \
  -x 'frontend/rollup.config.js' \
  -x 'frontend/tsconfig.json' \
  -x 'frontend/eslint.config.js')
