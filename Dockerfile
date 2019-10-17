FROM node:10.14.2-alpine AS builder

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn build

FROM node:10.14.2-alpine
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app/dist
RUN chmod 777 /usr/src/app/dist
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json .
COPY yarn.lock .
RUN yarn install --production
EXPOSE 8080
CMD [ "npm", "start" ]
