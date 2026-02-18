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
COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./

# Install dependencies once
RUN yarn install

FROM dependencies AS build

# Copy source files
COPY --chown=hmcts:hmcts . .

# Build the application (dependencies already installed)
RUN yarn build

FROM hmctspublic.azurecr.io/base/node:20-alpine AS runtime
LABEL maintainer="HMCTS Expert UI <https://github.com/hmcts>"

USER root
RUN corepack enable
USER hmcts

# Copy only production dependencies
COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./
RUN yarn workspaces focus --production && yarn cache clean

# Copy built artifacts from build stage
COPY --from=build --chown=hmcts:hmcts $WORKDIR/dist ./dist
COPY --from=build --chown=hmcts:hmcts $WORKDIR/api ./api

# Copy runtime configuration (node-config expects this directory)
COPY --from=build --chown=hmcts:hmcts $WORKDIR/config ./config

USER hmcts
EXPOSE 3000
CMD [ "yarn", "start" ]
