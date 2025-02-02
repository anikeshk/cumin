FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src .
COPY ./.env .

EXPOSE 5000

CMD ["node", "--env-file=.env", "index.js"]