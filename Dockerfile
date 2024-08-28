FROM hmctspublic.azurecr.io/base/node:18-alpine as base
LABEL maintainer = "HMCTS Expert UI <https://github.com/hmcts>"

USER root
RUN corepack enable
USER hmcts

# Copy only necessary files for dependency installation
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./
COPY --chown=hmcts:hmcts .yarn ./.yarn

# Install dependencies with frozen lockfile
RUN yarn workspaces focus --all

# Build stage
FROM base as build
COPY --chown=hmcts:hmcts . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
