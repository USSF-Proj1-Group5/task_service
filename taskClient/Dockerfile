FROM node:current-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

# ENV PATH /app/node_modules/.bin:$PATH

COPY . /src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
