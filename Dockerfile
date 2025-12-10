FROM hmctspublic.azurecr.io/base/node:20-alpine as base
LABEL maintainer = "HMCTS Expert UI <https://github.com/hmcts>"

USER root
RUN corepack enable
USER hmcts

WORKDIR /opt/app

FROM base as deps
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml tsconfig.json ./
COPY --chown=hmcts:hmcts .yarn/releases ./.yarn/releases
COPY --chown=hmcts:hmcts .yarn/patches ./.yarn/patches
RUN yarn install --immutable

FROM deps as build
COPY --chown=hmcts:hmcts . .
RUN yarn build

FROM base as prod-deps
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./
COPY --chown=hmcts:hmcts .yarn/releases ./.yarn/releases
COPY --chown=hmcts:hmcts .yarn/patches ./.yarn/patches
RUN yarn install --immutable --mode=production && yarn cache clean

FROM base as runtime
ENV NODE_ENV=production
COPY --from=prod-deps --chown=hmcts:hmcts node_modules ./node_modules
COPY --from=prod-deps --chown=hmcts:hmcts .yarn ./.yarn
COPY --from=prod-deps --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./
COPY --from=build --chown=hmcts:hmcts dist ./dist
COPY --chown=hmcts:hmcts config ./config
EXPOSE 3000
CMD [ "yarn", "start" ]
