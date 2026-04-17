import { buildHearingsUserDetailsMock } from './hearings.mock';

export const TASK_EVENT_CASE_ID = '1234567812345678';
export const TASK_EVENT_CASE_TYPE = 'Asylum';
export const TASK_EVENT_JURISDICTION = 'IA';
export const TASK_EVENT_ID = 'text';
export const TASK_EVENT_NAME = 'Test event';

export type TaskEventTask = {
  assignee?: string;
  case_id: string;
  case_type_id: string;
  id: string;
  jurisdiction: string;
  task_state: string;
  task_title: string;
};

export function buildTaskEventUserDetails(userId: string) {
  const userDetails = buildHearingsUserDetailsMock([
    'caseworker',
    'caseworker-ia',
    'caseworker-ia-caseofficer',
    'caseworker-ia-admofficer',
    'task-supervisor',
    'case-allocator',
  ]);

  userDetails.userInfo.id = userId;
  userDetails.userInfo.uid = userId;
  userDetails.roleAssignmentInfo = [
    {
      jurisdiction: TASK_EVENT_JURISDICTION,
      substantive: 'Y',
      roleType: 'ORGANISATION',
      baseLocation: '12345',
      isCaseAllocator: true,
    },
  ];

  return userDetails;
}

export function buildTaskEventTriggerMock() {
  return {
    id: TASK_EVENT_ID,
    name: TASK_EVENT_NAME,
    description: 'Task event completion integration test trigger',
    event_token: 'mock-task-event-token',
    case_fields: [],
    wizard_pages: [],
    show_summary: false,
    show_event_notes: false,
    end_button_label: 'Continue',
    can_save_draft: null,
    access_granted: 'STANDARD',
    access_process: 'NONE',
    title_display: null,
    supplementary_data: null,
    _links: {
      self: {
        href: `/data/internal/cases/${TASK_EVENT_CASE_ID}/event-triggers/${TASK_EVENT_ID}?ignore-warning=false`,
      },
    },
  };
}

export function buildTaskEventTask(overrides: Partial<TaskEventTask> = {}): TaskEventTask {
  return {
    assignee: overrides.assignee,
    case_id: overrides.case_id ?? TASK_EVENT_CASE_ID,
    case_type_id: overrides.case_type_id ?? TASK_EVENT_CASE_TYPE,
    id: overrides.id ?? '08a3d216-task-4e92-a7e3-ca3661e6be87',
    jurisdiction: overrides.jurisdiction ?? TASK_EVENT_JURISDICTION,
    task_state: overrides.task_state ?? 'assigned',
    task_title: overrides.task_title ?? 'Task 1',
  };
}

export function buildTaskEventPayload(tasks: TaskEventTask[]) {
  return {
    task_required_for_event: true,
    tasks,
  };
}
