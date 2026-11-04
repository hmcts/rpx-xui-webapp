import { CASE_FILE_VIEW_DOC_IDS } from './caseFileView.mock';

export const MEDIA_VIEWER_HANDOFF_TOKEN = 'exui-4461-mocked-handoff';
export const MEDIA_VIEWER_HANDOFF_CASE_ID = '1690807693531270';
export const MEDIA_VIEWER_HANDOFF_PAYLOAD = JSON.stringify({
  document_binary_url: `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary`,
  document_filename: 'Alpha evidence.pdf',
  content_type: 'pdf',
  annotation_api_url: '/api/markups',
  case_id: MEDIA_VIEWER_HANDOFF_CASE_ID,
  case_jurisdiction: 'PRIVATELAW',
});
export const MEDIA_VIEWER_REPLAY_PAYLOAD = JSON.stringify({
  document_binary_url: `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceZeta}/binary`,
  document_filename: 'Zeta evidence.pdf',
  content_type: 'pdf',
});

export const MEDIA_VIEWER_INVALID_HANDOFFS = [
  { name: 'wrong origin', origin: 'https://other-origin.example' },
  { name: 'wrong source', source: 'self' },
  { name: 'wrong token', token: 'unrelated-token' },
  { name: 'malformed JSON', payload: '{broken-json' },
  { name: 'invalid metadata', payload: JSON.stringify({ document_filename: 'invalid.pdf', content_type: 'pdf' }) },
] as const;

export const MEDIA_VIEWER_ANNOTATION_RESPONSES = [
  { pathname: `/em-anno/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/bookmarks`, body: [] },
  {
    pathname: `/em-anno/metadata/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}`,
    body: { documentId: CASE_FILE_VIEW_DOC_IDS.evidenceAlpha, rotationAngle: 0 },
  },
];

export const MEDIA_VIEWER_OPENER_HTML =
  '<button onclick="window.viewer = window.open(\'about:blank\')">Open mocked viewer</button>';
