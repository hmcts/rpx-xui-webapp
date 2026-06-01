import * as http from 'http';
import * as net from 'net';
import { legacyCreateProxyMiddleware } from 'http-proxy-middleware';
import { getConfigValue } from './configuration';
import { SERVICES_CCD_ACTIVITY_API } from './configuration/references';
import * as log4jui from './lib/log4jui';

const SOCKET_IO_PATH = '/socket.io';
const logger = log4jui.getLogger('socket-proxy');

export function attachSocketProxy(server: http.Server): void {
  const wsProxy = legacyCreateProxyMiddleware({
    target: getConfigValue(SERVICES_CCD_ACTIVITY_API),
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      [`^${SOCKET_IO_PATH}`]: SOCKET_IO_PATH,
    },
  });

  server.on('upgrade', (req, socket: net.Socket, head) => {
    if (req.url?.startsWith(SOCKET_IO_PATH)) {
      wsProxy.upgrade(req, socket, head);
      return;
    }

    logger.warn(`Rejected unsupported WebSocket upgrade path: ${req.url || '<missing>'}`);
    socket.destroy();
  });
}
