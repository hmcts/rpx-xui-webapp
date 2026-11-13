import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test } from '../../../E2E/fixtures';
import { openDocumentUploadRecoveryJourney } from '../../helpers/documentUploadRecoveryMockRoutes.helper';
import {
  DOCUMENT_UPLOAD_RECOVERY_ERROR,
  DOCUMENT_UPLOAD_RECOVERY_FILE,
  DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
} from '../../mocks/documentUploadRecovery.mock';
import { routeCaseCreationFlow } from '../../utils/caseCreationRoutes';

const evidenceFile = fileURLToPath(new URL(`../../testData/documents/${DOCUMENT_UPLOAD_RECOVERY_FILE}`, import.meta.url));

test.describe('Create case document upload recovery', { tag: ['@integration', '@integration-create-case'] }, () => {
  test('retains entered work after an unavailable upload and submits one valid replacement', async ({ page, createCasePage }) => {
    const requests = await openDocumentUploadRecoveryJourney(page);

    await expect(createCasePage.caseTitleInput).toBeVisible();
    await createCasePage.caseTitleInput.fill('Evidence upload recovery');
    await createCasePage.caseReferenceInput.fill('123');

    await createCasePage.evidenceDocumentInput.setInputFiles(evidenceFile);
    await expect(createCasePage.evidenceDocumentUploadError).toBeVisible();
    await expect(createCasePage.evidenceDocumentUploadError).toContainText(DOCUMENT_UPLOAD_RECOVERY_ERROR);
    expect(requests.uploadRequests).toHaveLength(1);

    await createCasePage.continueButton.click();
    await expect(createCasePage.caseTitleInput).toHaveValue('Evidence upload recovery');
    await expect(createCasePage.caseReferenceInput).toHaveValue('123');
    await expect(createCasePage.checkYourAnswersHeading).toBeHidden();
    expect(requests.createCaseRequests).toHaveLength(0);

    await createCasePage.evidenceDocumentInput.setInputFiles({
      name: DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
      mimeType: 'application/pdf',
      buffer: readFileSync(evidenceFile),
    });
    await expect(createCasePage.evidenceDocumentUploadError).toBeHidden();
    expect(requests.uploadRequests).toHaveLength(2);
    expect(requests.uploadRequests[1].postData()).toContain(`filename="${DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE}"`);

    await createCasePage.continueButton.click();
    await expect(createCasePage.checkYourAnswersHeading).toBeVisible();
    await expect(createCasePage.checkYourAnswers).toContainText('Evidence upload recovery');
    await expect(createCasePage.checkYourAnswers).toContainText(DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE);
    await expect(createCasePage.checkYourAnswers).not.toContainText(DOCUMENT_UPLOAD_RECOVERY_FILE);

    const submittedCase = routeCaseCreationFlow(page);
    await createCasePage.testSubmitButton.click();
    const submission = await submittedCase;
    expect(submission).toMatchObject({
      data: { CaseTitle: 'Evidence upload recovery', CaseReference: '123' },
    });
    expect((submission as { data: { EvidenceDocument: unknown } }).data.EvidenceDocument).toEqual({
      document_filename: DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
      document_url: 'http://localhost:3000/documentsv2/synthetic-evidence',
      document_binary_url: 'http://localhost:3000/documentsv2/synthetic-evidence/binary',
      document_hash: 'synthetic-hash-token',
    });
    expect(requests.createCaseRequests).toHaveLength(1);
  });
});
