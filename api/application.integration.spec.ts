import * as http from 'node:http';
import { readFileSync } from 'node:fs';
import { AddressInfo } from 'node:net';
import * as path from 'node:path';
import { csp, SECURITY_POLICY } from '@hmcts/rpx-xui-node-lib';
import { expect } from 'chai';
import * as express from 'express';
import helmet from 'helmet';
import { MC_CSP } from './interfaces/csp-config';
import { registerFrontendRoutes } from './application';

interface TestResponse {
  body: string;
  headers: http.IncomingHttpHeaders;
  statusCode: number;
}

const browserBuildRoot = path.join(__dirname, 'test', 'browser-build');
const builtEntryHtml = readFileSync(path.join(browserBuildRoot, 'index.html'), 'utf8');

// These are different URL spellings that `send` decodes and normalizes to the
// same root index.html file. Testing the categories (encoded dot/character,
// encoded or repeated slash, and literal/encoded parent segment) protects the
// normalization behavior rather than one specific spelling from a bug report.
const entryAliases = [
  '/index.html',
  '/index%2Ehtml',
  '/%69ndex.html',
  '//index.html',
  '/%2Findex.html',
  '/nested/../index.html',
  '/nested/%2E%2E/index.html',
];

function request(server: http.Server, requestPath: string): Promise<TestResponse> {
  const port = (server.address() as AddressInfo).port;

  return new Promise((resolve, reject) => {
    http
      .get({ host: '127.0.0.1', port, path: requestPath }, (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        response.on('end', () =>
          resolve({
            body: Buffer.concat(chunks).toString('utf8'),
            headers: response.headers,
            statusCode: response.statusCode || 0,
          })
        );
        response.on('error', reject);
      })
      .on('error', reject);
  });
}

function getScriptTags(html: string): string[] {
  return html.match(/<script\b[^>]*>/gi) || [];
}

describe('built entry page integration', () => {
  for (const helmetEnabled of [true, false]) {
    describe(`with Helmet ${helmetEnabled ? 'enabled' : 'disabled'}`, () => {
      let server: http.Server;

      before(async () => {
        const app = express();
        if (helmetEnabled) {
          // Match the production ordering: Helmet installs the general
          // security headers, then the application CSP middleware creates a
          // request-specific nonce and writes it to both res.locals and CSP.
          app.use(helmet());
          app.use(csp({ defaultCsp: SECURITY_POLICY, ...MC_CSP }) as unknown as express.RequestHandler);
        }
        registerFrontendRoutes(app, browserBuildRoot, builtEntryHtml);
        server = http.createServer(app);
        await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
      });

      after(async () => {
        if (server?.listening) {
          await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
        }
      });

      for (const entryAlias of entryAliases) {
        it(`renders ${entryAlias} through the nonce-aware entry handler`, async () => {
          const response = await request(server, entryAlias);

          expect(response.statusCode).to.equal(200);
          expect(response.headers['content-type']).to.match(/^text\/html/);
          expect(response.headers['cache-control']).to.equal('no-store, max-age=0');
          expect(response.body).not.to.include('{{cspNonce}}');
          expect(response.body).not.to.include('{{dynatraceCdn}}');

          const scriptTags = getScriptTags(response.body);
          expect(scriptTags).to.have.length(3);

          if (helmetEnabled) {
            // Both inline template scripts and external scripts introduced by
            // the Angular build must use the exact nonce advertised by CSP.
            const cspHeader = response.headers['content-security-policy'];
            expect(cspHeader).to.be.a('string');
            const nonce = /'nonce-([^']+)'/.exec(cspHeader as string)?.[1];
            expect(nonce).to.be.a('string').and.not.empty;
            for (const scriptTag of scriptTags) {
              expect(scriptTag).to.include(`nonce="${nonce}"`);
            }
            const nonceMetaValue = /<meta\s+name="csp-nonce"\s+content="([^"]*)"\s*\/?>/i.exec(response.body)?.[1];
            expect(nonceMetaValue).to.equal(nonce);
          } else {
            // Without Helmet there is no CSP nonce to propagate. The renderer
            // must still remove the markers rather than emit "undefined";
            // external build scripts should remain otherwise unchanged.
            expect(response.headers).not.to.have.property('content-security-policy');
            expect(scriptTags[0]).to.include('nonce=""');
            expect(scriptTags.slice(1)).to.satisfy((tags: string[]) => tags.every((tag) => !tag.includes('nonce=')));
          }
        });
      }

      it('continues to serve ordinary static assets', async () => {
        const response = await request(server, '/main-TEST.js');

        // This guards against an over-broad entry-page matcher accidentally
        // turning valid bundle and asset requests into SPA HTML responses.
        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.match(/^(text|application)\/javascript/);
        expect(response.body).to.equal('window.mainBundleLoaded = true;\n');
        expect(response.body).not.to.include('<!doctype html>');
      });
    });
  }
});
