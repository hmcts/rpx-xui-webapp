// localServer.ts
import { createApp } from '../api/application';
import { applicationConfiguration } from '../api/configuration/appConfig';
import { appInsights } from '../api/lib/appInsights';
import errorHandler from '../api/lib/error.handler';

import axios from 'axios';
import * as express from 'express';
import * as path from 'path';
import { existsSync, readFileSync } from 'fs';

import { removeCacheHeaders } from '../api/lib/middleware/removeCacheHeaders';

function loadIndexHtml(): string {
  const built = path.join(__dirname, '../dist/rpx-exui', 'index.html');
  return readFileSync(built, 'utf8');
}
const indexHtmlRaw = loadIndexHtml();

function injectNonce(html: string, nonce: string): string {
  return html.replace(/{{\s*cspNonce\s*}}/g, nonce);
}

class ApplicationServer {
  server: any;
  app: any;

  async initialize() {
    this.app = await createApp();

    // Serve static assets only (don’t let static serve index)
    this.app.use([
      removeCacheHeaders,
      express.static(path.join(__dirname, '../dist/rpx-exui', 'assets'), { index: false, cacheControl: false })
    ]);
    this.app.use([
      removeCacheHeaders,
      express.static(path.join(__dirname, '../dist/rpx-exui'), { index: false, cacheControl: false })
    ]);

    // Catch-all → send the nonce-injected HTML
    this.app.get('/*', (req, res) => {
      res.set('Cache-Control', 'no-store, s-maxage=0, max-age=0, must-revalidate, proxy-revalidate');
      const html = injectNonce(indexHtmlRaw, res.locals.cspNonce as string);
      res.type('html').send(html);
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
export default applicationServer;
