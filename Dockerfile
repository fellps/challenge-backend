FROM node:12.16.3-alpine

WORKDIR /usr/challenge/

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD  ["npm", "run", "dev"]