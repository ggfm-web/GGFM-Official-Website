# --- Stage 1: Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package management files
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# --- Stage 2: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. Accept build arguments
ARG NEXT_PUBLIC_SUPABASE_URL=https://jancsjgejlrlcfqnhiij.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbmNzamdlamxybGNmcW5oaWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDIxNDcsImV4cCI6MjA3MzYxODE0N30.RpZ99Z-ehuLM2VDn5EAMkKR7pa4AgEyym79ZQf0EsF8

# 2. Expose as environment variables to Next.js during build (client-side JS bundle)
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_TELEMETRY_DISABLED=1

# 3. Compile static pages and JS bundles
RUN npm run build

# --- Stage 3: Production Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 4. Expose environment variables to Node.js server at RUNTIME (server components / API routes / SSR)
ENV NEXT_PUBLIC_SUPABASE_URL=https://jancsjgejlrlcfqnhiij.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbmNzamdlamxybGNmcW5oaWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDIxNDcsImV4cCI6MjA3MzYxODE0N30.RpZ99Z-ehuLM2VDn5EAMkKR7pa4AgEyym79ZQf0EsF8

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and standalone build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]