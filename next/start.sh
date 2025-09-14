#!/bin/sh
set -eu

echo "[start] DATABASE_URL=${DATABASE_URL:-<unset>}"

# Parse DATABASE_URL: postgresql://user:pass@host:port/db?...
URL_NO_SCHEME=${DATABASE_URL#postgresql://}
UPH=${URL_NO_SCHEME%%/*}
DBQ=${URL_NO_SCHEME#*/}
DB=${DBQ%%\?*}
USERPASS=${UPH%@*}
HOSTPORT=${UPH#*@}
DB_USER=${USERPASS%%:*}
DB_PASS=${USERPASS#*:}
DB_HOST=${HOSTPORT%%:*}
DB_PORT=${HOSTPORT#*:}
[ "$DB_HOST" = "$HOSTPORT" ] && DB_PORT=5432

echo "[start] Parsed DB → host=$DB_HOST port=$DB_PORT db=$DB user=$DB_USER"

echo "[start] DNS lookup for host: $DB_HOST"
nslookup "$DB_HOST" 2>/dev/null || true

echo "[start] Waiting for database readiness (psql ping)..."
ATTEMPTS=0
MAX_ATTEMPTS=60
until PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB" -c 'SELECT 1' -tA >/dev/null 2>&1; do
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
