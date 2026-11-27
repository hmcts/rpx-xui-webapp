import { buildCaseViewerMock } from './caseViewer.mock';

const MIGRATION_PAYMENT_GROUP = 'PG-MIGRATION-001';
export const MIGRATION_PAYMENT_REFERENCE = 'RC-MIGRATION-001';

export function buildMigrationCaseMock() {
  const mock = buildCaseViewerMock();
  mock.state = {
    id: 'caseCreated',
    name: 'Case created',
    title_display: '# Case record',
  };
  return mock;
}

export function buildMigrationPaymentsMock() {
  return {
    payment_groups: [
      {
        payment_group_reference: MIGRATION_PAYMENT_GROUP,
        service_request_status: 'Paid',
        fees: [],
        remissions: [],
        refunds: [],
        payments: [
          {
            reference: MIGRATION_PAYMENT_REFERENCE,
            amount: 215,
            status: 'Success',
            date_created: '2026-01-15T12:00:00.000Z',
            channel: 'online',
            method: 'payment by account',
            payment_allocation: [],
            refunds: [],
            over_payment: 0,
          },
        ],
      },
    ],
  };
}

export function buildMigrationPaymentDetailsMock() {
  return buildMigrationPaymentsMock().payment_groups[0];
}

export function buildMigrationPaymentStatusesMock() {
  return {
    amount: 215,
    status_histories: [{ status: 'Success', date_created: '2026-01-15T12:00:00.000Z' }],
  };
}

// These flags keep the Case Details fixture independent of the deployed environment.
export const MIGRATION_FEATURE_FLAGS = {
  MC_Notice_of_Change: { value: true, version: 1 },
  MC_Work_Allocation: { value: true, version: 1 },
  'feature-global-search': { value: true, version: 1 },
  'feature-refunds': { value: true, version: 1 },
  'mc-work-allocation-active-feature': { value: 'WorkAllocationRelease2', version: 1 },
  'payments-user-specific': { value: true, version: 1 },
  'welsh-language': { value: false, version: 1 },
  'mc-cookie-banner-enabled': { value: true, version: 1 },
  'mc-service-messages': { value: {}, version: 1 },
  'mc-service-messages-dates': { value: [], version: 1 },
};
