FROM hmctspublic.azurecr.io/base/node:12-alpine as base

LABEL maintainer = "HMCTS Expert UI <https://github.com/hmcts>"

COPY --chown=hmcts:hmcts package.json yarn.lock ./

FROM base as build

RUN yarn

COPY --chown=hmcts:hmcts . .
RUN yarn build && rm -r node_modules/ && rm -r ~/.cache/yarn

FROM base as runtime
COPY --from=build $WORKDIR ./
USER hmcts
EXPOSE 3000
CMD [ "yarn", "start" ]
