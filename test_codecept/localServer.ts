/**
 * localServer.ts used to run the application locally.
 */
import { createApp } from '../api/application';
import { applicationConfiguration } from '../api/configuration/appConfig';
import { appInsights } from '../api/lib/appInsights';
import errorHandler from '../api/lib/error.handler';

import axios from 'axios';

import * as ejs from 'ejs';
import * as express from 'express';
import * as path from 'path';

import { removeCacheHeaders } from '../api/lib/middleware/removeCacheHeaders';

/**
 * Show the developer the application configuration when they are developing locally.
 */

class ApplicationServer {
  server: any;
  app: any;

  async initialize() {
    this.app = await createApp();
    this.app.engine('html', ejs.renderFile);
    this.app.set('view engine', 'html');
    this.app.set('views', path.join(__dirname, ''));

    this.app.use([removeCacheHeaders, express.static(path.join(__dirname, '../dist/rpx-exui', 'assets'), { index: false, cacheControl: false })]);
    this.app.use([removeCacheHeaders, express.static(path.join(__dirname, '../dist/rpx-exui'), { index: false, cacheControl: false })]);

    this.app.use('/*', (req, res) => {
      res.set('Cache-Control', 'no-store, s-maxage=0, max-age=0, must-revalidate, proxy-revalidate');
      res.render('../dist/rpx-exui/index', {
        providers: [
          { provide: 'REQUEST', useValue: req },
          { provide: 'RESPONSE', useValue: res }
        ],
        req,
        res
      });
    });

    console.log(applicationConfiguration());

    this.app.use(appInsights);
    this.app.use(errorHandler);
  }

  async start() {
    if (process.env.SSR_ALREADY_RUNNING === 'true') {
      console.log('[localServer] SSR already up – skipping second listen()');
      return;
    }
    if (!this.app) {
      await this.initialize();
    }
    this.server = await this.app.listen(3000);
    try {
      const res = await axios.get('http://localhost:3000/auth/isAuthenticated');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async stop() {
    if (!this.server) {
      console.log('[SSR] stop() called but no server instance - skipping');
      return;
    }
    await this.server.close();
  }
}

const applicationServer = new ApplicationServer();

// applicationServer.start()
export default applicationServer;
