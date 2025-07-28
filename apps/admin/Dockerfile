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

RUN npx turbo prune admin --docker

# -----------------------
# Installer
# -----------------------
FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ ./
COPY apps/admin/.env ./apps/admin/.env

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./
RUN pnpm turbo run build --filter=admin...

# -----------------------
# Runner
# -----------------------
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.env ./apps/admin/.env

EXPOSE 3001
CMD ["node", "apps/admin/server.js"]
