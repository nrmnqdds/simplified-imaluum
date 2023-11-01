FROM node:18.18.0-slim

WORKDIR /usr/app

COPY . .

RUN npm ci --omit=dev

RUN npm run build

CMD ["npm", "start"]
