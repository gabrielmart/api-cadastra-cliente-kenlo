FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . .

RUN npm i -g typescript

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]