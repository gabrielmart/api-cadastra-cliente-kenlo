FROM node:20

WORKDIR /home/node/app

COPY . .

RUN npm i --only=prod

CMD NODE_URLS=http://*:$PORT npm start