import { createLogger } from '@hmcts/playwright-common';
import { request, type APIRequestContext } from '@playwright/test';

const logger = createLogger({ serviceName: 'api-session-bootstrap', format: 'pretty' });
const REQUIRED_SESSION_COOKIES = ['Idam.Session', '__auth__'] as const;

export type ApiSessionBootstrapStage =
  'configuration' | 'xui-auth-login' | 'idam-username' | 'idam-password' | 'xui-auth-status' | 'session-cookies';
export type ApiSessionStorageState = Awaited<ReturnType<APIRequestContext['storageState']>>;
export type ApiSessionBootstrapResult =
  | { status: 'authenticated'; storageState: ApiSessionStorageState }
  | { status: 'unavailable'; stage: ApiSessionBootstrapStage; reason: string; statusCode?: number };

type BootstrapResponse = {
  status: () => number;
  url: () => string;
  text: () => Promise<string>;
  headers?: () => Record<string, string>;
};
type BootstrapContext = {
  get: (url: string, options?: Record<string, unknown>) => Promise<BootstrapResponse>;
  post: (url: string, options?: Record<string, unknown>) => Promise<BootstrapResponse>;
  storageState: () => Promise<ApiSessionStorageState>;
  dispose: () => Promise<void>;
};
type BootstrapDeps = {
  requestFactory?: (options: Parameters<typeof request.newContext>[0]) => Promise<BootstrapContext>;
  wait?: (delayMs: number) => Promise<void>;
};
type LoginForm = {
  action: string;
  hiddenFields: Record<string, string>;
  hasEmail: boolean;
  hasUsername: boolean;
  hasPassword: boolean;
};
export type ApiSessionBootstrapOptions = {
  env: NodeJS.ProcessEnv;
  targetUrl: string;
  userIdentifier: string;
  username: string;
  password: string;
  authCheckAttempts?: number;
  authCheckDelayMs?: number;
};

export function isApiSessionBootstrapEnabled(env: NodeJS.ProcessEnv): boolean {
  const mode = (env.PW_SESSION_BOOTSTRAP_MODE ?? 'api-first').trim().toLowerCase();
  return !['browser', 'off', 'false', '0', 'no'].includes(mode);
}

/** Establishes the normal XUI OIDC session through HTTP without rendering IDAM. */
export async function bootstrapApiSession(
  options: ApiSessionBootstrapOptions,
  deps: BootstrapDeps = {}
): Promise<ApiSessionBootstrapResult> {
  const { env, targetUrl, userIdentifier, username, password } = options;
  if (!isApiSessionBootstrapEnabled(env)) {
    return unavailable('configuration', 'API session bootstrap is disabled by PW_SESSION_BOOTSTRAP_MODE');
  }

  const requestFactory = deps.requestFactory ?? ((requestOptions) => request.newContext(requestOptions));
  const wait = deps.wait ?? ((delayMs) => new Promise<void>((resolve) => setTimeout(resolve, delayMs)));
  let context: BootstrapContext | undefined;
  let stage: ApiSessionBootstrapStage = 'xui-auth-login';

  try {
    context = await requestFactory({
      baseURL: stripTrailingSlash(targetUrl),
      ignoreHTTPSErrors: true,
      maxRedirects: 20,
    });

    const loginPage = await context.get('auth/login', { failOnStatusCode: false });
    if (loginPage.status() >= 400) {
      return unavailable(
        stage,
        withGatewayReference(`XUI auth/login responded with ${loginPage.status()}`, loginPage),
        loginPage.status()
      );
    }

    stage = 'idam-username';
    const loginForm = parseLoginForm(await loginPage.text(), loginPage.url());
    if (!loginForm.hasEmail && !loginForm.hasUsername && !loginForm.hasPassword) {
      return unavailable(stage, `IDAM credential form was not found at ${sanitizeEndpoint(loginPage.url())}`);
    }
    const loginResponse = await submitLoginForm(context, loginForm, { username, password });
    if (loginResponse.status() >= 400) {
      return unavailable(stage, `IDAM credential submission responded with ${loginResponse.status()}`, loginResponse.status());
    }

    if ((loginForm.hasEmail || loginForm.hasUsername) && !loginForm.hasPassword) {
      stage = 'idam-password';
      const passwordForm = parseLoginForm(await loginResponse.text(), loginResponse.url());
      if (!passwordForm.hasPassword) {
        return unavailable(stage, `Progressive IDAM password form was not found at ${sanitizeEndpoint(loginResponse.url())}`);
      }
      const passwordResponse = await submitLoginForm(context, passwordForm, { username, password });
      if (passwordResponse.status() >= 400) {
        return unavailable(
          stage,
          `IDAM password submission responded with ${passwordResponse.status()}`,
          passwordResponse.status()
        );
      }
    }

    stage = 'xui-auth-status';
    await context.get('/', { failOnStatusCode: false });
    const authResult = await waitForAuthenticated(context, options, wait);
    if (!authResult.authenticated) {
      return unavailable(
        stage,
        `XUI auth/isAuthenticated responded with ${authResult.status}; body=${authResult.bodyPreview ?? '<empty>'}`,
        authResult.status
      );
    }

    stage = 'session-cookies';
    const storageState = await context.storageState();
    const missingCookies = REQUIRED_SESSION_COOKIES.filter(
      (requiredName) => !storageState.cookies.some((cookie) => cookie.name === requiredName && cookie.value)
    );
    if (missingCookies.length > 0) {
      return unavailable(stage, `Authenticated response did not provide ${missingCookies.join(', ')}`);
    }

    logger.info('HTTP-only session bootstrap authenticated', {
      userIdentifier,
      cookieCount: storageState.cookies.length,
      operation: 'api-session-bootstrap',
    });
    return { status: 'authenticated', storageState };
  } catch (error) {
    return unavailable(stage, formatUnknownError(error));
  } finally {
    await context?.dispose().catch(() => undefined);
  }
}

async function submitLoginForm(
  context: Pick<BootstrapContext, 'post'>,
  form: LoginForm,
  credentials: { username: string; password: string }
): Promise<BootstrapResponse> {
  const formPayload: Record<string, string> = { ...form.hiddenFields };
  if (form.hasEmail) formPayload.email = credentials.username;
  if (form.hasUsername) formPayload.username = credentials.username;
  if (form.hasPassword) formPayload.password = credentials.password;
  formPayload.save = form.hasPassword ? 'Sign in' : 'Continue';
  return context.post(form.action, { form: formPayload, failOnStatusCode: false });
}

function parseLoginForm(html: string, pageUrl: string): LoginForm {
  const formMatch = /<form\b([^>]*)>/i.exec(html);
  const formAttributes = formMatch?.[1] ?? '';
  const actionMatch = /\baction=["']([^"']*)["']/i.exec(formAttributes);
  const action = new URL(decodeHtmlAttribute(actionMatch?.[1] || pageUrl), pageUrl).toString();
  const formEnd = formMatch ? html.indexOf('</form>', formMatch.index) : -1;
  const formHtml = formMatch && formEnd >= 0 ? html.slice(formMatch.index, formEnd) : html;
  const hiddenFields: Record<string, string> = {};
  for (const input of formHtml.match(/<input\b[^>]*type=["']hidden["'][^>]*>/gi) ?? []) {
    const name = /\bname=["']([^"']+)["']/i.exec(input)?.[1];
    const value = /\bvalue=["']([^"']*)["']/i.exec(input)?.[1];
    if (name && value !== undefined) hiddenFields[name] = decodeHtmlAttribute(value);
  }
  return {
    action,
    hiddenFields,
    hasEmail: /<input\b[^>]*(?:name|id)=["'](?:email|emailAddress)["'][^>]*>/i.test(formHtml),
    hasUsername: /<input\b[^>]*(?:name|id)=["']username["'][^>]*>/i.test(formHtml),
    hasPassword: /<input\b[^>]*type=["']password["'][^>]*>/i.test(formHtml),
  };
}

async function waitForAuthenticated(
  context: Pick<BootstrapContext, 'get'>,
  options: Pick<ApiSessionBootstrapOptions, 'env' | 'authCheckAttempts' | 'authCheckDelayMs'>,
  wait: (delayMs: number) => Promise<void>
): Promise<{ authenticated: boolean; status: number; bodyPreview?: string }> {
  const attempts = positiveInteger(options.authCheckAttempts, options.env.API_AUTH_CHECK_ATTEMPTS, 5);
  const delayMs = positiveInteger(options.authCheckDelayMs, options.env.API_AUTH_CHECK_DELAY_MS, 1_000, true);
  let result = { authenticated: false, status: 0, bodyPreview: undefined as string | undefined };
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await context.get('auth/isAuthenticated', { failOnStatusCode: false });
    const body = await response.text().catch(() => '');
    result = {
      authenticated: response.status() === 200 && parseAuthenticated(body),
      status: response.status(),
      bodyPreview: body.replace(/\s+/g, ' ').trim().slice(0, 200) || undefined,
    };
    if (result.authenticated || result.status !== 200 || attempt === attempts) return result;
    await wait(delayMs);
  }
  return result;
}

function parseAuthenticated(body: string): boolean {
  const trimmed = body.trim();
  if (trimmed === 'true') return true;
  try {
    const parsed = JSON.parse(trimmed);
    return parsed === true || (typeof parsed === 'object' && parsed?.isAuthenticated === true);
  } catch {
    return false;
  }
}

function decodeHtmlAttribute(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function withGatewayReference(message: string, response: BootstrapResponse): string {
  const headers = response.headers?.();
  const reference = headers?.['x-azure-ref'] ?? headers?.['x-request-id'] ?? headers?.['x-correlation-id'];
  return reference ? `${message}; gatewayRef=${reference}` : message;
}

function sanitizeEndpoint(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '<unknown endpoint>';
  }
}

function unavailable(stage: ApiSessionBootstrapStage, reason: string, statusCode?: number): ApiSessionBootstrapResult {
  return { status: 'unavailable', stage, reason, ...(statusCode === undefined ? {} : { statusCode }) };
}

function positiveInteger(
  override: number | undefined,
  envValue: string | undefined,
  fallback: number,
  allowZero = false
): number {
  const parsed = override ?? (envValue ? Number.parseInt(envValue, 10) : fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(allowZero ? 0 : 1, parsed);
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function formatUnknownError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/https?:\/\/[^\s)]+/g, (url) => sanitizeEndpoint(url));
}

export const __test__ = { decodeHtmlAttribute, parseAuthenticated, parseLoginForm, waitForAuthenticated };
