
FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache curl \
 && corepack enable \
 && corepack prepare pnpm@latest --activate

COPY ./package.json ./package.json

RUN pnpm install --no-frozen-lockfile

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]