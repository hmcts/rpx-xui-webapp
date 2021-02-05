FROM hmctspublic.azurecr.io/base/node:12-alpine as base

LABEL maintainer = "HMCTS Expert UI <https://github.com/hmcts>"

USER hmcts

ENV WORKDIR /opt/app

WORKDIR ${WORKDIR}

COPY --chown=hmcts:hmcts ./ /opt/app/

RUN npm rebuild node-sass && yarn install && yarn build && rm -r node_modules/ && rm -r ~/.cache/yarn

EXPOSE 3000

CMD [ "yarn", "start" ]