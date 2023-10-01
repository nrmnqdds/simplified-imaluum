FROM node:18.17.1-slim

WORKDIR /usr/app

COPY . .

RUN npm ci --only=production

ARG NEXT_PUBLIC_REDIS_URL
ENV NEXT_PUBLIC_REDIS_URL=$NEXT_PUBLIC_REDIS_URL

RUN npm run build

# Note: this installs the necessary libs to make the browser work with Puppeteer.
# RUN apt-get update && apt-get install gnupg wget -y && \
#     wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#     sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#     apt-get update && \
#     apt-get install google-chrome-stable -y --no-install-recommends && \
#     rm -rf /var/lib/apt/lists/*

CMD ["npm", "start"]