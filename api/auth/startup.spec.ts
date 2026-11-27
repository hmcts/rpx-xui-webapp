import type { AuthOptions, oidc } from '@hmcts/rpx-xui-node-lib';
import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { authenticationReadinessMiddleware, isStrategyReady, prepareAuthentication } from './startup';

const realSetImmediate = setImmediate;
const options = {} as AuthOptions;

async function advanceTime(clock: sinon.SinonFakeTimers, milliseconds: number): Promise<void> {
  // Sinon 7 has no tickAsync: let native Promise continuations run between ticks.
  await new Promise<void>((resolve) => realSetImmediate(resolve));
  for (let elapsed = 0; elapsed < milliseconds; elapsed += 1000) {
    clock.tick(1000);
    await new Promise<void>((resolve) => realSetImmediate(resolve));
  }
}

describe('Application authentication recovery', () => {
  let sandbox: sinon.SinonSandbox;
  const issuer = {
    metadata: {
      issuer: 'https://idam.example',
      authorization_endpoint: 'https://idam.example/login',
      token_endpoint: 'https://idam.example/token',
      jwks_uri: 'https://idam.example/jwks',
    },
  } as Awaited<ReturnType<typeof oidc.discover>>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => sandbox.restore());

  it('keeps requests retryable until asynchronous strategy registration finishes', async () => {
    let register: () => void;
    const strategy = {
      initialiseStrategy: sandbox.stub().returns(
        new Promise<void>((resolve) => {
          register = resolve;
        })
      ),
    };
    prepareAuthentication(strategy, { warn: sandbox.spy() });
    const startup = strategy.initialiseStrategy(options);
    expect(isStrategyReady(strategy)).to.equal(false);
    const guard = authenticationReadinessMiddleware(() => isStrategyReady(strategy));
    const response = {
      set: sandbox.stub().returnsThis(),
      status: sandbox.stub().returnsThis(),
      send: sandbox.spy(),
    };
    const next = sandbox.spy();
    guard({} as Request, response as unknown as Response, next);
    expect(response.status.calledWith(503)).to.equal(true);
    expect(response.set.calledWith('Retry-After', '5')).to.equal(true);
    expect(next.called).to.equal(false);

    register();
    await startup;
    expect(isStrategyReady(strategy)).to.equal(true);
    guard({} as Request, response as unknown as Response, next);
    expect(next.calledOnce).to.equal(true);
  });

  it('recovers after more than five failures without rejecting or requiring a restart', async () => {
    const clock = sandbox.useFakeTimers();
    const initialize = sandbox.stub().rejects(new Error('IDAM unavailable'));
    initialize.onCall(6).resolves();
    const strategy = { initialiseStrategy: initialize };
    const warn = sandbox.spy();
    prepareAuthentication(strategy, { warn });
    const startup = strategy.initialiseStrategy(options);

    await advanceTime(clock, 31000);
    expect(initialize.callCount).to.equal(6);
    expect(isStrategyReady(strategy)).to.equal(false);
    await advanceTime(clock, 30000);
    await startup;
    expect(initialize.callCount).to.equal(7);
    expect(warn.callCount).to.equal(6);
    expect(isStrategyReady(strategy)).to.equal(true);
    expect(clock.countTimers()).to.equal(0);
  });

  it('retries incomplete discovery metadata before allowing registration', async () => {
    const clock = sandbox.useFakeTimers();
    const discover = sandbox.stub();
    discover.onFirstCall().resolves({ metadata: {} });
    discover.onSecondCall().resolves(issuer);
    const registered = sandbox.spy();
    const strategy = {
      discover,
      initialiseStrategy: async (_options: AuthOptions) => {
        registered(await strategy.discover());
      },
    };
    prepareAuthentication(strategy, { warn: sandbox.spy() });
    const startup = strategy.initialiseStrategy(options);
    await advanceTime(clock, 0);
    expect(isStrategyReady(strategy)).to.equal(false);
    expect(registered.called).to.equal(false);
    await advanceTime(clock, 1000);
    await startup;
    expect(registered.calledOnceWith(issuer)).to.equal(true);
    expect(isStrategyReady(strategy)).to.equal(true);
  });

  it('times out stalled discovery, recovers, and ignores a late response', async () => {
    const clock = sandbox.useFakeTimers();
    let finishDiscovery: (value: unknown) => void;
    const discover = sandbox.stub();
    discover.onFirstCall().returns(
      new Promise((resolve) => {
        finishDiscovery = resolve;
      })
    );
    discover.onSecondCall().resolves(issuer);
    const registered = sandbox.spy();
    const strategy = {
      discover,
      initialiseStrategy: async (_options: AuthOptions) => {
        registered(await strategy.discover());
      },
    };
    const warn = sandbox.spy();
    prepareAuthentication(strategy, { warn });
    const startup = strategy.initialiseStrategy(options);
    await advanceTime(clock, 10000);
    expect(warn.calledOnce).to.equal(true);
    expect(isStrategyReady(strategy)).to.equal(false);
    await advanceTime(clock, 1000);
    await startup;
    expect(isStrategyReady(strategy)).to.equal(true);
    finishDiscovery(issuer);
    await advanceTime(clock, 0);
    expect(registered.calledOnce).to.equal(true);
    expect(clock.countTimers()).to.equal(0);
  });

  it('installs recovery once when middleware setup is requested repeatedly', async () => {
    const initialize = sandbox.stub().resolves();
    const strategy = { initialiseStrategy: initialize };
    const logger = { warn: sandbox.spy() };
    prepareAuthentication(strategy, logger);
    const wrapped = strategy.initialiseStrategy;
    prepareAuthentication(strategy, logger);
    expect(strategy.initialiseStrategy).to.equal(wrapped);
    await strategy.initialiseStrategy(options);
    expect(initialize.calledOnce).to.equal(true);
  });
});
