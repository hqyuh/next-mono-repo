FROM node:22-alpine AS base

RUN apk update && apk add --no-cache libc6-compat

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm --activate

WORKDIR /app

# -----------------------
# Builder - Turbo Prune  
# -----------------------
FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

RUN npx turbo prune main --docker

# -----------------------
# Installer
# -----------------------
FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ ./
COPY apps/main/.env ./apps/main/.env

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./
RUN pnpm turbo run build --filter=main...

# -----------------------
# Runner
# -----------------------
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/main/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/main/.next/static ./apps/main/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/main/public ./apps/main/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/main/.env ./apps/main/.env

EXPOSE 3000
CMD ["node", "apps/main/server.js"]
