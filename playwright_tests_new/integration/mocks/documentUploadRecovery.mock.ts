import { dynamicFieldConfigCaseData } from './dynamicFieldConfig.mock';

export const DOCUMENT_UPLOAD_RECOVERY_FILE = 'case-file-view-document-delivery.pdf';
export const DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE = 'replacement-evidence.pdf';
export const DOCUMENT_UPLOAD_RECOVERY_ERROR = 'Error Uploading File';
export const DOCUMENT_UPLOAD_SECOND_REJECTED_FILE = 'second-rejected-evidence.pdf';
export const DOCUMENT_UPLOAD_REJECTION_BODY = 'Synthetic upload rejected';

export function documentUploadRecoveryCaseData() {
  const caseData = dynamicFieldConfigCaseData();
  const documentField = {
    ...caseData.case_fields[0],
    id: 'EvidenceDocument',
    label: 'Evidence document',
    hint_text: 'Upload the evidence for this case',
    value: null,
    field_type: {
      ...caseData.case_fields[0].field_type,
      id: 'Document',
      type: 'Document',
    },
    display_context: 'MANDATORY' as const,
  };

  caseData.case_fields.push(documentField);
  caseData.wizard_pages[0].wizard_page_fields.push({
    case_field_id: documentField.id,
    order: caseData.wizard_pages[0].wizard_page_fields.length + 1,
    page_column_no: null,
    complex_field_overrides: [],
  });
  return caseData;
}

export function successfulDocumentUploadResponse() {
  const documentUrl = 'http://localhost:3000/documentsv2/synthetic-evidence';
  return {
    documents: [
      {
        originalDocumentName: DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
        hashToken: 'synthetic-hash-token',
        _links: {
          self: { href: documentUrl },
          binary: { href: `${documentUrl}/binary` },
        },
      },
    ],
  };
}
