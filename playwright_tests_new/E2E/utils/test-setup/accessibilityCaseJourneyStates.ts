import type { JourneyAccessibilityState } from './accessibilityJourneyTypes';
import { setupAccessibilityMockSession } from '../accessibility/accessibilityMockSession';
import { setupCaseworkerJurisdictionsRoute } from '../../../integration/helpers/caseworkerJurisdictionMockRoutes.helper';
import { setupCaseLinkingMockRoutes } from '../../../integration/helpers/caseLinkingMockRoutes.helper';
import { setupEventBehaviourMockRoutes } from '../../../integration/helpers/eventBehaviourMockRoutes.helper';
import { openDynamicFieldConfigJourney } from '../../../integration/helpers/dynamicFieldConfigMockRoutes.helper';
import {
  setupCaseFileViewDocumentBinaryMockRoutes,
  setupCaseFileViewMockRoutes,
} from '../../../integration/helpers/caseFileViewMockRoutes.helper';
import {
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_CASE_TYPE,
  CASE_LINKING_JURISDICTION,
  CASE_LINKING_TRIGGER_ID,
  CASE_LINKING_RELATED_CASE_REFERENCE,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_REASON_LABEL,
  CASE_LINKING_OTHER_REASON_LABEL,
  formatCaseReferenceForDisplay,
} from '../../../integration/mocks/caseLinking.mock';
import {
  EVENT_BEHAVIOUR_CASE_REFERENCE,
  EVENT_BEHAVIOUR_CASE_TYPE,
  EVENT_BEHAVIOUR_JURISDICTION,
  EVENT_BEHAVIOUR_TRIGGER_ID,
  EVENT_BEHAVIOUR_TRIGGER_NAME,
} from '../../../integration/mocks/eventBehaviour.mock';
import { buildEmptyCaseFileViewCategoriesMock } from '../../../integration/mocks/caseFileView.mock';
import { buildHearingsUserDetailsMock } from '../../../integration/mocks/hearings.mock';

type Fixtures = Parameters<JourneyAccessibilityState['setup']>[0];
const linkingCasePath = `/cases/case-details/${CASE_LINKING_JURISDICTION}/${CASE_LINKING_CASE_TYPE}/${CASE_LINKING_CASE_REFERENCE}`;
const eventCasePath = `/cases/case-details/${EVENT_BEHAVIOUR_JURISDICTION}/${EVENT_BEHAVIOUR_CASE_TYPE}/${EVENT_BEHAVIOUR_CASE_REFERENCE}`;
const linkingEventUrl = new RegExp(`${linkingCasePath}/trigger/${CASE_LINKING_TRIGGER_ID}(?:/[^?#]*)?(?:[?#].*)?$`);
const eventUrl = new RegExp(`${eventCasePath}/trigger/${EVENT_BEHAVIOUR_TRIGGER_ID}(?:/[^?#]*)?(?:[?#].*)?$`);
const createCaseUrl = /\/cases\/case-create\/DIVORCE\/xuiTestJurisdiction\/createCase(?:\/[^?#]*)?(?:[?#].*)?$/;
const documentCaseId = '1690807693531270';
const documentUrl = new RegExp(`/cases/case-details/PRIVATELAW/PRLAPPS/${documentCaseId}(?:[?#].*)?$`);

async function openLinkForm({ page, caseDetailsPage }: Fixtures): Promise<void> {
  await setupAccessibilityMockSession(page);
  await setupCaseLinkingMockRoutes(page, {});
  // EventTriggerResolver reads a CCD Profile (user.idam), not the XUI user-details envelope.
  const { userInfo } = buildHearingsUserDetailsMock(['hmcts-staff']);
  await page.route('**/data/internal/profile', async (route) => {
    await route.fulfill({ json: { user: { idam: userInfo }, channels: [], jurisdictions: [] } });
  });
  await caseDetailsPage.openCaseDetails(CASE_LINKING_JURISDICTION, CASE_LINKING_CASE_TYPE, CASE_LINKING_CASE_REFERENCE);
  await caseDetailsPage.selectCaseAction('Link cases', {
    expectedLocator: caseDetailsPage.linkedCaseReferenceInput,
    retry: false,
  });
}

async function openOutcomeForm(
  { page, caseDetailsPage }: Fixtures,
  config: Parameters<typeof setupEventBehaviourMockRoutes>[1] = {}
): Promise<void> {
  await setupAccessibilityMockSession(page);
  await setupEventBehaviourMockRoutes(page, config);
  await caseDetailsPage.openCaseDetails(EVENT_BEHAVIOUR_JURISDICTION, EVENT_BEHAVIOUR_CASE_TYPE, EVENT_BEHAVIOUR_CASE_REFERENCE);
  await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
    expectedLocator: page.getByLabel('Outcome type'),
    retry: false,
  });
}

async function openCreateForm({ page }: Fixtures): Promise<void> {
  await setupAccessibilityMockSession(page);
  await setupCaseworkerJurisdictionsRoute(page, ['DIVORCE']);
  await openDynamicFieldConfigJourney(page, { skipSessionCookies: true });
}

async function openDocuments({ page, caseDetailsPage, caseFileViewPage }: Fixtures, empty = false): Promise<void> {
  await setupAccessibilityMockSession(page, {
    userDetails: {
      userId: 'a11y-case-documents',
      roles: ['caseworker', 'caseworker-ia-caseofficer', 'pui-case-manager'],
      roleCategory: 'LEGAL_OPERATIONS',
    },
  });
  await setupCaseFileViewMockRoutes(page, documentCaseId, {
    ...(empty ? { categoriesMock: buildEmptyCaseFileViewCategoriesMock() } : {}),
  });
  await setupCaseFileViewDocumentBinaryMockRoutes(page);
  await caseDetailsPage.openCaseDetails('PRIVATELAW', 'PRLAPPS', documentCaseId);
  await caseDetailsPage.selectCaseDetailsTab('Case File View');
  await caseFileViewPage.waitForReady();
}

export const caseJourneyAccessibilityStates: JourneyAccessibilityState[] = [
  {
    feature: 'case linking',
    title: 'link cases form',
    persona: 'staff',
    setup: async (fixtures) => {
      await openLinkForm(fixtures);
      return {
        url: linkingEventUrl,
        ready: [fixtures.caseDetailsPage.linkedCaseReferenceInput, fixtures.caseDetailsPage.caseLinkReasonSelect],
      };
    },
  },
  {
    feature: 'case linking',
    title: 'link cases other reason disclosure',
    persona: 'staff',
    setup: async (fixtures) => {
      await openLinkForm(fixtures);
      await fixtures.caseDetailsPage.fillCaseLinkDetails({
        linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
        reasonLabel: CASE_LINKING_OTHER_REASON_LABEL,
      });
      return { url: linkingEventUrl, ready: [fixtures.caseDetailsPage.caseLinkOtherDescriptionInput] };
    },
  },
  {
    feature: 'case linking',
    title: 'link cases required field errors',
    persona: 'staff',
    setup: async (fixtures) => {
      await openLinkForm(fixtures);
      await fixtures.caseDetailsPage.continueCaseEvent();
      return {
        url: linkingEventUrl,
        ready: [
          fixtures.caseDetailsPage.generalProblemHeading,
          fixtures.page.getByText('Linked case reference is required').first(),
          fixtures.page.getByText('Reason for link is required').first(),
        ],
      };
    },
  },
  {
    feature: 'case linking',
    title: 'link cases check your answers',
    persona: 'staff',
    setup: async (fixtures) => {
      await openLinkForm(fixtures);
      await fixtures.caseDetailsPage.fillCaseLinkDetails({
        linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
        reasonLabel: CASE_LINKING_REASON_LABEL,
      });
      await fixtures.caseDetailsPage.continueCaseEvent();
      return {
        url: linkingEventUrl,
        ready: [
          fixtures.caseDetailsPage.checkYourAnswersHeading,
          fixtures.page.getByRole('table').filter({ hasText: CASE_LINKING_RELATED_CASE_REFERENCE }).first(),
        ],
      };
    },
  },
  {
    feature: 'case linking',
    title: 'linked cases populated tab',
    persona: 'staff',
    setup: async ({ page, caseDetailsPage }) => {
      await setupAccessibilityMockSession(page);
      await setupCaseLinkingMockRoutes(page, {
        initialLinkedCases: [{ linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE, reasonCode: CASE_LINKING_REASON_CODE }],
      });
      await caseDetailsPage.openCaseDetails(CASE_LINKING_JURISDICTION, CASE_LINKING_CASE_TYPE, CASE_LINKING_CASE_REFERENCE);
      await caseDetailsPage.selectCaseDetailsTab('Linked cases');
      return {
        url: new RegExp(`${linkingCasePath}(?:[?#].*)?$`),
        ready: [
          page
            .locator('[role="tabpanel"]:visible')
            .getByRole('link', { name: formatCaseReferenceForDisplay(CASE_LINKING_RELATED_CASE_REFERENCE) })
            .first(),
        ],
      };
    },
  },
  {
    feature: 'case events',
    title: 'event outcome choice',
    persona: 'staff',
    setup: async (fixtures) => {
      await openOutcomeForm(fixtures);
      return {
        url: eventUrl,
        ready: [fixtures.page.getByLabel('Outcome type'), fixtures.page.getByText('Select the outcome for this case')],
      };
    },
  },
  {
    feature: 'case events',
    title: 'event conditional outcome note',
    persona: 'staff',
    setup: async (fixtures) => {
      await openOutcomeForm(fixtures);
      await fixtures.page.getByLabel('Outcome type').selectOption({ label: 'Needs more information' });
      return { url: eventUrl, ready: [fixtures.page.getByLabel('Outcome note')] };
    },
  },
  {
    feature: 'case events',
    title: 'event conditional required error',
    persona: 'staff',
    setup: async (fixtures) => {
      await openOutcomeForm(fixtures);
      await fixtures.page.getByLabel('Outcome type').selectOption({ label: 'Needs more information' });
      await fixtures.caseDetailsPage.continueCaseEvent();
      return {
        url: eventUrl,
        ready: [fixtures.caseDetailsPage.generalProblemHeading, fixtures.page.getByText('Outcome note is required').first()],
      };
    },
  },
  {
    feature: 'case events',
    title: 'event decision details step',
    persona: 'staff',
    setup: async (fixtures) => {
      await openOutcomeForm(fixtures);
      await fixtures.caseDetailsPage.continueCaseEvent();
      return {
        url: eventUrl,
        ready: [fixtures.page.getByLabel('Decision reference'), fixtures.page.getByLabel('Internal note')],
      };
    },
  },
  {
    feature: 'case events',
    title: 'event check your answers',
    persona: 'staff',
    setup: async (fixtures) => {
      await openOutcomeForm(fixtures);
      await fixtures.caseDetailsPage.continueCaseEvent();
      await fixtures.page.getByLabel('Decision reference').fill('EVT-123');
      await fixtures.caseDetailsPage.continueCaseEvent();
      return {
        url: eventUrl,
        ready: [
          fixtures.caseDetailsPage.checkYourAnswersHeading,
          fixtures.createCasePage.checkYourAnswersTable.filter({ hasText: 'EVT-123' }),
        ],
      };
    },
  },
  {
    feature: 'case events',
    title: 'event callback rejection',
    persona: 'staff',
    setup: async (fixtures) => {
      await openOutcomeForm(fixtures, {
        midEventValidation: {
          status: 400,
          body: { callbackErrors: ['Mid-event callback rejected the outcome'], callbackWarnings: [] },
        },
      });
      await fixtures.caseDetailsPage.continueCaseEvent();
      return {
        url: eventUrl,
        ready: [fixtures.page.getByText('Mid-event callback rejected the outcome'), fixtures.page.getByLabel('Outcome type')],
      };
    },
  },
  {
    feature: 'create case',
    title: 'configured create case fields',
    persona: 'solicitor',
    setup: async (fixtures) => {
      await openCreateForm(fixtures);
      return {
        url: createCaseUrl,
        ready: [fixtures.page.getByLabel('Case title'), fixtures.page.getByLabel('Case type'), fixtures.page.locator('#Service')],
      };
    },
  },
  {
    feature: 'create case',
    title: 'urgent case conditional reason',
    persona: 'solicitor',
    setup: async (fixtures) => {
      await openCreateForm(fixtures);
      await fixtures.page.getByLabel('Case type').selectOption({ label: 'Urgent' });
      return { url: createCaseUrl, ready: [fixtures.page.getByLabel('Reason for urgent handling')] };
    },
  },
  {
    feature: 'create case',
    title: 'urgent case required reason error',
    persona: 'solicitor',
    setup: async (fixtures) => {
      await openCreateForm(fixtures);
      await fixtures.page.getByLabel('Case title').fill('Accessibility urgent case');
      await fixtures.page.getByLabel('Case type').selectOption({ label: 'Urgent' });
      await fixtures.page.locator('#CaseReference').fill('123');
      await fixtures.createCasePage.continueButton.click();
      return {
        url: createCaseUrl,
        ready: [
          fixtures.page.locator('.govuk-error-message, .validation-error').filter({ hasText: /reason for urgent handling/i }),
          fixtures.page.getByLabel('Reason for urgent handling'),
        ],
      };
    },
  },
  {
    feature: 'create case',
    title: 'create case check your answers',
    persona: 'solicitor',
    setup: async (fixtures) => {
      await openCreateForm(fixtures);
      await fixtures.page.getByLabel('Case title').fill('Accessibility urgent case');
      await fixtures.page.getByLabel('Case type').selectOption({ label: 'Urgent' });
      await fixtures.page.getByLabel('Reason for urgent handling').fill('Priority issue');
      await fixtures.page.locator('#CaseReference').fill('123');
      await fixtures.page.locator('#Service').selectOption({ label: 'Family' });
      await fixtures.createCasePage.continueButton.click();
      return {
        url: createCaseUrl,
        ready: [
          fixtures.page.getByRole('heading', { name: 'Check your answers' }),
          fixtures.createCasePage.checkYourAnswersTable.filter({ hasText: 'Priority issue' }),
        ],
      };
    },
  },
  {
    feature: 'case file view',
    title: 'document sorting menu',
    persona: 'staff',
    setup: async (fixtures) => {
      await openDocuments(fixtures);
      await fixtures.caseFileViewPage.openSortMenu();
      return {
        url: documentUrl,
        ready: [
          fixtures.caseFileViewPage.sortAscendingOption,
          fixtures.caseFileViewPage.sortDescendingOption,
          fixtures.caseFileViewPage.sortRecentFirstOption,
          fixtures.caseFileViewPage.sortOldestFirstOption,
        ],
      };
    },
  },
  {
    feature: 'case file view',
    title: 'empty document tree',
    persona: 'staff',
    setup: async (fixtures) => {
      await openDocuments(fixtures, true);
      return {
        url: documentUrl,
        ready: [
          fixtures.caseFileViewPage.documentHeader.filter({ hasText: 'Documents (0)' }),
          fixtures.caseFileViewPage.treeContainer.getByText('No results found'),
        ],
      };
    },
  },
  {
    feature: 'case file view',
    title: 'loaded document viewer toolbar and text',
    persona: 'staff',
    setup: async (fixtures) => {
      await openDocuments(fixtures);
      await fixtures.caseFileViewPage.clickFile('Evidence', 'Alpha evidence.pdf');
      return {
        url: documentUrl,
        ready: [
          fixtures.caseFileViewPage.mediaViewerToolbar,
          fixtures.caseFileViewPage.mediaViewPanel.filter({ hasText: 'Case File View - Document Delivery Fixture' }),
        ],
      };
    },
  },
];
