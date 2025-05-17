FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm run build

FROM base AS prod
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "start"]
