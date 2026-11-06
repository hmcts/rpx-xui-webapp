import * as http from 'http';
import { AddressInfo } from 'net';
import { trace, SpanKind, SpanStatusCode } from '@opentelemetry/api';
import { InMemorySpanExporter, NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { TelemetryClient } from 'applicationinsights';
import { expect } from 'chai';
import * as express from 'express';
import * as sinon from 'sinon';
import * as telemetry from './appInsights';

describe('App Insights in-memory span integration', () => {
  let sandbox: sinon.SinonSandbox;
  let exporter: InMemorySpanExporter;
  let provider: NodeTracerProvider;
  let client: TelemetryClient;
  let server: http.Server;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
    sandbox.stub(trace, 'getTracer').returns(provider.getTracer('request-integration'));
    client = new TelemetryClient('InstrumentationKey=00000000-0000-0000-0000-000000000000');
    sandbox.stub(client, 'initialize').returns(undefined);
    sandbox.stub(telemetry, 'client').value(client);
  });

  afterEach(async () => {
    if (server?.listening) {
      await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
    sandbox.restore();
    await provider.shutdown();
  });

  it('exports a completed span from the real SDK trackRequest method', async () => {
    client.trackRequest({ name: 'Service GET call', duration: 25, resultCode: '200', success: true });
    await provider.forceFlush();

    const spans = exporter.getFinishedSpans();
    expect(spans).to.have.length(1);
    expect(spans[0].name).to.equal('Service GET call');
    expect(spans[0].kind).to.equal(SpanKind.SERVER);
    expect(spans[0].status.code).to.equal(SpanStatusCode.OK);
    expect(spans[0].attributes['http.status_code']).to.equal('200');
  });

  it('exports one incoming response span and excludes health requests', async () => {
    const app = express();
    app.use(telemetry.appInsights);
    app.get('/cases/:caseId', (_request, response) => response.status(403).end());
    app.get('/health', (_request, response) => response.end('ok'));
    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = (server.address() as AddressInfo).port;

    for (const path of ['/cases/123?token=not-for-telemetry', '/health']) {
      await new Promise<void>((resolve, reject) => {
        http
          .get({ host: '127.0.0.1', port, path }, (response) => {
            response.resume();
            response.on('end', resolve);
            response.on('error', reject);
          })
          .on('error', reject);
      });
    }
    await provider.forceFlush();

    const spans = exporter.getFinishedSpans();
    expect(spans).to.have.length(1);
    expect(spans[0].name).to.equal('GET /cases/:caseId');
    expect(spans[0].kind).to.equal(SpanKind.SERVER);
    expect(spans[0].status.code).to.equal(SpanStatusCode.ERROR);
    expect(spans[0].attributes['http.status_code']).to.equal('403');
    expect(spans[0].attributes['http.url']).to.equal(`http://127.0.0.1:${port}/cases/123`);
  });
});
