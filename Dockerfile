FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.example .env

EXPOSE 5000

CMD ["npm", "start"]