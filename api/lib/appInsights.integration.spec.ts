import * as http from 'http';
import { AddressInfo } from 'net';
import { EventEmitter } from 'events';
import { context, propagation, ROOT_CONTEXT, trace, SpanKind, SpanStatusCode, TraceFlags } from '@opentelemetry/api';
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

  it('exports incoming callbacks without HTTP instrumentation and excludes health/static requests', async () => {
    const app = express();
    app.use(telemetry.appInsights);
    app.get('/oauth2/callback', (_request, response) => response.status(403).end());
    app.get('/health', (_request, response) => response.end('ok'));
    app.get('/assets/app.js', (_request, response) => response.end(''));
    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = (server.address() as AddressInfo).port;

    for (const path of [
      '/oauth2/callback?code=secret-auth-code&state=secret-state',
      '/health',
      '/assets/app.js?v=secret-cache',
    ]) {
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
    expect(spans[0].name).to.equal('GET /oauth2/callback');
    expect(spans[0].kind).to.equal(SpanKind.SERVER);
    expect(spans[0].status.code).to.equal(SpanStatusCode.ERROR);
    expect(spans[0].attributes['http.status_code']).to.equal(403);
    expect(spans[0].attributes['http.url']).to.equal(`http://127.0.0.1:${port}/oauth2/callback`);
    expect(JSON.stringify(spans[0].attributes)).not.to.include('secret-auth-code');
    expect(JSON.stringify(spans[0].attributes)).not.to.include('secret-state');
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

  it('exports incoming request URLs without OAuth callback query values', async () => {
    const sensitiveUrl = '/oauth2/callback?code=secret-auth-code&state=secret-state';
    const span = provider.getTracer('request-integration').startSpan('GET /oauth2/callback', { kind: SpanKind.SERVER });
    span.setAttributes({
      'url.full': `https://manage-case.example.test${sensitiveUrl}`,
      'url.query': 'code=secret-auth-code&state=secret-state',
      'http.url': `https://manage-case.example.test${sensitiveUrl}`,
      'http.target': sensitiveUrl,
    });

    telemetry.sanitizeIncomingServerSpanUrl(
      span,
      { url: sensitiveUrl, headers: { host: 'manage-case.example.test' }, socket: { encrypted: true } },
      Object.create(http.ServerResponse.prototype)
    );
    span.end();
    await provider.forceFlush();

    const attributes = exporter.getFinishedSpans()[0].attributes;
    expect(attributes['url.full']).to.equal('https://manage-case.example.test/oauth2/callback');
    expect(attributes['http.url']).to.equal('https://manage-case.example.test/oauth2/callback');
    expect(attributes['http.target']).to.equal('/oauth2/callback');
    expect(attributes['url.path']).to.equal('/oauth2/callback');
    expect(attributes['url.query']).to.equal('');
    expect(attributes['http.request.query']).to.equal('');
    expect(Object.values(attributes).join(' ')).not.to.include('secret-auth-code');
    expect(Object.values(attributes).join(' ')).not.to.include('secret-state');
  });

  it('keeps the incoming parent and makes a fallback server span available to route processing', async () => {
    const traceId = 'a'.repeat(32);
    const parentSpanId = 'b'.repeat(16);
    sandbox.stub(trace, 'getActiveSpan').returns(undefined);
    sandbox.stub(propagation, 'extract').returns(
      trace.setSpanContext(ROOT_CONTEXT, {
        traceId,
        spanId: parentSpanId,
        traceFlags: TraceFlags.SAMPLED,
        isRemote: true,
      })
    );
    const withContext = sandbox.spy(context, 'with');
    const response = Object.assign(new EventEmitter(), {
      setHeader: () => undefined,
      statusCode: 200,
      writableFinished: true,
    });
    const request = {
      method: 'GET',
      path: '/api/example',
      url: '/api/example?secret=redacted',
      headers: { host: 'example.test' },
    };
    telemetry.appInsights(request as any, response as any, () => {
      const routeContext = withContext.lastCall.args[0];
      const requestSpan = trace.getSpan(routeContext);
      expect(requestSpan).not.to.equal(undefined);
      expect(requestSpan.spanContext().traceId).to.equal(traceId);
      const dependency = provider.getTracer('route').startSpan('downstream', { kind: SpanKind.CLIENT }, routeContext);
      dependency.end();
    });
    response.emit('finish');
    response.emit('close');
    await provider.forceFlush();
    const spans = exporter.getFinishedSpans();
    const serverSpan = spans.find((span) => span.kind === SpanKind.SERVER);
    const dependency = spans.find((span) => span.kind === SpanKind.CLIENT);
    expect(spans).to.have.length(2);
    expect(serverSpan.parentSpanContext.spanId).to.equal(parentSpanId);
    expect(dependency.parentSpanContext.spanId).to.equal(serverSpan.spanContext().spanId);
    expect(serverSpan.attributes['http.url']).to.equal('http://example.test/api/example');
  });

  it('enriches an instrumented request without creating or ending another server span', async () => {
    const serverSpan = provider.getTracer('http').startSpan('GET /api/example', { kind: SpanKind.SERVER });
    sandbox.stub(trace, 'getActiveSpan').returns(serverSpan);
    const end = sandbox.spy(serverSpan, 'end');
    const response = new EventEmitter();
    const next = sandbox.spy();
    telemetry.appInsights({ headers: {} } as any, response as any, next);
    response.emit('finish');
    expect(next.calledOnce).to.equal(true);
    expect(end.called).to.equal(false);
    serverSpan.end();
    await provider.forceFlush();
    expect(exporter.getFinishedSpans()).to.have.length(1);
  });
});
