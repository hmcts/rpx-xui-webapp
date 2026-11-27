import { CASE_VIEWER_CASE_REFERENCE } from './caseViewer.mock';
import { MIGRATION_PAYMENT_REFERENCE } from './govukMigration.mock';

export const MIGRATION_REFUND_REFERENCE = 'RF-MIGRATION-001';

export function buildMigrationRefundsMock() {
  return {
    refund_list: [
      {
        ccd_case_number: CASE_VIEWER_CASE_REFERENCE,
        refund_reference: MIGRATION_REFUND_REFERENCE,
        payment_reference: MIGRATION_PAYMENT_REFERENCE,
        amount: 21.5,
        reason: 'Synthetic duplicate payment',
        refund_status: { name: 'Update required' },
        user_full_name: 'Synthetic Caseworker',
        service_type: 'SSCS',
        date_created: '2026-01-15T12:00:00.000Z',
        date_updated: '2026-01-16T12:00:00.000Z',
      },
    ],
  };
}

export function buildMigrationRefundHistoryMock() {
  return {
    last_updated_by_current_user: false,
    status_history_dto_list: [
      {
        status: 'Update required',
        date_created: '2026-01-16T12:00:00.000Z',
        created_by: 'Synthetic Approver',
        notes: 'Confirm the duplicate payment',
      },
    ],
  };
}
