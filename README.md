# funnelOS

This repository contains a tRPC + Express scaffold ready for production use.
It features:

- **tRPC** API server running on Express
- **Database connection helper** to integrate any DB
- **Prisma** ORM for database access
- **Pino** based logger
- **Prometheus** metrics endpoint
- **Sentry** integration for error tracking
- **Dockerfile** and **Kubernetes** manifests
- **Centralized error handling** with standardized error codes

## Environment variables

Copy `.env.example` to `.env` and adjust the values as needed:

```
PORT=3000
DATABASE_URL=mongodb://user:password@localhost:27017/mydb
LOG_LEVEL=info
SENTRY_DSN=
```

`DATABASE_URL` should be a valid MongoDB connection string. `LOG_LEVEL` and
`SENTRY_DSN` are optional.

## Development

```bash
npm install
npm run dev
```

Generate Prisma client:

```bash
npm run prisma:generate
```

## Build

```bash
npm run build
```

## Docker

```bash
docker build -t funnelos .
docker run -p 3000:3000 funnelos
```

## Kubernetes

```bash
kubectl apply -f k8s/
```

## Endpoints

- `/trpc` - tRPC API
- `/metrics` - Prometheus metrics
- `/health` - health check
