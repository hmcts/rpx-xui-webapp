import * as http from 'http';
import * as net from 'net';
import { createHash } from 'crypto';
import { legacyCreateProxyMiddleware } from 'http-proxy-middleware';
import { getConfigValue } from './configuration';
import { COOKIES_SESSION_ID, COOKIES_USER_ID, SERVICES_CCD_ACTIVITY_API } from './configuration/references';
import * as log4jui from './lib/log4jui';

const SOCKET_IO_PATH = '/socket.io';
const logger = log4jui.getLogger('socket-proxy');
const userIdCookieName = getConfigValue(COOKIES_USER_ID);
const sessionIdCookieName = getConfigValue(COOKIES_SESSION_ID);

function getRequestHeader(req: http.IncomingMessage, headerName: string): string | undefined {
  const headerValue = req.headers[headerName.toLowerCase()];
  return Array.isArray(headerValue) ? headerValue.join(',') : headerValue;
}

function getWebSocketKeyFingerprint(req: http.IncomingMessage): string | undefined {
  const websocketKey = getRequestHeader(req, 'sec-websocket-key');
  if (!websocketKey) {
    return undefined;
  }

  return createHash('sha256').update(websocketKey).digest('hex').slice(0, 12);
}

function getRequestCookies(req: http.IncomingMessage): Record<string, string> {
  const cookieHeader = getRequestHeader(req, 'cookie');
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader
    .split(';')
    .map((cookiePart) => cookiePart.trim())
    .filter((cookiePart) => cookiePart.length > 0)
    .reduce((cookies, cookiePart) => {
      const separatorIndex = cookiePart.indexOf('=');
      if (separatorIndex <= 0) {
        return cookies;
      }

      const key = cookiePart.slice(0, separatorIndex);
      const value = cookiePart.slice(separatorIndex + 1);
      cookies[key] = value;
      return cookies;
    }, {} as Record<string, string>);
}

function getSocketIoSessionId(req: http.IncomingMessage): string | undefined {
  if (!req.url) {
    return undefined;
  }

  const queryStart = req.url.indexOf('?');
  if (queryStart < 0 || queryStart === req.url.length - 1) {
    return undefined;
  }

  const queryString = req.url.slice(queryStart + 1);
  const sessionIdParam = queryString
    .split('&')
    .map((queryPart) => queryPart.trim())
    .find((queryPart) => queryPart.startsWith('sid='));

  if (!sessionIdParam) {
    return undefined;
  }

  const [, sessionId] = sessionIdParam.split('=', 2);
  return sessionId || undefined;
}

function getUpgradeLogContext(req: http.IncomingMessage): string {
  const cookies = getRequestCookies(req);
  const websocketSessionId = getSocketIoSessionId(req);
  const userId = cookies[userIdCookieName];
  const appSessionId = cookies[sessionIdCookieName];

  return JSON.stringify({
    url: req.url || '<missing>',
    forwardedFor: getRequestHeader(req, 'x-forwarded-for') || '<missing>',
    userAgent: getRequestHeader(req, 'user-agent') || '<missing>',
    origin: getRequestHeader(req, 'origin') || '<missing>',
    websocketKeyFingerprint: getWebSocketKeyFingerprint(req) || '<missing>',
    userId: userId || '<missing>',
    websocketSessionId: websocketSessionId || '<missing>',
    appSessionIdFingerprint: appSessionId
      ? createHash('sha256').update(appSessionId).digest('hex').slice(0, 12)
      : '<missing>',
  });
}

function getSocketHangupReason(socket: net.Socket, hadError: boolean, endedByPeer: boolean, lastErrorMessage?: string): string {
  if (lastErrorMessage) {
    return `socket-error:${lastErrorMessage}`;
  }
  if (hadError) {
    return 'socket-close-with-error';
  }
  if (endedByPeer) {
    return 'peer-ended-connection';
  }
  if (socket.destroyed) {
    return 'socket-destroyed-without-explicit-error';
  }
  return 'socket-closed-without-error';
}

export function attachSocketProxy(server: http.Server): void {
  const wsProxy = legacyCreateProxyMiddleware({
    target: getConfigValue(SERVICES_CCD_ACTIVITY_API),
    ws: true,
    changeOrigin: true,
    timeout: 0,
    proxyTimeout: 0,
    pathRewrite: {
      [`^${SOCKET_IO_PATH}`]: SOCKET_IO_PATH,
    },
  });

  server.on('upgrade', (req, socket: net.Socket, head) => {
    const startedAt = Date.now();
    const context = getUpgradeLogContext(req);
    let endedByPeer = false;
    let lastSocketErrorMessage: string | undefined;

    socket.on('end', () => {
      endedByPeer = true;
      logger.debug(`WebSocket upgrade socket received end from peer context=${context}`);
    });

    socket.on('error', (error: Error) => {
      lastSocketErrorMessage = error.message;
      logger.error(`WebSocket upgrade socket error: ${error.message} context=${context}`);
    });
    socket.on('close', (hadError: boolean) => {
      const hangupReason = getSocketHangupReason(socket, hadError, endedByPeer, lastSocketErrorMessage);
      logger.info(
        `WebSocket upgrade socket closed: hadError=${hadError} hangupReason=${hangupReason} ` +
          `durationMs=${Date.now() - startedAt} context=${context}`
      );
    });

    if (req.url?.startsWith(SOCKET_IO_PATH)) {
      logger.debug(`Accepted WebSocket upgrade for socket.io context=${context}`);
      try {
        wsProxy.upgrade(req, socket, head);
      } catch (error) {
        const upgradeError = error instanceof Error ? error : new Error(String(error));
        const message = upgradeError.message;
        logger.error(`Socket proxy upgrade failed: ${message} context=${context}`);
        socket.destroy(upgradeError);
      }
      return;
    }

    logger.warn(`Rejected unsupported WebSocket upgrade path context=${context}`);
    socket.destroy();
  });
}
