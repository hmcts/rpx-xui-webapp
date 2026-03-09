import type { Page } from '@playwright/test';

type UploadDocumentViaApiOptions = {
  page: Page;
  jurisdictionId: string;
  caseTypeId: string;
  fileName: string;
  mimeType: string;
  fileContent: string;
  classification?: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
};

type DocumentsV2Response = {
  documents?: Array<{
    originalDocumentName?: string;
    hashToken?: string;
    _links?: {
      self?: { href?: string };
      binary?: { href?: string };
    };
  }>;
};

export type CcdDocumentValue = {
  document_url: string;
  document_binary_url: string;
  document_filename: string;
  document_hash?: string;
};

export async function uploadDocumentViaApi(options: UploadDocumentViaApiOptions): Promise<CcdDocumentValue> {
  const response = await options.page.request.post(new URL('/documentsv2', options.page.url()).toString(), {
    multipart: {
      classification: options.classification ?? 'PUBLIC',
      jurisdictionId: options.jurisdictionId,
      caseTypeId: options.caseTypeId,
      files: {
        name: options.fileName,
        mimeType: options.mimeType,
        buffer: Buffer.from(options.fileContent),
      },
    },
    failOnStatusCode: false,
  });

  const bodyText = await response.text();
  if (!response.ok()) {
    throw new Error(`Document upload API failed with HTTP ${response.status()}: ${bodyText.slice(0, 500)}`);
  }

  const payload = JSON.parse(bodyText) as DocumentsV2Response;
  const uploaded = payload.documents?.[0];
  const documentUrl = uploaded?._links?.self?.href?.trim();
  const documentBinaryUrl = uploaded?._links?.binary?.href?.trim();
  const documentFilename = uploaded?.originalDocumentName?.trim();

  if (!documentUrl || !documentBinaryUrl || !documentFilename) {
    throw new Error(`Document upload API response missing CCD document fields: ${bodyText.slice(0, 500)}`);
  }

  return {
    document_url: documentUrl,
    document_binary_url: documentBinaryUrl,
    document_filename: documentFilename,
    ...(uploaded?.hashToken ? { document_hash: uploaded.hashToken } : {}),
  };
}
