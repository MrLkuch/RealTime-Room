FROM node:24-alpine AS builder

WORKDIR /app

RUN npm i -g pnpm@9

COPY ./package.json ./package.json

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

ARG PORT=80
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]