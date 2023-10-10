FROM node:18.17.1-slim

WORKDIR /usr/app

COPY . .

RUN npm ci --only=production

# ARG NEXT_PUBLIC_REDIS_URL

# ENV _NEXT_PUBLIC_REDIS_URL=$NEXT_PUBLIC_REDIS_URL

RUN npm run build

CMD ["npm", "start"]
