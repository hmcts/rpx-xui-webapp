import type { JourneyAccessibilityState } from './accessibilityJourneyTypes';
import { setupAccessibilityMockSession } from '../accessibility/accessibilityMockSession';
import {
  ACCESS_REQUEST_REVIEW_PATH,
  CHALLENGED_ACCESS_PATH,
  SPECIFIC_ACCESS_PATH,
  setupChallengedAccessMockRoutes,
  setupSpecificAccessRequestMockRoutes,
  setupReviewSpecificAccessMockRoutes,
  setupManageTasksBaseRoutes,
} from '../../../integration/helpers';
import { buildTaskListMock, myActionsList } from '../../../integration/mocks/taskList.mock';
import { setupTaskActionEndpointMocks } from '../../../integration/helpers/taskActionApiMocks.helper';

const reviewStates = [
  'request details',
  'approval duration',
  'custom approval dates',
  'approval confirmation',
  'request more information',
  'more information confirmation',
] as const;
const challengedStates = [
  'reason options',
  'linked case input',
  'other reason input',
  'other reason validation',
  'access confirmation',
] as const;

export const accessTaskAccessibilityStates: JourneyAccessibilityState[] = [
  ...reviewStates.map<JourneyAccessibilityState>((state) => ({
    feature: 'access requests',
    title: `review access — ${state}`,
    persona: 'staff legal operations / task supervisor',
    setup: async ({ page, accessRequestPage: request }) => {
      await setupAccessibilityMockSession(page);
      await setupReviewSpecificAccessMockRoutes(page);
      await request.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
      const url =
        /\/role-access\/task-review-specific-access\/assignment\/assignment-review-specific-access\/specific-access(?:\/|$|\?)/;
      if (state === 'request details') return { url, ready: [request.reviewSpecificHeading, request.approveRequestRadio] };
      if (state === 'request more information' || state === 'more information confirmation') {
        await request.requestMoreInformationRadio.check();
        await request.continueButton.click();
        if (state === 'request more information')
          return { url, ready: [request.requestMoreInformationHeading, request.reviewMoreDetailInput] };
        await request.reviewMoreDetailInput.fill('Please provide the linked application details.');
        await request.continueButton.click();
        return { url, ready: [request.requestDeniedHeading] };
      }
      await request.approveRequestRadio.check();
      await request.continueButton.click();
      if (state === 'custom approval dates') {
        await request.anotherPeriodRadio.check();
        return { url, ready: [request.reviewDurationHeading, request.endDateDayInput, request.accessStartsLegend] };
      }
      if (state === 'approval confirmation') {
        await request.sevenDaysRadio.check();
        await request.submitButton.click();
        return { url, ready: [request.accessApprovedHeading] };
      }
      return { url, ready: [request.reviewDurationHeading, request.sevenDaysRadio] };
    },
  })),
  ...challengedStates.map<JourneyAccessibilityState>((state) => ({
    feature: 'access requests',
    title: `challenged access — ${state}`,
    persona: 'staff legal operations / task supervisor',
    setup: async ({ page, accessRequestPage: request }) => {
      await setupAccessibilityMockSession(page);
      await setupChallengedAccessMockRoutes(page);
      await request.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
      const url =
        /\/cases\/case-details\/PUBLICLAW\/CARE_SUPERVISION_EPO\/1111222233334444\/challenged-access-(?:request|success)(?:$|[/?#])/;
      if (state === 'reason options') return { url, ready: [request.challengedAccessHeading, request.linkedCaseReasonRadio] };
      if (state === 'linked case input') {
        await request.linkedCaseReasonRadio.check();
        return { url, ready: [request.challengedAccessHeading, request.challengedCaseReferenceInput] };
      }
      await request.otherReasonRadio.check();
      if (state === 'other reason input')
        return { url, ready: [request.challengedAccessHeading, request.challengedOtherReasonInput] };
      if (state === 'other reason validation') {
        await request.submitButton.click();
        return { url, ready: [request.challengedAccessHeading, request.errorMessage('Enter a reason')] };
      }
      await request.challengedOtherReasonInput.fill('Urgent safeguarding review required before hearing.');
      await request.submitButton.click();
      return { url, ready: [request.challengedAccessSuccessHeading, request.viewCaseFileLink] };
    },
  })),
  ...(['reason form', 'request confirmation'] as const).map<JourneyAccessibilityState>((state) => ({
    feature: 'access requests',
    title: `specific access — ${state}`,
    persona: 'staff legal operations / task supervisor',
    setup: async ({ page, accessRequestPage: request }) => {
      await setupAccessibilityMockSession(page);
      await setupSpecificAccessRequestMockRoutes(page);
      await request.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
      const url =
        /\/cases\/case-details\/PUBLICLAW\/CARE_SUPERVISION_EPO\/1111222233334444\/specific-access-(?:request|success)(?:$|[/?#])/;
      if (state === 'reason form') return { url, ready: [request.specificAccessContainer, request.specificAccessReasonInput] };
      await request.specificAccessReasonInput.fill('Need to review linked proceedings.');
      await request.submitButton.click();
      return { url, ready: [request.specificAccessSuccessContainer] };
    },
  })),
  ...(
    ['actions expanded', 'cancel confirmation', 'complete confirmation', 'unassign confirmation', 'reassign role choice'] as const
  ).map<JourneyAccessibilityState>((state) => ({
    feature: 'work allocation',
    title: `my task — ${state}`,
    persona: 'staff legal operations / task supervisor',
    setup: async ({ page, taskListPage: tasks }) => {
      const userId = 'a11y-task-actions';
      const response = buildTaskListMock(1, userId, myActionsList);
      const task = response.tasks[0];
      await setupAccessibilityMockSession(page);
      await setupManageTasksBaseRoutes(page, { taskListResponse: response, user: { userId } });
      const action =
        state === 'cancel confirmation'
          ? 'cancel'
          : state === 'complete confirmation'
            ? 'complete'
            : state === 'unassign confirmation'
              ? 'unassign'
              : 'reassign';
      await setupTaskActionEndpointMocks(page, action, {
        taskId: task.id,
        caseId: task.case_id,
        jurisdiction: task.jurisdiction,
        caseTypeId: task.case_type_id,
        assigneeId: task.assignee,
      });
      await tasks.goto();
      await tasks.openFirstManageActions('accessibility task actions');
      if (state === 'actions expanded')
        return { url: /\/work\/my-work\/list(?:$|[/?#])/, ready: [tasks.taskActionsRow, tasks.taskActionCancel] };
      const control = {
        cancel: tasks.taskActionCancel,
        complete: tasks.taskActionMarkAsDone,
        unassign: tasks.taskActionUnassign,
        reassign: tasks.taskActionReassign,
      }[action];
      await tasks.clickTaskAction(control, `accessibility ${state}`);
      return {
        url: new RegExp(`/work/${task.id}/${action === 'unassign' ? 'unclaim' : action}(?:$|[/?#])`),
        ready:
          state === 'reassign role choice'
            ? [page.getByRole('heading', { name: 'Reassign task Choose a role type' }), tasks.continueButton]
            : [page.locator('#action-title'), tasks.submitButton],
      };
    },
  })),
];
