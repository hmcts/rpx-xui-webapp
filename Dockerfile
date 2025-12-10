FROM hmctspublic.azurecr.io/base/node:20-alpine AS base
LABEL maintainer="HMCTS Expert UI <https://github.com/hmcts>"

USER root
ENV YARN_CACHE_FOLDER=/tmp/.yarn-cache
RUN corepack enable \
  && mkdir -p /opt/app/.yarn/cache "$YARN_CACHE_FOLDER" \
  && chown -R hmcts:hmcts /opt/app "$YARN_CACHE_FOLDER"
USER hmcts

WORKDIR /opt/app

FROM base AS deps
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml tsconfig.json ./
COPY --chown=hmcts:hmcts .yarn/releases ./.yarn/releases
COPY --chown=hmcts:hmcts .yarn/patches ./.yarn/patches
RUN yarn install --mode=skip-build

FROM deps AS build
COPY --chown=hmcts:hmcts . .
RUN yarn build

FROM deps AS prod-deps
RUN NODE_ENV=production yarn workspaces focus --all --production --persist-lockfile false \
  && yarn cache clean \
  && rm -rf .yarn/install-state.gz .yarn/unplugged

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=prod-deps --chown=hmcts:hmcts /opt/app/node_modules ./node_modules
COPY --from=build --chown=hmcts:hmcts /opt/app/dist ./dist
COPY --chown=hmcts:hmcts config ./config
EXPOSE 3000
CMD [ "node", "dist/rpx-exui/api/server.bundle.js" ]
