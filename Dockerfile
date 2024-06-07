FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
