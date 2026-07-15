import * as http from 'http';
import * as net from 'net';
import { createHash } from 'crypto';
import { legacyCreateProxyMiddleware } from 'http-proxy-middleware';
import { getConfigValue } from './configuration';
import { SERVICES_CCD_ACTIVITY_API } from './configuration/references';
import * as log4jui from './lib/log4jui';

const SOCKET_IO_PATH = '/socket.io';
const logger = log4jui.getLogger('socket-proxy');

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

function getUpgradeLogContext(req: http.IncomingMessage): string {
  return JSON.stringify({
    url: req.url || '<missing>',
    forwardedFor: getRequestHeader(req, 'x-forwarded-for') || '<missing>',
    userAgent: getRequestHeader(req, 'user-agent') || '<missing>',
    origin: getRequestHeader(req, 'origin') || '<missing>',
    websocketKeyFingerprint: getWebSocketKeyFingerprint(req) || '<missing>'
  });
}

function getSocketHangupReason(
  socket: net.Socket,
  hadError: boolean,
  endedByPeer: boolean,
  lastErrorMessage?: string
): string {
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
        `WebSocket upgrade socket closed: hadError=${hadError} hangupReason=${hangupReason} `
        + `durationMs=${Date.now() - startedAt} context=${context}`
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
