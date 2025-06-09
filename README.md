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
