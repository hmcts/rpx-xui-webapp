FROM hmctspublic.azurecr.io/base/node:20-alpine AS dependencies
LABEL maintainer="HMCTS Expert UI <https://github.com/hmcts>"

WORKDIR /opt/app

USER root
RUN corepack enable
USER hmcts

# Copy only dependency files for better layer caching
COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./

# Install dependencies once
RUN yarn install

FROM dependencies AS build

WORKDIR /opt/app

# Copy source files
COPY --chown=hmcts:hmcts . .

# Build the application (dependencies already installed)
RUN yarn build

FROM hmctspublic.azurecr.io/base/node:20-alpine AS runtime
LABEL maintainer="HMCTS Expert UI <https://github.com/hmcts>"

WORKDIR /opt/app

USER root
RUN corepack enable
USER hmcts

# Copy only production dependencies
COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./
RUN yarn workspaces focus --production && yarn cache clean

# Copy built artifacts from build stage
# NOTE: Use explicit paths; $WORKDIR isn't reliably set across stages.
COPY --from=build --chown=hmcts:hmcts /opt/app/dist ./dist
COPY --from=build --chown=hmcts:hmcts /opt/app/api ./api

USER hmcts
EXPOSE 3000
CMD [ "yarn", "start" ]
