FROM node:20 as builder

WORKDIR /usr/src/app

RUN npm build

COPY . .

FROM node:slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --only=prod

COPY --from=builder /usr/src/app/dist ./dist

ENV PORT 3000
EXPOSE $PORT

CMD [ "node", "dist/server.js" ]


