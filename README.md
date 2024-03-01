# Tiny URL

## NPM scripts
- `pnpm dev`:  Start the development server.
- `pnpm build`: Build the production version
- `pnpm start`: Start the production server.

## Project Setup
```
pnpm install
pnpm add -g dotenv-cli
```

## Update Database
```
pnpm prisma generate
pnpm prisma db push
```

## Stress Test & Resource Monitoring
Start the stress test and resource monitoring in local.
```
pnpm clinic:dev
```