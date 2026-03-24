import { readFileSync } from 'node:fs';
import path from 'node:path';

import { buildAsylumCaseMock } from './cases/asylumCase.mock';

export const CASE_FILE_VIEW_DOC_IDS = {
  evidenceAlphaV1: '11111111-1111-1111-1111-111111111111',
  evidenceMiddleV2: '22222222-2222-2222-2222-222222222222',
  evidenceZetaV2: '33333333-3333-3333-3333-333333333333',
  orderRootV2: '44444444-4444-4444-4444-444444444444',
  approvedOrderV2: '55555555-5555-5555-5555-555555555555',
  applicationRootV2: '66666666-6666-6666-6666-666666666666',
} as const;

const CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF_PATH = path.resolve(
  process.cwd(),
  'playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf'
);

export const CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF = readFileSync(CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF_PATH);

const buildV1Document = (documentId: string, filename: string, uploadTimestamp: string) => ({
  document_url: `http://localhost:3000/documents/${documentId}`,
  document_filename: filename,
  document_binary_url: `http://localhost:3000/documents/${documentId}/binary`,
  attribute_path: `${filename.replaceAll('.', '_')}.document`,
  upload_timestamp: uploadTimestamp,
});

const buildV2Document = (documentId: string, filename: string, uploadTimestamp: string) => ({
  document_url: `http://localhost:3000/documentsv2/${documentId}`,
  document_filename: filename,
  document_binary_url: `http://localhost:3000/documentsv2/${documentId}/binary`,
  attribute_path: `${filename.replaceAll('.', '_')}.document`,
  upload_timestamp: uploadTimestamp,
});

const caseFileViewTabConfig = {
  id: 'caseFileView',
  label: 'Case File View',
  order: 13,
  fields: [
    {
      id: 'componentLauncher',
      label: 'Component Launcher',
      value: null,
      formatted_value: null,
      field_type: {
        id: 'ComponentLauncher',
        type: 'ComponentLauncher',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      security_label: 'PUBLIC',
      order: 1,
      display_context: null,
      display_context_parameter: '#ARGUMENT(CaseFileView)',
    },
  ],
};

export function buildCaseFileViewCaseMock(caseId: string) {
  const base = buildAsylumCaseMock({
    caseId,
    caseTypeId: 'PRLAPPS',
    jurisdictionId: 'PRIVATELAW',
  });

  return {
    ...base,
    tabs: [...(base.tabs ?? []), caseFileViewTabConfig],
  };
}

export function buildCaseFileViewCategoriesMock() {
  return {
    case_version: 2,
    categories: [
      {
        category_id: 'evidence',
        category_name: 'Evidence',
        category_order: 1,
        documents: [
          buildV2Document(CASE_FILE_VIEW_DOC_IDS.evidenceZetaV2, 'Zeta evidence.pdf', '2023-10-22T09:15:00.000Z'),
          buildV1Document(CASE_FILE_VIEW_DOC_IDS.evidenceAlphaV1, 'Alpha evidence.pdf', '2023-10-20T08:15:00.000Z'),
          buildV2Document(CASE_FILE_VIEW_DOC_IDS.evidenceMiddleV2, 'Middle evidence.pdf', '2023-10-21T10:30:00.000Z'),
        ],
        sub_categories: [],
      },
      {
        category_id: 'orders',
        category_name: 'Orders',
        category_order: 2,
        documents: [buildV2Document(CASE_FILE_VIEW_DOC_IDS.orderRootV2, 'Root order.pdf', '2023-10-20T11:45:00.000Z')],
        sub_categories: [
          {
            category_id: 'approvedOrders',
            category_name: 'Approved orders',
            category_order: 1,
            documents: [
              buildV2Document(CASE_FILE_VIEW_DOC_IDS.approvedOrderV2, 'Approved order.pdf', '2023-10-19T14:00:00.000Z'),
            ],
            sub_categories: [],
          },
        ],
      },
      {
        category_id: 'applications',
        category_name: 'Applications',
        category_order: 3,
        documents: [
          buildV2Document(CASE_FILE_VIEW_DOC_IDS.applicationRootV2, 'Application summary.pdf', '2023-10-18T16:00:00.000Z'),
        ],
        sub_categories: [],
      },
    ],
  };
}

export function buildEmptyCaseFileViewCategoriesMock() {
  return {
    case_version: 2,
    categories: [],
  };
}
