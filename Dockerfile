FROM oven/bun:latest

WORKDIR /usr/app

COPY . .

RUN bun install --production

RUN bun run build

CMD ["bun", "start"]
