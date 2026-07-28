import { buildCaseDetailsTasksFromParams } from './caseDetailsTasks.builder';
import { buildAsylumCaseMock } from './cases/asylumCase.mock';
import { buildMyCaseMock, type MyCaseMock } from './myCases.mock';
import { buildTaskListMock, myActionsList } from './taskList.mock';

export const allWorkCasesSupportedJurisdictions = ['IA', 'SSCS'];
export const allWorkCasesSupportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'SSCS', serviceName: 'Social security and child support' },
];

export const allWorkTasksSupportedJurisdictions = ['IA', 'CIVIL'];
export const allWorkTasksSupportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'CIVIL', serviceName: 'Civil' },
];

export const currentFilterPerson = {
  email: 'current.caseworker@example.com',
  firstName: 'Current',
  idamId: 'all-work-current-caseworker',
  lastName: 'Allocation',
  location: {
    id: 231596,
    locationName: 'Birmingham',
    services: ['IA', 'SSCS'],
  },
  roleCategory: 'LEGAL_OPERATIONS',
  service: 'IA',
};

export const emptyFilterPerson = {
  email: 'empty.caseworker@example.com',
  firstName: 'Empty',
  idamId: 'all-work-empty-caseworker',
  lastName: 'Allocation',
  location: {
    id: 231596,
    locationName: 'Birmingham',
    services: ['IA', 'SSCS'],
  },
  roleCategory: 'LEGAL_OPERATIONS',
  service: 'IA',
};

export const allFilterPeople = [currentFilterPerson, emptyFilterPerson];

const buildAllWorkCase = (index: number, overrides: Partial<MyCaseMock> = {}): MyCaseMock => {
  const caseNumber = index + 1;
  return buildMyCaseMock({
    id: `all-work-allocation-${caseNumber}`,
    case_id: `180000000000${String(caseNumber).padStart(4, '0')}`,
    case_name: `All work case ${caseNumber}`,
    case_category: caseNumber % 2 === 0 ? 'Protection' : 'Human rights',
    case_type: 'Asylum',
    jurisdiction: caseNumber % 2 === 0 ? 'SSCS' : 'IA',
    jurisdictionId: caseNumber % 2 === 0 ? 'SSCS' : 'IA',
    expectedServiceLabel: caseNumber % 2 === 0 ? 'Social security and child support' : 'Immigration and Asylum',
    case_role: 'case-manager',
    role: 'Case Manager',
    role_category: 'LEGAL_OPERATIONS',
    assignee: currentFilterPerson.idamId,
    actions: [],
    ...overrides,
  });
};

export const pagedAllWorkCases = Array.from({ length: 140 }, (_, index) => buildAllWorkCase(index));

export const buildAllWorkTaskTableScenario = () => {
  const totalAllWorkTaskRecords = 50;
  const firstPageTaskListResponse = buildTaskListMock(25, '', myActionsList);
  const secondPageTaskListResponse = buildTaskListMock(25, '', myActionsList);
  const taskListMockResponse = { ...firstPageTaskListResponse, total_records: totalAllWorkTaskRecords };
  const secondPageTaskListMockResponse = { ...secondPageTaskListResponse, total_records: totalAllWorkTaskRecords };
  const firstTask = taskListMockResponse.tasks[0];
  const secondPageFirstTask = secondPageTaskListMockResponse.tasks[0];

  firstTask.case_name = 'All work migrated case';
  firstTask.case_name_field = firstTask.case_name;
  firstTask.task_title = 'All work migrated task';
  firstTask.task_field = firstTask.task_title;
  secondPageFirstTask.case_name = 'All work migrated page 2 case';
  secondPageFirstTask.case_name_field = secondPageFirstTask.case_name;
  secondPageFirstTask.task_title = 'All work migrated page 2 task';
  secondPageFirstTask.task_field = secondPageFirstTask.task_title;

  const caseMockResponse = buildAsylumCaseMock({
    caseId: firstTask.case_id,
    caseTypeId: firstTask.case_type_id,
    jurisdictionId: firstTask.jurisdiction,
  });
  const caseTasksResponse = buildCaseDetailsTasksFromParams({
    caseId: firstTask.case_id,
    tasks: [
      {
        id: firstTask.id,
        title: firstTask.task_title,
        state: 'assigned',
        assignee: 'all-work-assignee-1',
        createdDate: firstTask.created_date,
        dueDate: firstTask.due_date,
        priorityDate: firstTask.priority_date,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        caseId: firstTask.case_id,
        caseName: firstTask.case_name,
        caseCategory: firstTask.case_category,
        locationName: firstTask.location_name,
        location: firstTask.location,
        description: 'Task opened from the all-work task link.',
        actions: [{ id: 'go', title: 'Go to task' }],
      },
    ],
  });
  const caseworkerLookupResponse = [
    {
      email: 'all.work.caseworker@example.com',
      firstName: 'All',
      idamId: 'all-work-assignee-1',
      lastName: 'Work',
      location: {
        id: 227101,
        locationName: 'Taylor House',
      },
      roleCategory: 'LEGAL_OPERATIONS',
      service: 'IA',
    },
  ];

  return {
    caseMockResponse,
    caseTasksResponse,
    caseworkerLookupResponse,
    firstTask,
    secondPageFirstTask,
    secondPageTaskListMockResponse,
    taskListMockResponse,
  };
};
