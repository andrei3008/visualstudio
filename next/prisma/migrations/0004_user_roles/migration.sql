-- Enum and column for user roles
CREATE TYPE "UserRole" AS ENUM ('client', 'staff', 'admin');
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'client';
