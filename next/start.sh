#!/bin/sh
set -eu

echo "[start] Bootstrapping environment"

# Load runtime env file if present
if [ -f .env.runtime ]; then
  set -a
  . ./.env.runtime
  set +a
fi

# Generate NEXTAUTH_SECRET if missing
if [ -z "${NEXTAUTH_SECRET:-}" ]; then
  if command -v node >/dev/null 2>&1; then
    NEXTAUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))" 2>/dev/null || true)
  fi
  if [ -z "$NEXTAUTH_SECRET" ] && command -v openssl >/dev/null 2>&1; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || true)
  fi
  NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-devsecret}
  export NEXTAUTH_SECRET
fi

# Compose DATABASE_URL from POSTGRES_PASSWORD if empty
if [ -z "${DATABASE_URL:-}" ] && [ -n "${POSTGRES_PASSWORD:-}" ]; then
  export DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/client_portal?schema=public"
fi

# Default NEXTAUTH_URL if empty
if [ -z "${NEXTAUTH_URL:-}" ]; then
  export NEXTAUTH_URL="http://localhost:8007"
fi

# Create a materialized runtime env file for debugging/reference
if [ ! -f .env.runtime ] && [ -f .env.prod.example ]; then
  cat > .env.runtime <<EOF
NEXTAUTH_URL=${NEXTAUTH_URL}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
DATABASE_URL=${DATABASE_URL}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
SEED_ADMIN_EMAIL=${SEED_ADMIN_EMAIL}
SEED_ADMIN_PASSWORD=${SEED_ADMIN_PASSWORD}
SEED_ADMIN_NAME=${SEED_ADMIN_NAME}
EOF
fi

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
