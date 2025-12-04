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
import * as path from 'path';
import { appInsights } from './lib/appInsights';
import errorHandler from './lib/error.handler';
import { removeCacheHeaders } from './lib/middleware/removeCacheHeaders';
import { corsMw } from './security/cors';

createApp()
  .then((app: express.Application) => {
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname);

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
    
    // Handle WebSocket upgrade requests - required for socket.io proxy to work
    // http-proxy-middleware with ws: true needs the HTTP server to emit 'upgrade' events
    // which are then handled by the middleware's upgrade handler
    server.on('upgrade', (req, socket, head) => {
      // When using http-proxy-middleware with ws: true, we need to manually trigger
      // the middleware stack for upgrade requests since Express doesn't do this automatically
      const res: any = new http.ServerResponse(req);
      res.assignSocket(socket);
      
      // Trigger the middleware chain - this allows http-proxy-middleware to intercept
      // WebSocket upgrade requests for paths like /socket.io
      app.handle(req, res, () => {
        // If no middleware handled it, destroy the socket
        socket.destroy();
      });
    });
    
    server.listen(process.env.PORT || 3000, () => {
      console.log('Server listening on port 3000!');
    });
  });
