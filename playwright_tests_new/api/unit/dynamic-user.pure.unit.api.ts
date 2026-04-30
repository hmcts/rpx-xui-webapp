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
  getRuntimeUserCredentialEnvMapping,
  publishRuntimeUserCredentialsToEnv,
  restoreRuntimeUserCredentialsInEnv,
  resolveRuntimeUserCredentialsFromEnv,
  setRuntimeUserCredentials,
} from '../../E2E/utils/runtimeUserCredentials.js';
import { getAliasBaselineRoles, resolveProvisionRoleNamesForAlias } from '../../E2E/utils/test-setup/provisionRoleResolution.js';
import { isTransientWorkflowFailure } from '../../E2E/utils/transient-failure.utils.js';

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
  'DIVORCE_SOLICITOR_USERNAME',
  'DIVORCE_SOLICITOR_PASSWORD',
  'BOOKING_UI_FT_ON_USERNAME',
  'BOOKING_UI_FT_ON_PASSWORD',
  'BOOKING_UI_FT_ON_1_USERNAME',
  'BOOKING_UI_FT_ON_1_PASSWORD',
  'BOOKING_UI_FT_ON_2_USERNAME',
  'BOOKING_UI_FT_ON_2_PASSWORD',
  'BOOKING_UI_FT_ON_3_USERNAME',
  'BOOKING_UI_FT_ON_3_PASSWORD',
  'BOOKING_UI_FT_ON_4_USERNAME',
  'BOOKING_UI_FT_ON_4_PASSWORD',
  'STAFF_ADMIN_USERNAME',
  'STAFF_ADMIN_PASSWORD',
  'STAFF_ADMIN_1_USERNAME',
  'STAFF_ADMIN_1_PASSWORD',
  'STAFF_ADMIN_2_USERNAME',
  'STAFF_ADMIN_2_PASSWORD',
  'STAFF_ADMIN_3_USERNAME',
  'STAFF_ADMIN_3_PASSWORD',
  'STAFF_ADMIN_4_USERNAME',
  'STAFF_ADMIN_4_PASSWORD',
  'HEARING_MANAGER_CR84_OFF_USERNAME',
  'HEARING_MANAGER_CR84_OFF_PASSWORD',
  'HEARING_MANAGER_CR84_OFF_1_USERNAME',
  'HEARING_MANAGER_CR84_OFF_1_PASSWORD',
  'HEARING_MANAGER_CR84_OFF_4_USERNAME',
  'HEARING_MANAGER_CR84_OFF_4_PASSWORD',
  'HEARING_MANAGER_CR84_ON_USERNAME',
  'HEARING_MANAGER_CR84_ON_PASSWORD',
  'HEARING_MANAGER_CR84_ON_1_USERNAME',
  'HEARING_MANAGER_CR84_ON_1_PASSWORD',
  'HEARING_MANAGER_CR84_ON_4_USERNAME',
  'HEARING_MANAGER_CR84_ON_4_PASSWORD',
  'EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME',
  'EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD',
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

  test('runtime user credential env publication mirrors dynamic aliases and restores previous env values', () => {
    process.env.EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME = 'previous@example.test';
    process.env.EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD = 'previous-secret';

    expect(getRuntimeUserCredentialEnvMapping(' employment_dynamic_caseworker ')).toEqual({
      username: 'EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME',
      password: 'EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD',
    });
    const divorceSolicitorMapping = getRuntimeUserCredentialEnvMapping(' divorce_solicitor ');
    expect(divorceSolicitorMapping).toEqual({
      username: 'DIVORCE_SOLICITOR_USERNAME',
      password: 'DIVORCE_SOLICITOR_PASSWORD',
    });
    const bookingUiFtOnMapping = getRuntimeUserCredentialEnvMapping(' booking_ui-ft-on ');
    expect(bookingUiFtOnMapping).toEqual({
      username: 'BOOKING_UI_FT_ON_USERNAME',
      password: 'BOOKING_UI_FT_ON_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' booking_ui-ft-on-1 ')).toEqual({
      username: 'BOOKING_UI_FT_ON_1_USERNAME',
      password: 'BOOKING_UI_FT_ON_1_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' booking_ui-ft-on-4 ')).toEqual({
      username: 'BOOKING_UI_FT_ON_4_USERNAME',
      password: 'BOOKING_UI_FT_ON_4_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' staff_admin ')).toEqual({
      username: 'STAFF_ADMIN_USERNAME',
      password: 'STAFF_ADMIN_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' staff_admin-1 ')).toEqual({
      username: 'STAFF_ADMIN_1_USERNAME',
      password: 'STAFF_ADMIN_1_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' staff_admin-4 ')).toEqual({
      username: 'STAFF_ADMIN_4_USERNAME',
      password: 'STAFF_ADMIN_4_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' hearing_manager_cr84_off ')).toEqual({
      username: 'HEARING_MANAGER_CR84_OFF_USERNAME',
      password: 'HEARING_MANAGER_CR84_OFF_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' hearing_manager_cr84_off-1 ')).toEqual({
      username: 'HEARING_MANAGER_CR84_OFF_1_USERNAME',
      password: 'HEARING_MANAGER_CR84_OFF_1_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' hearing_manager_cr84_on ')).toEqual({
      username: 'HEARING_MANAGER_CR84_ON_USERNAME',
      password: 'HEARING_MANAGER_CR84_ON_PASSWORD',
    });
    expect(getRuntimeUserCredentialEnvMapping(' hearing_manager_cr84_on-4 ')).toEqual({
      username: 'HEARING_MANAGER_CR84_ON_4_USERNAME',
      password: 'HEARING_MANAGER_CR84_ON_4_PASSWORD',
    });

    process.env.DIVORCE_SOLICITOR_USERNAME = 'divorce@example.test';
    process.env.DIVORCE_SOLICITOR_PASSWORD = 'divorce-secret';
    expect(resolveRuntimeUserCredentialsFromEnv(divorceSolicitorMapping!)).toEqual({
      email: 'divorce@example.test',
      password: 'divorce-secret',
    });

    const publishedState = publishRuntimeUserCredentialsToEnv('EMPLOYMENT_DYNAMIC_CASEWORKER', {
      email: 'dynamic@example.test',
      password: 'dynamic-secret',
    });

    expect(process.env.EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME).toBe('dynamic@example.test');
    expect(process.env.EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD).toBe('dynamic-secret');

    restoreRuntimeUserCredentialsInEnv(publishedState);

    expect(process.env.EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME).toBe('previous@example.test');
    expect(process.env.EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD).toBe('previous-secret');
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
    expect(caseSetupTest.isTransientApiRequestError(new Error('api/user/details failed: read ECONNRESET'))).toBe(true);
    expect(caseSetupTest.isTransientApiRequestError(new Error('Validation failed'))).toBe(false);
    expect(isTransientWorkflowFailure(new Error('Validation error after submit after updating case fields'))).toBe(false);
    expect(
      isTransientWorkflowFailure(new Error('Case event failed after PoC personal details: The event could not be created'))
    ).toBe(true);
    expect(isTransientWorkflowFailure(new Error('read ECONNRESET while calling api/user/details'))).toBe(true);
    expect(() => buildCasePayloadFromTemplate('unsupported.template' as never)).toThrow(
      "Unsupported payload template 'unsupported.template'."
    );
    expect(() =>
      buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case', {
        overrides: { TextFieldd: 'typo' } as never,
      })
    ).toThrow(/Unknown override field 'TextFieldd'/);
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
      getAliasBaselineRoles({
        alias: 'DIVORCE_SOLICITOR',
        roleContext: {
          jurisdiction: 'divorce',
        },
      })
    ).toEqual([...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES]);

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
