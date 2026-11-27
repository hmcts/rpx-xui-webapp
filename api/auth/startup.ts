import type { AuthOptions, oidc } from '@hmcts/rpx-xui-node-lib';
import type { RequestHandler } from 'express';

type AuthenticationStrategy = Pick<typeof oidc, 'initialiseStrategy'> & Partial<Pick<typeof oidc, 'discover'>>;
type StartupLogger = { warn: (...messages: unknown[]) => void };

interface AuthenticationState {
  isReady: () => boolean;
}

const states = new WeakMap<AuthenticationStrategy, AuthenticationState>();

export const isStrategyReady = (strategy: AuthenticationStrategy): boolean => states.get(strategy)?.isReady() ?? false;

export const authenticationReadinessMiddleware =
  (isReady: () => boolean): RequestHandler =>
  (req, res, next) => {
    // The anonymous CCD diagnostic must remain available while IDAM initializes.
    if (/^\/api\/healthCheck\/?$/i.test(req.path)) {
      next();
      return;
    }
    if (!isReady()) {
      res.set('Retry-After', '5');
      res.set('Cache-Control', 'no-store');
      res.status(503).send('Authentication is temporarily unavailable. Please try again shortly.');
      return;
    }
    next();
  };

// Node-lib starts this public hook without awaiting it. Keep recovery inside its promise
// so discovery failures cannot escape as unhandled rejections or leave auth broken forever.
export function prepareAuthentication(strategy: AuthenticationStrategy, logger: StartupLogger): void {
  if (states.has(strategy)) {
    return;
  }

  let ready = false;
  states.set(strategy, { isReady: () => ready });
  const initialise = strategy.initialiseStrategy.bind(strategy);

  if (strategy.discover) {
    const discover = strategy.discover.bind(strategy);
    strategy.discover = async () => {
      let timer: ReturnType<typeof setTimeout>;
      try {
        // Wrap discovery rather than strategy registration: late responses cannot
        // register a strategy after this attempt has timed out.
        const issuer = await Promise.race([
          discover(),
          new Promise<never>((_resolve, reject) => {
            timer = setTimeout(() => reject(new Error('OIDC discovery timed out')), 10000);
          }),
        ]);
        const metadata = issuer?.metadata;
        const required = ['issuer', 'authorization_endpoint', 'token_endpoint', 'jwks_uri'];
        if (!metadata || required.some((key) => typeof metadata[key] !== 'string' || !metadata[key].trim())) {
          throw new Error('OIDC discovery returned incomplete metadata');
        }
        return issuer;
      } finally {
        clearTimeout(timer);
      }
    };
  }

  strategy.initialiseStrategy = async (options: AuthOptions) => {
    ready = false;
    let attempt = 0;
    while (!ready) {
      try {
        await initialise(options);
        ready = true;
      } catch (error) {
        const delayMs = Math.min(1000 * 2 ** Math.min(attempt++, 5), 30000);
        logger.warn(
          `Authentication initialization failed; retrying in ${delayMs}ms`,
          error instanceof Error ? error.message : 'Unknown initialization error'
        );
        await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
      }
    }
  };
}
