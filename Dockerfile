FROM node:10.14.2-alpine

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app/.sessions
RUN chmod 777 /usr/src/app/.sessions
WORKDIR /usr/src/app

COPY hello.js .

ENV NODE_ENV=production
EXPOSE 8080
CMD [ "node", "hello.js" ]
