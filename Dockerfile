FROM node:14-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm install

COPY . /usr/app

EXPOSE 3000

CMD ["npm", "start"]