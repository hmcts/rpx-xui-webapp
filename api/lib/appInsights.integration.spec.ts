import * as http from 'http';
import { execFileSync } from 'child_process';
import { AddressInfo } from 'net';
import { trace, SpanKind, SpanStatusCode } from '@opentelemetry/api';
import { InMemorySpanExporter, NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { TelemetryClient } from 'applicationinsights';
import { expect } from 'chai';
import * as express from 'express';
import * as sinon from 'sinon';
import * as telemetry from './appInsights';

describe('App Insights in-memory span integration', () => {
  it('creates sampled request spans after real SDK initialization', function () {
    this.timeout(15000);
    const output = execFileSync(
      process.execPath,
      [
        '-e',
        `
      const ai = require('applicationinsights');
      const spans = [];
      const diagnostics = [];
      const { diag, DiagLogLevel } = require('@opentelemetry/api');
      diag.setLogger({ error: (...args) => diagnostics.push(args.join(' ')), warn() {}, info() {}, debug() {}, verbose() {} }, DiagLogLevel.ERROR);
      ai.setup('InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://example.invalid/')
        .setAzureMonitorOptions({ tracesPerSecond: 0, spanProcessors: [{
          onStart() {},
          onEnd: span => spans.push({ name: span.name, sampled: Boolean(span.spanContext().traceFlags & 1) }),
          forceFlush: async () => {}, shutdown: async () => {}
        }] })
        .setAutoCollectRequests(false)
        .setAutoCollectDependencies(true)
        .start();
      ai.defaultClient.trackRequest({ name: 'SDK initialized request', duration: 1, resultCode: '200', success: true });
      console.log(JSON.stringify({ spans, diagnostics }));
      process.exit(0);
    `,
      ],
      { encoding: 'utf8', timeout: 10000 }
    );
    const result = JSON.parse(output.trim().split('\n').pop()!);
    expect(result.diagnostics).to.deep.equal([]);
    expect(result.spans).to.deep.include({ name: 'SDK initialized request', sampled: true });
  });

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
