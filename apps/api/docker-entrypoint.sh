#!/usr/bin/env sh
set -eu

# Apply DB migrations (safe to run on every boot)
./node_modules/.bin/prisma migrate deploy

exec node dist/main.js

