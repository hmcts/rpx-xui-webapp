FROM node:12.13.0-slim

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn cache clean
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 3000
