#!/bin/sh
set -eu

echo "[start] Waiting for database and applying migrations..."
ATTEMPTS=0
MAX_ATTEMPTS=40 # ~2 minutes
until prisma migrate deploy; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "[start] Migrations still failing after $ATTEMPTS attempts. Exiting."
    exit 1
  fi
  echo "[start] DB not ready or migration failed. Retrying in 3s... ($ATTEMPTS/$MAX_ATTEMPTS)"
  sleep 3
done

echo "[start] Running seed (idempotent)..."
node prisma/seed.js || echo "[start] Seed failed or already applied; continuing."

echo "[start] Starting Next.js server..."
exec node server.js

