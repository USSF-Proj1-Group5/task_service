FROM node:current-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 2222

CMD [ "npm", "start" ]