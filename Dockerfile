FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY .env .env

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]