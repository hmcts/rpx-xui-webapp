/**
 * Server.ts
 *
 * Server.ts is used to run the application as it moves through the Jenkins pipelines, and on the Preview
 * and higher environments.
 */
import 'source-map-support/register';
import { createApp } from './application';

import * as ejs from 'ejs';
import * as express from 'express';
import * as http from 'http';
import * as net from 'net';
import * as path from 'path';
import { appInsights } from './lib/appInsights';
import errorHandler from './lib/error.handler';
import { removeCacheHeaders } from './lib/middleware/removeCacheHeaders';
import { corsMw } from './security/cors';
import { legacyCreateProxyMiddleware } from 'http-proxy-middleware';
import { getConfigValue } from './configuration';
import { SERVICES_CCD_ACTIVITY_API } from './configuration/references';

createApp()
  .then((app: express.Application) => {
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname);

    app.use(corsMw);

    app.use([removeCacheHeaders, express.static(path.join(__dirname, '..', 'assets'), { index: false, cacheControl: false })]);
    app.use([removeCacheHeaders, express.static(path.join(__dirname, '..'), { index: false, cacheControl: false })]);

    app.use('/*', (req, res) => {
      res.set('Cache-Control', 'no-store, s-maxage=0, max-age=0, must-revalidate, proxy-revalidate');
      res.render('../index', {
        providers: [
          { provide: 'REQUEST', useValue: req },
          { provide: 'RESPONSE', useValue: res }
        ],
        req,
        res
      });
    });

    app.use(appInsights);
    app.use(errorHandler);

const server = http.createServer(app);
    
    // Create a dedicated WebSocket proxy for socket.io
    // This bypasses the auth middleware which doesn't work with WebSocket upgrades
    const wsProxy = legacyCreateProxyMiddleware({
      target: getConfigValue(SERVICES_CCD_ACTIVITY_API),
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/socket.io': '/socket.io'
      }
    });
    
    // Handle WebSocket upgrade requests
    server.on('upgrade', (req, socket: net.Socket, head) => {
      if (req.url && req.url.startsWith('/socket.io')) {
        wsProxy.upgrade(req, socket, head);
      } else {
        socket.destroy();
      }
    });
    
    server.listen(process.env.PORT || 3000, () => {
      console.log('Server listening on port 3000!');
    });
  });
