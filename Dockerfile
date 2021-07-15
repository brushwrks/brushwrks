FROM node:8-alpine

RUN npm install --global nodemon

WORKDIR /brushwrks
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm","run", "dev"]