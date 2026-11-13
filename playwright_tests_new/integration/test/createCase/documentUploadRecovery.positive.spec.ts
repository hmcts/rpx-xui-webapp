import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test } from '../../../E2E/fixtures';
import { openDocumentUploadRecoveryJourney } from '../../helpers/documentUploadRecoveryMockRoutes.helper';
import {
  DOCUMENT_UPLOAD_RECOVERY_FILE,
  DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
} from '../../mocks/documentUploadRecovery.mock';
import { routeCaseCreationFlow } from '../../utils/caseCreationRoutes';

const evidenceFile = fileURLToPath(new URL(`../../testData/documents/${DOCUMENT_UPLOAD_RECOVERY_FILE}`, import.meta.url));

test.describe('Create case document upload success', { tag: ['@integration', '@integration-create-case'] }, () => {
  test('accepts the first valid upload and submits its exact document reference once', async ({ page, createCasePage }) => {
    const requests = await openDocumentUploadRecoveryJourney(page, 'first-attempt-success');

    await expect(createCasePage.caseTitleInput).toBeVisible();
    await createCasePage.caseTitleInput.fill('First upload accepted');
    await createCasePage.caseReferenceInput.fill('456');

    const uploadResponse = page.waitForResponse('**/documentsv2');
    await createCasePage.evidenceDocumentInput.setInputFiles({
      name: DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
      mimeType: 'application/pdf',
      buffer: readFileSync(evidenceFile),
    });
    const acceptedUpload = await uploadResponse;
    expect(acceptedUpload.status()).toBe(200);
    await acceptedUpload.finished();
    await expect(createCasePage.evidenceDocumentUploadError).toBeHidden();
    await expect(createCasePage.caseTitleInput).toHaveValue('First upload accepted');
    await expect(createCasePage.caseReferenceInput).toHaveValue('456');
    expect(requests.uploadRequests).toHaveLength(1);
    expect(requests.uploadRequests[0].postData()).toContain(`filename="${DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE}"`);
    expect(requests.createCaseRequests).toHaveLength(0);

    await createCasePage.continueButton.click();
    await expect(createCasePage.checkYourAnswersHeading).toBeVisible();
    await expect(createCasePage.checkYourAnswers).toContainText('First upload accepted');
    await expect(createCasePage.checkYourAnswers).toContainText(DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE);

    const submittedCase = routeCaseCreationFlow(page);
    await createCasePage.testSubmitButton.click();
    const submission = await submittedCase;
    expect(submission).toMatchObject({ data: { CaseTitle: 'First upload accepted', CaseReference: '456' } });
    expect((submission as { data: { EvidenceDocument: unknown } }).data.EvidenceDocument).toEqual({
      document_filename: DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
      document_url: 'http://localhost:3000/documentsv2/synthetic-evidence',
      document_binary_url: 'http://localhost:3000/documentsv2/synthetic-evidence/binary',
      document_hash: 'synthetic-hash-token',
    });
    expect(requests.uploadRequests).toHaveLength(1);
    expect(requests.createCaseRequests).toHaveLength(1);
  });
});
