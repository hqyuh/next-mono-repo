FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm

WORKDIR /app
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./
COPY ../../apps/web/package.json ./apps/web/
COPY ../../packages ./packages
RUN pnpm install
COPY . .

# Next.js collects anonymous telemetry data about general usage, which we opt out from
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

COPY ../../apps/web/.env ./.env 

COPY ../../apps/web ./apps/web

RUN pnpm build

FROM base as prod
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/apps/web/node_modules ./node_modules

# Next.js collects anonymous telemetry data about general usage, which we opt out from
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder /app/apps/web/next.config.mjs ./next.config.mjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]