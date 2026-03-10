import { expect, test } from '@playwright/test';

import { __test__ as caseSetupTest } from '../../E2E/utils/test-setup/caseSetup.js';
import { buildCasePayloadFromTemplate } from '../../E2E/utils/test-setup/payloads/registry.js';
import {
  DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES,
  EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  resolveSolicitorRoleStrategy,
} from '../../E2E/utils/professional-user/roleStrategy.js';
import {
  clearRuntimeUserCredentials,
  getRuntimeUserCredentials,
  setRuntimeUserCredentials,
} from '../../E2E/utils/runtimeUserCredentials.js';
import { resolveProvisionRoleNamesForAlias } from '../../E2E/utils/test-setup/provisionRoleResolution.js';

test.describe.configure({ mode: 'serial' });

const ENV_KEYS = [
  'SOLICITOR_ROLE_PROFILE',
  'SOLICITOR_TEST_TYPE',
  'SOLICITOR_CASE_TYPE',
  'SOLICITOR_JURISDICTION',
  'PW_E2E_CASE_SETUP_MODE',
  'PW_E2E_CASE_SETUP_ALLOW_UI_FALLBACK',
  'DYNAMIC_DIVORCE_SOLICITOR_ROLE_SET',
  'DYNAMIC_SOLICITOR_TEMPLATE_ROLES',
] as const;

let originalEnvValues: Record<string, string | undefined> = {};

test.describe('Dynamic user support unit tests: pure modules', { tag: '@svc-internal' }, () => {
  test.beforeEach(() => {
    originalEnvValues = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
    clearRuntimeUserCredentials('dynamic-user');
  });

  test.afterEach(() => {
    for (const key of ENV_KEYS) {
      const originalValue = originalEnvValues[key];
      if (typeof originalValue === 'string') {
        process.env[key] = originalValue;
      } else {
        delete process.env[key];
      }
    }
    clearRuntimeUserCredentials('dynamic-user');
  });

  test('resolveSolicitorRoleStrategy prefers explicit roles and deduplicates them', () => {
    const resolution = resolveSolicitorRoleStrategy({
      roleNames: ['caseworker', ' caseworker ', 'pui-case-manager', ''],
      roleProfile: 'extended',
    });

    expect(resolution.source).toBe('explicit-roleNames');
    expect(resolution.roleProfile).toBe('extended');
    expect(resolution.roleNames).toEqual(['caseworker', 'pui-case-manager']);
  });

  test('resolveSolicitorRoleStrategy derives employment invite-user roles from context', () => {
    const resolution = resolveSolicitorRoleStrategy({
      roleProfile: 'minimal',
      roleContext: {
        jurisdiction: 'employment',
        testType: 'invite-user',
      },
    });

    expect(resolution.source).toBe('context-driven');
    expect(resolution.roleNames).toEqual(
      expect.arrayContaining([...EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES, 'pui-user-manager', 'pui-caa'])
    );
    expect(resolution.context).toEqual({
      jurisdiction: 'employment',
      testType: 'invite-user',
      caseType: undefined,
    });
  });

  test('runtime user credentials registry normalizes identifiers', () => {
    setRuntimeUserCredentials(' dynamic-user ', {
      email: 'dynamic@example.test',
      password: 'secret',
    });

    expect(getRuntimeUserCredentials('DYNAMIC-USER')).toEqual({
      email: 'dynamic@example.test',
      password: 'secret',
    });

    clearRuntimeUserCredentials('dynamic-user');
    expect(getRuntimeUserCredentials(' dynamic-user ')).toBeUndefined();
  });

  test('payload registry builds seeded payloads and setup helpers resolve defaults', () => {
    process.env.PW_E2E_CASE_SETUP_MODE = 'ui-only';
    process.env.PW_E2E_CASE_SETUP_ALLOW_UI_FALLBACK = 'true';

    const payload = buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case', {
      seed: 42,
      overrides: {
        TextField: 'custom-text-field',
        ComplexType_3: {
          caseLink: {
            CaseReference: '1234123412341234',
          },
        },
      },
    });

    expect(payload.meta).toEqual({
      template: 'divorce.xui-test-case-type.create-case',
      jurisdiction: 'DIVORCE',
      caseType: 'xuiTestCaseType',
      eventId: 'createCase',
      seed: 42,
    });
    expect(payload.fieldValues.TextField).toBe('custom-text-field');
    expect((payload.fieldValues.ComplexType_3 as { caseLink: { CaseReference: string } }).caseLink.CaseReference).toBe(
      '1234123412341234'
    );

    expect(caseSetupTest.resolveSetupMode(undefined)).toBe('ui-only');
    expect(caseSetupTest.resolveUiFallbackFlag(undefined)).toBe(true);
    expect(caseSetupTest.resolveUiFallbackFlag(false)).toBe(false);
    expect(caseSetupTest.resolveCaseNumberFromCreateResponse({ case_reference: 1773065942199262 })).toBe('1773065942199262');
    expect(() => buildCasePayloadFromTemplate('unsupported.template' as never)).toThrow(
      "Unsupported payload template 'unsupported.template'."
    );
  });

  test('resolveProvisionRoleNamesForAlias honours explicit, template, and divorce noc role resolution', () => {
    expect(
      resolveProvisionRoleNamesForAlias({
        alias: 'SOLICITOR',
        explicitRoleNames: ['caseworker', ' caseworker ', 'pui-case-manager'],
      })
    ).toEqual(['caseworker', 'pui-case-manager']);

    process.env.DYNAMIC_SOLICITOR_TEMPLATE_ROLES = 'caseworker,pui-case-manager,caseworker';
    expect(
      resolveProvisionRoleNamesForAlias({
        alias: 'SOLICITOR',
      })
    ).toEqual(['caseworker', 'pui-case-manager']);

    delete process.env.DYNAMIC_SOLICITOR_TEMPLATE_ROLES;
    process.env.DYNAMIC_DIVORCE_SOLICITOR_ROLE_SET = 'external-noc';

    expect(
      resolveProvisionRoleNamesForAlias({
        alias: 'SOLICITOR',
        roleContext: {
          jurisdiction: 'divorce',
        },
      })
    ).toEqual([...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES]);
  });
});
