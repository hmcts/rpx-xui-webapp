FROM node:10.14.2-slim

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN npm install

COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
