FROM node:18.17.1-slim

WORKDIR /usr/app

COPY . .

RUN npm ci --only=production

ARG NEXT_PUBLIC_REDIS_URL

ENV NEXT_PUBLIC_REDIS_URL=$_NEXT_PUBLIC_REDIS_URL

# Echo the environment variable for verification
RUN echo "NEXT_PUBLIC_REDIS_URL: $_NEXT_PUBLIC_REDIS_URL"

RUN npm run build



CMD ["npm", "start"]
