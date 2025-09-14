#!/bin/sh
set -eu

echo "[start] DATABASE_URL=${DATABASE_URL:-<unset>}"

echo "[start] Resolving DB host..."
getent hosts db || true

echo "[start] Waiting for database readiness (pg_isready)..."
ATTEMPTS=0
MAX_ATTEMPTS=60 # ~2-3 minutes
until pg_isready -h db -p 5432 >/dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "[start] DB not ready after $ATTEMPTS attempts. Exiting."
    exit 1
  fi
  echo "[start] DB not ready yet. Retrying in 3s... ($ATTEMPTS/$MAX_ATTEMPTS)"
  sleep 3
done

echo "[start] Applying migrations..."
ATTEMPTS=0
MAX_ATTEMPTS=20
until prisma migrate deploy; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "[start] Migrations still failing after $ATTEMPTS attempts. Exiting."
    exit 1
  fi
  echo "[start] Migration failed. Retrying in 3s... ($ATTEMPTS/$MAX_ATTEMPTS)"
  sleep 3
done

echo "[start] Running seed (idempotent)..."
node prisma/seed.js || echo "[start] Seed failed or already applied; continuing."

echo "[start] Starting Next.js server..."
exec node server.js
