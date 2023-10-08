FROM node:18.17.1-slim

WORKDIR /usr/app

COPY . .

RUN npm ci --only=production

RUN npm run build

CMD ["npm", "start"]
