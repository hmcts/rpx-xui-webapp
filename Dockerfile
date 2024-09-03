FROM hmctspublic.azurecr.io/base/node:18-alpine as base
LABEL maintainer = "HMCTS Expert UI <https://github.com/hmcts>"

USER root
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./
COPY --chown=hmcts:hmcts .yarn ./.yarn

RUN PUPPETEER_SKIP_DOWNLOAD=true yarn workspaces focus --production

COPY --chown=hmcts:hmcts . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
