import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, relative } from 'node:path';
import { promisify } from 'node:util';

import { test, expect } from '@playwright/test';

import { expectStatus, withRetry, __test__ as apiTestUtilsTest } from './utils/apiTestUtils';
import { resolveRoleAccessCaseId } from './data/testIds';
import { __test__ as fixturesTest } from './fixtures';
import {
  sanitizeUrl,
  collectDependencySignals,
  classifyFailure,
  classifyFailureCategory,
} from '../common/failureClassification';
import { buildTaskSearchRequest, seedTaskId } from './utils/work-allocation';
import { seedRoleAccessCaseId } from './utils/role-access';

const execFileAsync = promisify(execFile);
const requireFromHere = createRequire(import.meta.url);
const PLAYWRIGHT_CLI_PATH = requireFromHere.resolve('@playwright/test/cli');
const PLAYWRIGHT_JSON_MAX_BUFFER = 20 * 1024 * 1024;

type JsonAnnotation = {
  type: string;
  description?: string;
};

type JsonAttachment = {
  name: string;
  body?: string;
};

type JsonResult = {
  annotations?: JsonAnnotation[];
  attachments?: JsonAttachment[];
};

type JsonTest = {
  annotations?: JsonAnnotation[];
  results?: JsonResult[];
};

type JsonSpec = {
  title: string;
  tests?: JsonTest[];
};

type JsonSuite = {
  specs?: JsonSpec[];
  suites?: JsonSuite[];
};

type JsonReport = {
  suites?: JsonSuite[];
};

type ExecFileFailure = Error & {
  stdout?: string | Buffer;
  stderr?: string | Buffer;
  code?: number;
  signal?: NodeJS.Signals | null;
};

function collectSpecs(suites: JsonSuite[] | undefined): JsonSpec[] {
  if (!suites || suites.length === 0) {
    return [];
  }
  return suites.flatMap((suite) => {
    const current = suite.specs ?? [];
    return [...current, ...collectSpecs(suite.suites)];
  });
}

function decodeAttachmentBody(attachment?: JsonAttachment): string {
  if (!attachment?.body) {
    return '';
  }
  return Buffer.from(attachment.body, 'base64').toString('utf8');
}

function tryParseJsonReport(output: string): JsonReport | undefined {
  const trimmed = output.trim();
  if (!trimmed) {
    return undefined;
  }
  try {
    return JSON.parse(trimmed) as JsonReport;
  } catch {
    // Some CI wrappers may prefix/suffix lines around JSON reporter output.
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace < 0 || lastBrace <= firstBrace) {
    return undefined;
  }

  try {
    return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1)) as JsonReport;
  } catch {
    return undefined;
  }
}

async function runPlaywrightJsonReport(repoRoot: string, testFile: string): Promise<JsonReport> {
  const args = [PLAYWRIGHT_CLI_PATH, 'test', '--config=playwright.config.ts', '--project=node-api', testFile, '--reporter=json'];

  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, args, {
      cwd: repoRoot,
      env: process.env,
      maxBuffer: PLAYWRIGHT_JSON_MAX_BUFFER,
    });
    const parsed = tryParseJsonReport(stdout) ?? tryParseJsonReport(stderr);
    if (parsed) {
      return parsed;
    }
    throw new Error(
      [
        'Nested Playwright run completed but JSON reporter output could not be parsed.',
        `stdout:\n${stdout || '<empty>'}`,
        `stderr:\n${stderr || '<empty>'}`,
      ].join('\n\n')
    );
  } catch (error) {
    const failure = error as ExecFileFailure;
    const stdout = typeof failure.stdout === 'string' ? failure.stdout : (failure.stdout?.toString('utf8') ?? '');
    const stderr = typeof failure.stderr === 'string' ? failure.stderr : (failure.stderr?.toString('utf8') ?? '');
    const parsed = tryParseJsonReport(stdout) ?? tryParseJsonReport(stderr);
    if (parsed) {
      return parsed;
    }

    const details = [
      `exitCode=${failure.code ?? 'unknown'}`,
      `signal=${failure.signal ?? 'none'}`,
      `message=${failure.message}`,
      `stdout:\n${stdout || '<empty>'}`,
      `stderr:\n${stderr || '<empty>'}`,
    ].join('\n\n');
    throw new Error(`Nested Playwright run failed before producing JSON report.\n\n${details}`);
  }
}

test.describe('Helper utilities and retry logic', () => {
  test('expectStatus and withRetry cover success and retry paths', async () => {
    expectStatus(200, [200, 201]);
    expect(() => expectStatus(500, [200])).toThrow();

    let attempts = 0;
    const res = await withRetry(
      async () => {
        attempts += 1;
        return { status: attempts === 1 ? 502 : 200 };
      },
      { retries: 1, retryStatuses: [502] }
    );
    expect(res.status).toBe(200);
    expect(attempts).toBe(2);

    let errors = 0;
    await expect(
      withRetry(
        async () => {
          errors += 1;
          throw new Error('boom');
        },
        { retries: 1 }
      )
    ).rejects.toThrow('boom');
    expect(errors).toBe(2);

    const defaultRes = await withRetry(async () => ({ status: 200 }));
    expect(defaultRes.status).toBe(200);

    await expect(withRetry(async () => ({ status: 200 }), { retries: -1 })).rejects.toThrow('withRetry failed unexpectedly');
  });

  test('buildXsrfHeadersWith covers token present and missing', async () => {
    const tokenHeaders = await apiTestUtilsTest.buildXsrfHeadersWith('solicitor', {
      ensureStorageState: async () => 'state',
      getStoredCookie: async () => 'token',
    });
    expect(tokenHeaders).toEqual({ 'X-XSRF-TOKEN': 'token' });

    const emptyHeaders = await apiTestUtilsTest.buildXsrfHeadersWith('solicitor', {
      ensureStorageState: async () => 'state',
      getStoredCookie: async () => undefined,
    });
    expect(emptyHeaders).toEqual({});
  });

  test('buildTaskSearchRequest covers empty and full option sets', () => {
    const minimal = buildTaskSearchRequest('AllWork');
    expect(minimal.searchRequest.search_parameters).toEqual([]);

    const full = buildTaskSearchRequest('MyTasks', {
      userIds: ['user-1'],
      locations: ['loc-1'],
      jurisdictions: ['J1'],
      taskTypes: ['type-1'],
      states: ['assigned'],
      pageNumber: 2,
      pageSize: 10,
      searchBy: 'caseworker',
    });
    expect(full.searchRequest.search_parameters).toHaveLength(5);
    expect(full.searchRequest.search_parameters.map((entry) => entry.key)).toEqual([
      'user',
      'location',
      'jurisdiction',
      'taskType',
      'state',
    ]);
  });

  test('seedTaskId covers assigned, unassigned, and missing tasks', async () => {
    let calls = 0;
    const apiClient = {
      post: async () => {
        calls += 1;
        if (calls === 1) {
          return { status: 200, data: { tasks: [{ id: 'assigned-task' }] } };
        }
        return { status: 200, data: { tasks: [{ id: 'unassigned-task' }] } };
      },
    };
    const assigned = await seedTaskId(apiClient, 'loc-1');
    expect(assigned).toEqual({ id: 'assigned-task', type: 'assigned' });

    const apiClientFallback = {
      post: async () => ({ status: 200, data: { tasks: [] } }),
    };
    const missing = await seedTaskId(apiClientFallback);
    expect(missing).toBeUndefined();

    let fallbackCalls = 0;
    const apiClientSecond = {
      post: async () => {
        fallbackCalls += 1;
        return fallbackCalls === 1
          ? { status: 200, data: { tasks: [] } }
          : { status: 200, data: { tasks: [{ id: 'unassigned-task' }] } };
      },
    };
    const unassigned = await seedTaskId(apiClientSecond);
    expect(unassigned).toEqual({ id: 'unassigned-task', type: 'unassigned' });

    const apiClientError = {
      post: async () => ({ status: 500, data: { tasks: [{ id: 'task-3' }] } }),
    };
    const errorResult = await seedTaskId(apiClientError);
    expect(errorResult).toBeUndefined();

    const apiClientNoId = {
      post: async () => ({ status: 200, data: { tasks: [{}] } }),
    };
    const noId = await seedTaskId(apiClientNoId);
    expect(noId).toBeUndefined();
  });

  test('seedRoleAccessCaseId covers success and failure paths', async () => {
    const headers = { 'X-XSRF-TOKEN': 'token' };
    const withXsrfFn = async <T>(_role: string, fn: (h: Record<string, string>) => Promise<T>) => fn(headers);

    const apiClient = {
      get: async () => ({
        data: { cases: [{ caseId: 'case-1' }, { case_id: 'case-2' }] },
      }),
    };

    const resolved = await seedRoleAccessCaseId(apiClient, { withXsrfFn });
    expect(resolved).toBe('case-1');

    const apiClientCaseId = {
      get: async () => ({
        data: { cases: [{ case_id: 'case-2' }] },
      }),
    };
    const resolvedCaseId = await seedRoleAccessCaseId(apiClientCaseId, { withXsrfFn });
    expect(resolvedCaseId).toBe('case-2');

    const apiClientEmpty = {
      get: async () => ({
        data: { cases: [{}] },
      }),
    };
    const resolvedEmpty = await seedRoleAccessCaseId(apiClientEmpty, { withXsrfFn });
    expect(resolvedEmpty).toBeUndefined();

    const failing = await seedRoleAccessCaseId(apiClient, {
      withXsrfFn: async () => {
        throw new Error('boom');
      },
    });
    expect(failing).toBeUndefined();
  });

  test('fixture helpers cover default headers and request recovery', async () => {
    const headers = await fixturesTest.buildDefaultHeaders('solicitor', {
      shouldAutoInjectXsrf: () => true,
      getStoredCookie: async () => 'token',
    });
    expect(headers['X-XSRF-TOKEN']).toBe('token');

    const noXsrf = await fixturesTest.buildDefaultHeaders('solicitor', {
      shouldAutoInjectXsrf: () => false,
      getStoredCookie: async () => 'token',
    });
    expect(noXsrf['X-XSRF-TOKEN']).toBeUndefined();

    const anonymous = await fixturesTest.buildDefaultHeaders('anonymous', {
      shouldAutoInjectXsrf: () => true,
      getStoredCookie: async () => 'token',
    });
    expect(anonymous['X-XSRF-TOKEN']).toBeUndefined();

    let calls = 0;
    const fakeContext = {};
    const requestFactory = async () => {
      calls += 1;
      if (calls === 1) {
        throw new Error('Unexpected end of JSON input');
      }
      return fakeContext;
    };
    const recovered = await fixturesTest.buildRequestContext(
      'solicitor',
      'state-1',
      {},
      {
        requestFactory,
        ensureStorageState: async () => 'state-2',
        unlink: async () => {},
      }
    );
    expect(recovered).toBe(fakeContext);

    let unlinkCalls = 0;
    let unlinkFactoryCalls = 0;
    const unlinkFactory = async () => {
      unlinkFactoryCalls += 1;
      if (unlinkFactoryCalls === 1) {
        throw new Error('Unexpected end of JSON input');
      }
      return fakeContext;
    };
    const recoveredAfterUnlink = await fixturesTest.buildRequestContext(
      'solicitor',
      'state-1',
      {},
      {
        requestFactory: unlinkFactory,
        ensureStorageState: async () => 'state-2',
        unlink: async () => {
          unlinkCalls += 1;
          throw new Error('unlink failed');
        },
      }
    );
    expect(recoveredAfterUnlink).toBe(fakeContext);
    expect(unlinkCalls).toBe(1);

    const failingFactory = async () => {
      throw new Error('boom');
    };
    await expect(
      fixturesTest.buildRequestContext('solicitor', 'state-1', {}, { requestFactory: failingFactory })
    ).rejects.toThrow('boom');
  });

  test('resolveRoleAccessCaseId returns env or default', () => {
    expect(resolveRoleAccessCaseId('case-1')).toBe('case-1');
    expect(resolveRoleAccessCaseId()).toBe('1234567890123456');
  });
});

test.describe('E2E failure classification utilities', () => {
  test('prioritises downstream API signals over timeout/network signatures', () => {
    const failureType = classifyFailure(
      'request timeout while service returned 503',
      [{ url: '/api/downstream', status: 503, method: 'GET' }],
      [{ url: '/api/downstream', status: 404, method: 'GET' }],
      [],
      [{ url: '/api/downstream', method: 'GET', errorText: 'net::ERR_ABORTED' }],
      true
    );

    expect(failureType).toBe('DOWNSTREAM_API_5XX');
  });

  test('does not classify transport-abort failures as UNKNOWN when dependency signals exist', () => {
    const failureType = classifyFailure(
      'net::ERR_ABORTED while fetching backend dependency',
      [],
      [],
      [],
      [{ url: '/api/dependency', method: 'POST', errorText: 'net::ERR_ABORTED' }],
      true
    );

    expect(failureType).toBe('NETWORK_TIMEOUT');
    expect(failureType).not.toBe('UNKNOWN');
  });

  test('produces dependency category and clear signal details for network/downstream failures', () => {
    const signals = collectDependencySignals(
      'net::ERR_ABORTED from dependency call',
      [{ url: '/api/5xx', status: 503, method: 'GET' }],
      [],
      [],
      [{ url: '/api/dependency?token=abc', method: 'GET', errorText: 'net::ERR_ABORTED' }],
      true
    );

    expect(signals.join(' | ')).toContain('Downstream API 5xx responses=1');
    expect(signals.join(' | ')).toContain('Failed backend requests=1');
    expect(signals.join(' | ')).toContain('Network failure signal detected');
    expect(signals.join(' | ')).toContain('Network/dependency signature detected in test error');

    const dependencyCategory = classifyFailureCategory('UNKNOWN', signals);
    expect(dependencyCategory).toBe('DEPENDENCY_ENVIRONMENT_FAILURE');

    const nonDependencyCategory = classifyFailureCategory('ASSERTION_FAILURE', []);
    expect(nonDependencyCategory).toBe('NON_DEPENDENCY_FAILURE');
  });

  test('sanitises URLs in diagnostics helper', () => {
    expect(sanitizeUrl('https://example.test/api/resource?token=secret&foo=bar')).toBe(
      'https://example.test/api/resource'
    );
  });
});

test.describe('Failure classification regressions', () => {
  test.describe.configure({ mode: 'serial' });

  test('classifies downstream 4xx/5xx over timeout or transport signals and keeps diagnostics explicit', async () => {
    const repoRoot = process.cwd();
    const tempRootParent = join(repoRoot, 'playwright_tests_new', 'api');
    await mkdir(tempRootParent, { recursive: true });
    const tempRoot = await mkdtemp(join(tempRootParent, 'fixture-classification-'));
    const tempDir = tempRoot;

    const tempFile = join(tempDir, `fixture-classification-${Date.now()}.api.ts`);
    const tempContent = `
import { test, expect } from '../fixtures';

test.describe.configure({ mode: 'serial' });

test('regression::downstream 5xx dominates timeout message', async ({ apiLogs }) => {
  test.fail();
  apiLogs.push({
    method: 'GET',
    url: 'https://example.test/api/downstream-5xx?token=secret',
    status: 503,
    durationMs: 320,
  } as any);
  throw new Error('request timeout while downstream returned 503');
});

test('regression::downstream 4xx dominates transport abort', async ({ apiLogs }) => {
  test.fail();
  apiLogs.push({
    method: 'POST',
    url: 'https://example.test/api/downstream-4xx?code=123',
    status: 404,
    durationMs: 180,
  } as any);
  throw new Error('net::ERR_ABORTED while calling backend');
});

test('regression::transport abort with 5xx signal is not UNKNOWN', async ({ apiLogs }) => {
  test.fail();
  apiLogs.push({
    method: 'PATCH',
    url: 'https://example.test/api/dependency-error?secret=true',
    status: 502,
    durationMs: 210,
  } as any);
  throw new Error('net::ERR_ABORTED upstream connection aborted');
});
`.trimStart();

    await writeFile(tempFile, tempContent, 'utf8');
    const relativeTempFile = relative(repoRoot, tempFile);

    try {
      const report = await runPlaywrightJsonReport(repoRoot, relativeTempFile);
      const specs = collectSpecs(report.suites);

      const expectedCases = [
        {
          title: 'regression::downstream 5xx dominates timeout message',
          expectedFailureType: 'DOWNSTREAM_API_5XX',
          expectedStatusCode: 'HTTP 503',
          expectedErrorSnippet: 'request timeout while downstream returned 503',
        },
        {
          title: 'regression::downstream 4xx dominates transport abort',
          expectedFailureType: 'DOWNSTREAM_API_4XX',
          expectedStatusCode: 'HTTP 404',
          expectedErrorSnippet: 'net::ERR_ABORTED while calling backend',
        },
        {
          title: 'regression::transport abort with 5xx signal is not UNKNOWN',
          expectedFailureType: 'DOWNSTREAM_API_5XX',
          expectedStatusCode: 'HTTP 502',
          expectedErrorSnippet: 'net::ERR_ABORTED upstream connection aborted',
        },
      ];

      for (const expectedCase of expectedCases) {
        const spec = specs.find((entry) => entry.title === expectedCase.title);
        expect(spec, `Missing JSON reporter spec for "${expectedCase.title}"`).toBeDefined();

        const testEntry = spec?.tests?.[0];
        expect(testEntry, `Missing JSON reporter test entry for "${expectedCase.title}"`).toBeDefined();

        const annotations = testEntry?.annotations ?? [];
        const failureAnnotation = annotations.find((annotation) => annotation.type === 'Failure type');
        expect(failureAnnotation?.description).toBe(expectedCase.expectedFailureType);
        expect(failureAnnotation?.description).not.toBe('UNKNOWN');
        expect(failureAnnotation?.description).not.toBe('NETWORK_TIMEOUT');

        const apiErrorsAnnotation = annotations.find((annotation) => annotation.type === 'API errors');
        expect(apiErrorsAnnotation?.description).toContain(expectedCase.expectedStatusCode);
        expect(apiErrorsAnnotation?.description).not.toContain('?');

        const attachments = testEntry?.results?.[0]?.attachments ?? [];
        const diagnosisAttachment = attachments.find((attachment) => attachment.name === 'Failure diagnosis');
        expect(diagnosisAttachment).toBeDefined();
        const diagnosisText = decodeAttachmentBody(diagnosisAttachment);
        expect(diagnosisText).toContain(`Failure type: ${expectedCase.expectedFailureType}`);
        expect(diagnosisText).toContain(expectedCase.expectedErrorSnippet);
      }
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });
});
