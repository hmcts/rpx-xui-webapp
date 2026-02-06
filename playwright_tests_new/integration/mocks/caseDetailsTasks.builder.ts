import { faker } from '@faker-js/faker';

type TaskWarningList = {
  values: Array<unknown>;
};

type TaskPermissions = {
  values: string[];
};

type TaskAction = {
  id: string;
  title: string;
};

export type CaseDetailsTaskMock = {
  id: string;
  name: string;
  type: string;
  task_state: string;
  task_system: string;
  security_classification: string;
  task_title: string;
  created_date: string;
  due_date: string;
  location_name: string;
  location: string;
  execution_type: string;
  jurisdiction: string;
  region: string;
  case_type_id: string;
  case_id: string;
  case_category: string;
  case_name: string;
  auto_assigned: boolean;
  warnings: boolean;
  warning_list: TaskWarningList;
  case_management_category: string;
  work_type_id: string;
  work_type_label: string;
  permissions: TaskPermissions;
  description: string;
  role_category: string;
  minor_priority: number;
  major_priority: number;
  priority_date: string;
  dueDate: string;
  assignee: string;
  actions: TaskAction[];
  [key: string]: any;
};

export type TaskDetailsOverrides = Partial<CaseDetailsTaskMock> & {
  id?: string;
  case_id?: string;
};

export type CaseDetailsTasksBuilderOptions = {
  caseId: string;
  tasks?: TaskDetailsOverrides[];
  baseTask?: Partial<CaseDetailsTaskMock>;
};

export type TaskDetailsParams = {
  id?: string;
  title?: string;
  state?: string;
  type?: string;
  name?: string;
  taskSystem?: string;
  securityClassification?: string;
  createdDate?: string;
  dueDate?: string;
  priorityDate?: string;
  locationName?: string;
  location?: string;
  executionType?: string;
  jurisdiction?: string;
  region?: string;
  caseTypeId?: string;
  caseId?: string;
  caseCategory?: string;
  caseName?: string;
  autoAssigned?: boolean;
  warnings?: boolean;
  caseManagementCategory?: string;
  workTypeId?: string;
  workTypeLabel?: string;
  permissions?: string[];
  description?: string;
  roleCategory?: string;
  minorPriority?: number;
  majorPriority?: number;
  assignee?: string;
  actions?: TaskAction[];
};

export type CaseDetailsTasksParamsOptions = {
  caseId: string;
  tasks: TaskDetailsParams[];
  baseTask?: Partial<CaseDetailsTaskMock>;
};

export type CaseDetailsTasksMinimalOptions = {
  caseId: string;
  titles?: string[];
  states?: string[];
  types?: string[];
  taskSystems?: string[];
  locations?: Array<{ name: string; id: string }>;
  assignees?: string[];
  descriptions?: string[];
};

const toIso = (date: Date) => date.toISOString();

const stripUndefined = <T extends Record<string, any>>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as Partial<T>;

const createBaseTask = (caseId: string): CaseDetailsTaskMock => {
  const created = faker.date.recent({ days: 5 });
  const due = faker.date.soon({ days: 7 });
  return {
    id: faker.string.uuid(),
    name: 'Follow-up overdue respondent evidence',
    type: 'followUpOverdueRespondentEvidence',
    task_state: 'assigned',
    task_system: 'SELF',
    security_classification: 'PUBLIC',
    task_title: faker.word.words({ count: { min: 2, max: 4 } }),
    created_date: toIso(created),
    due_date: toIso(due),
    location_name: 'Taylor House',
    location: '765324',
    execution_type: 'Case Management Task',
    jurisdiction: 'IA',
    region: '1',
    case_type_id: 'Asylum',
    case_id: caseId,
    case_category: 'Protection',
    case_name: faker.person.fullName(),
    auto_assigned: false,
    warnings: false,
    warning_list: { values: [] },
    case_management_category: 'Protection',
    work_type_id: 'decision_making_work',
    work_type_label: 'Decision-making work',
    permissions: { values: ['Own', 'Execute', 'Manage'] },
    description: 'Click link to proceed to task [Task link next step](/case/case-details/${[id]})',
    role_category: 'LEGAL_OPERATIONS',
    minor_priority: 500,
    major_priority: 5000,
    priority_date: toIso(due),
    dueDate: toIso(due),
    assignee: 'dfd4c2d1-67b1-40f9-8680-c9551632f5d9',
    actions: [
      { id: 'assign', title: 'Assign task' },
      { id: 'cancel', title: 'Cancel task' },
      { id: 'claim', title: 'Assign to me' },
    ],
  };
};

export const buildTaskDetailsMock = (
  caseId: string,
  overrides: TaskDetailsOverrides = {},
  baseTask?: Partial<CaseDetailsTaskMock>
): CaseDetailsTaskMock => {
  const base = { ...createBaseTask(caseId), ...(baseTask ?? {}) };
  const mergedCaseId = overrides.case_id ?? caseId;
  const cleanOverrides = stripUndefined(overrides as Record<string, any>);
  return {
    ...base,
    ...cleanOverrides,
    id: overrides.id ?? base.id ?? faker.string.uuid(),
    case_id: mergedCaseId,
  };
};

export const buildCaseDetailsTasksMock = (options: CaseDetailsTasksBuilderOptions): CaseDetailsTaskMock[] => {
  const { caseId, tasks = [{}], baseTask } = options;
  return tasks.map((taskOverrides) => buildTaskDetailsMock(caseId, taskOverrides, baseTask));
};

const mapParamsToOverrides = (caseId: string, params: TaskDetailsParams): TaskDetailsOverrides => {
  const createdDate = params.createdDate;
  const dueDate = params.dueDate;
  const priorityDate = params.priorityDate ?? dueDate;
  return {
    id: params.id,
    name: params.name ?? params.title ?? undefined,
    type: params.type,
    task_state: params.state,
    task_system: params.taskSystem,
    security_classification: params.securityClassification,
    task_title: params.title,
    created_date: createdDate,
    due_date: dueDate,
    location_name: params.locationName,
    location: params.location,
    execution_type: params.executionType,
    jurisdiction: params.jurisdiction,
    region: params.region,
    case_type_id: params.caseTypeId,
    case_id: params.caseId ?? caseId,
    case_category: params.caseCategory,
    case_name: params.caseName,
    auto_assigned: params.autoAssigned,
    warnings: params.warnings,
    case_management_category: params.caseManagementCategory,
    work_type_id: params.workTypeId,
    work_type_label: params.workTypeLabel,
    permissions: params.permissions ? { values: params.permissions } : undefined,
    description: params.description,
    role_category: params.roleCategory,
    minor_priority: params.minorPriority,
    major_priority: params.majorPriority,
    priority_date: priorityDate,
    dueDate: dueDate,
    assignee: params.assignee,
    actions: params.actions,
  };
};

export const buildCaseDetailsTasksFromParams = (
  options: CaseDetailsTasksParamsOptions
): CaseDetailsTaskMock[] => {
  const { caseId, tasks, baseTask } = options;
  return tasks.map((params) => buildTaskDetailsMock(caseId, mapParamsToOverrides(caseId, params), baseTask));
};

export const buildCaseDetailsTasksMinimal = (options: CaseDetailsTasksMinimalOptions): CaseDetailsTaskMock[] => {
  const {
    caseId,
    titles = ['Task 1'],
    states = [],
    types = [],
    taskSystems = [],
    locations = [],
    assignees = [],
    descriptions = [],
  } = options;
  return titles.map((title, index) => {
    const state = states[index] ?? states[0];
    const type = types[index] ?? types[0];
    const taskSystem = taskSystems[index] ?? taskSystems[0];
    const location = locations[index] ?? locations[0];
    const assignee = assignees[index] ?? assignees[0];
    const description = descriptions[index] ?? descriptions[0];
    return buildTaskDetailsMock(caseId, {
      task_title: title,
      task_state: state,
      type,
      task_system: taskSystem,
      location_name: location?.name,
      location: location?.id,
      assignee,
      description,
    });
  });
};
