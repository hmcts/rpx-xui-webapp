FROM hmctspublic.azurecr.io/base/node:20-alpine AS dependencies
LABEL maintainer="HMCTS Expert UI <https://github.com/hmcts>"

ENV PUPPETEER_SKIP_DOWNLOAD=1 \
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 \
  CHROMEDRIVER_SKIP_DOWNLOAD=1 \
  CYPRESS_INSTALL_BINARY=0 \
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
  PLAYWRIGHT_BROWSERS_PATH=0 \
  SENTRYCLI_SKIP_DOWNLOAD=1 \
  NPM_CONFIG_FUND=false \
  NPM_CONFIG_AUDIT=false \
  NPM_CONFIG_UPDATE_NOTIFIER=false \
  SCARF_ANALYTICS=false

USER root
RUN corepack enable
USER hmcts

# Copy only dependency files for better layer caching
COPY --chown=hmcts:hmcts .yarn/ ./.yarn/
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./

# Install dependencies once
RUN yarn install

FROM dependencies AS build

# Copy source files
COPY --chown=hmcts:hmcts . .

# Build the application (dependencies already installed), then prune to production deps
RUN yarn build \
  && yarn workspaces focus --production \
  && yarn cache clean

FROM hmctspublic.azurecr.io/base/node:20-alpine AS runtime
LABEL maintainer="HMCTS Expert UI <https://github.com/hmcts>"

USER root
RUN corepack enable
USER hmcts

# Copy only production dependencies from build stage
COPY --from=build --chown=hmcts:hmcts $WORKDIR/.yarn/ ./.yarn/
COPY --from=build --chown=hmcts:hmcts $WORKDIR/node_modules $WORKDIR/package.json $WORKDIR/yarn.lock $WORKDIR/.yarnrc.yml ./

# Copy built artifacts from build stage
COPY --from=build --chown=hmcts:hmcts $WORKDIR/dist $WORKDIR/api $WORKDIR/config ./
EXPOSE 3000
CMD [ "yarn", "start" ]
