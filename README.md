# Property Maintenance Platform (MVP)

This repository contains a simple MVP implementation for the Property Maintenance platform described in `Requirement.md`.

## Tech
- Web: Next.js (React + TypeScript)
- API: NestJS (TypeScript) + Prisma
- DB: PostgreSQL

## Local development

### 1) Start database

```bash
docker compose up -d
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create `apps/api/.env`:

```bash
DATABASE_URL="postgresql://app:app@localhost:5432/app?schema=public"
JWT_SECRET="dev_secret_change_me"
PORT=4000
CORS_ORIGIN="http://localhost:3000"
```

Create `apps/web/.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000/api/v1"
```

### 4) Run migrations + seed plans

```bash
npm run db:migrate -w apps/api
npm run db:seed -w apps/api
```

### 5) Start API + Web

```bash
npm run dev
```

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api/v1`

## Deployment (recommended cheap option)

### Render (cheaper than AWS for MVP)
- Deploy **API** as a Docker web service
- Deploy **Web** as a Node web service (or Docker)
- Use **Render PostgreSQL** as managed DB

This repo includes `render.yaml` so you can create all services in one go.

## Deployment (cheapest “no-devops” suggestion)

If you want the **lowest ops/cost** for early MVP:
- **Web**: Vercel (Next.js) or Render
- **API**: Render (Docker) or Fly.io
- **DB**: Render Postgres (or Supabase Postgres)

## Deployment (AWS option)

For AWS, the simplest low-ops path is **Lightsail Containers** (cheaper/simpler than ECS for small MVPs).
This repo includes Dockerfiles so you can deploy API + Web as containers behind a single domain.

### AWS (recommended paths)

#### Option 1: Lightsail Containers (usually cheapest on AWS)
- Build/push images for `apps/api` and `apps/web` to **ECR** (or Docker Hub).
- Create a **Lightsail Container Service**:
  - Deploy `web` as the public endpoint (port 3000)
  - Deploy `api` as a second container (port 4000)
- Provision Postgres via **Lightsail Database** (or RDS).
- Set env vars:
  - API: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`
  - Web: `NEXT_PUBLIC_API_BASE_URL` (point to the API public URL)

#### Option 2: App Runner + RDS (simpler networking than Lightsail)
- Push images to ECR.
- Create an **RDS Postgres** instance.
- Create two **App Runner** services (one for API, one for Web).
- For API → RDS connectivity, use a **VPC Connector**.
- Set env vars as above.

## What’s implemented right now (code)
- **Auth**: email+password registration/login (JWT) for MVP
- **Owner**: create + list properties
- **Plans**: list seeded plans
- **Tickets**: create + list tickets (API)


