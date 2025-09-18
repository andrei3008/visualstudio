# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 monolith application called "Visual Studio" - a client portal system for project management. It uses the App Router with built-in API routes, PostgreSQL with Prisma ORM, and NextAuth for authentication. The application is containerized with Docker and designed for deployment via Portainer with Cloudflare Tunnel integration.

## Development Commands

### Local Development
```bash
# Start development environment
docker compose up -d --build
# Access at http://localhost:8007
# Health check: http://localhost:8007/api/health

# Working directly with Next.js app
cd next
npm run dev          # Development server on port 3000
npm run build        # Production build
npm run start        # Production server
npm run prisma:generate      # Generate Prisma client
npm run prisma:migrate:dev  # Run development migrations
npm run prisma:migrate:deploy # Deploy migrations to production
npm run db:push           # Push schema changes to database
npm run db:seed          # Run database seed script
```

### Production Deployment
```bash
# Setup production environment
cp .env.prod.example .env.prod
# Edit .env.prod with your values
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## Architecture & Structure

### Core Stack
- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with custom credentials provider
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Docker containers with Portainer
- **Infrastructure**: Cloudflare Tunnel for public access

### Key Directories
- `next/` - Main Next.js application
  - `src/app/` - App Router pages and API routes
  - `src/lib/` - Utility libraries and configurations
  - `prisma/` - Database schema and migrations
  - `public/` - Static assets

### Database Schema
The application uses Prisma with a comprehensive schema including:
- **User management** with roles (client, staff, admin)
- **Projects** with status tracking
- **Tasks** with assignments and due dates
- **Milestones** for project tracking
- **Messages** with internal/external visibility
- **Files** with upload management
- **Proposals** with items and approval workflow
- **Notifications** for user alerts

### Authentication Flow
- Uses NextAuth.js with custom credentials provider
- Password hashing with bcryptjs
- Role-based access control (client, staff, admin)
- Session management via NextAuth

## Development Patterns

### API Routes
- All API routes follow RESTful conventions
- Located in `src/app/api/` directory
- Use Next.js App Router route handlers
- Authentication checks via NextAuth getServerSession

### Database Operations
- Use Prisma client for all database operations
- Database client initialized in `src/lib/prisma.ts`
- Migrations managed via Prisma migration system
- Seeding script for initial admin user setup

### Component Patterns
- Uses shadcn/ui component library with Radix UI primitives
- Components follow server/client component patterns
- Styling with Tailwind CSS and utility classes
- Form handling with React Hook Form and Zod validation

### Environment Configuration
- Development: `.env` files with docker-compose
- Production: `.env.prod` with docker-compose.prod.yml
- Required: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `DATABASE_URL`
- Optional: Seed variables for initial admin setup

## Docker & Deployment

### Local Development
- Uses `docker-compose.yml` for local development
- Maps port 8007 to container port 3000
- Includes PostgreSQL database service
- Storage volume for file uploads

### Production Deployment
- Uses `docker-compose.prod.yml` for production
- Standalone Next.js build for optimal performance
- Prisma CLI included in runtime image
- Database migrations run on container startup
- Seed script executes for initial setup

### Build Process
- Multi-stage Docker build in `Dockerfile.next`
- Node.js 20 Alpine base image
- Prisma client generation during build
- Standalone output for production deployment

## Project Roadmap

The project follows a phased development approach outlined in `ROADMAP.md`:
1. **Phase 1**: Tasks & Milestones implementation
2. **Phase 2**: Proposals (offers) system
3. **Phase 3**: Messaging system
4. **Phase 4**: File management with S3/MinIO
5. **Phase 5**: Invoicing & payments with Stripe
6. **Security**: Email verification, password reset, rate limiting
7. **Admin**: User management and reporting dashboards

## Important Notes

- The application is designed to be a monolith for simplicity
- Uses Romanian language in some documentation and comments
- Database migrations and seeding run automatically on deployment
- Cloudflare Tunnel integration for production access
- Portainer is the recommended deployment method