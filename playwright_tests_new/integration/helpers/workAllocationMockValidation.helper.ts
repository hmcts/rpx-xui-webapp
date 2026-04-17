type ValidationError = string;

type TaskLike = Record<string, unknown>;

type RequiredFieldDefinition = {
  key: string;
  ticketField: string;
  validate: (value: unknown) => boolean;
  expected: string;
};

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const ISO_DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
const isIsoDateString = (value: unknown): value is string =>
  isNonEmptyString(value) && ISO_DATE_TIME_REGEX.test(value) && !Number.isNaN(Date.parse(value));

const mandatoryTaskFields: RequiredFieldDefinition[] = [
  { key: 'id', ticketField: 'task_id', validate: isNonEmptyString, expected: 'a non-empty string' },
  { key: 'name', ticketField: 'task_name', validate: isNonEmptyString, expected: 'a non-empty string' },
  { key: 'type', ticketField: 'task_type', validate: isNonEmptyString, expected: 'a non-empty string' },
  { key: 'due_date', ticketField: 'due_date_time', validate: isIsoDateString, expected: 'an ISO date-time string' },
  {
    key: 'security_classification',
    ticketField: 'security_classification',
    validate: isNonEmptyString,
    expected: 'a non-empty string',
  },
  { key: 'task_title', ticketField: 'title', validate: isNonEmptyString, expected: 'a non-empty string' },
  { key: 'minor_priority', ticketField: 'priorities.minor_priority', validate: isFiniteNumber, expected: 'a finite number' },
  { key: 'major_priority', ticketField: 'priorities.major_priority', validate: isFiniteNumber, expected: 'a finite number' },
  {
    key: 'priority_date',
    ticketField: 'priorities.priority_date',
    validate: isIsoDateString,
    expected: 'an ISO date-time string',
  },
  { key: 'role_category', ticketField: 'role_attributes.role_category', validate: isNonEmptyString, expected: 'a non-empty string' },
  { key: 'case_id', ticketField: 'case_attributes.case_id', validate: isNonEmptyString, expected: 'a non-empty string' },
  { key: 'case_name', ticketField: 'case_attributes.case_name', validate: isNonEmptyString, expected: 'a non-empty string' },
  {
    key: 'case_category',
    ticketField: 'case_attributes.case_category',
    validate: isNonEmptyString,
    expected: 'a non-empty string',
  },
  {
    key: 'case_type_id',
    ticketField: 'case_attributes.case_type_id',
    validate: isNonEmptyString,
    expected: 'a non-empty string',
  },
  {
    key: 'jurisdiction',
    ticketField: 'case_attributes.jurisdiction',
    validate: isNonEmptyString,
    expected: 'a non-empty string',
  },
  { key: 'location', ticketField: 'location_attributes.location', validate: isNonEmptyString, expected: 'a non-empty string' },
  {
    key: 'location_name',
    ticketField: 'location_attributes.location_name',
    validate: isNonEmptyString,
    expected: 'a non-empty string',
  },
  { key: 'work_type_id', ticketField: 'work_type.id', validate: isNonEmptyString, expected: 'a non-empty string' },
  {
    key: 'work_type_label',
    ticketField: 'work_type.label',
    validate: isNonEmptyString,
    expected: 'a non-empty string',
  },
];

function collectTaskErrors(task: unknown, taskPath: string): ValidationError[] {
  if (!isObject(task)) {
    return [`${taskPath} must be an object containing the mandatory Work Allocation task attributes.`];
  }

  const taskRecord = task as TaskLike;

  return mandatoryTaskFields.flatMap((field) => {
    if (field.validate(taskRecord[field.key])) {
      return [];
    }

    return `${taskPath}.${field.key} must be ${field.expected} for ${field.ticketField}.`;
  });
}

function buildValidationError(scope: string, errors: ValidationError[]): Error {
  return new Error(`Mock Work Allocation ${scope} failed mandatory attribute validation:\n- ${errors.join('\n- ')}`);
}

export function getWorkAllocationTaskListValidationErrors(taskListResponse: unknown): ValidationError[] {
  if (!isObject(taskListResponse)) {
    return ['task list response must be an object containing a tasks array.'];
  }

  const taskList = taskListResponse as { tasks?: unknown; total_records?: unknown };
  const errors: ValidationError[] = [];

  if (!Array.isArray(taskList.tasks)) {
    errors.push('task list response.tasks must be an array.');
  } else {
    taskList.tasks.forEach((task, index) => {
      errors.push(...collectTaskErrors(task, `tasks[${index}]`));
    });
  }

  if (!isFiniteNumber(taskList.total_records)) {
    errors.push('task list response.total_records must be a finite number.');
  }

  return errors;
}

export function assertValidWorkAllocationTaskListMock(taskListResponse: unknown): void {
  const errors = getWorkAllocationTaskListValidationErrors(taskListResponse);

  if (errors.length > 0) {
    throw buildValidationError('task list response', errors);
  }
}

export function getWorkAllocationCaseTaskValidationErrors(caseTaskResponse: unknown): ValidationError[] {
  if (!Array.isArray(caseTaskResponse)) {
    return ['case task response must be an array of task objects.'];
  }

  return caseTaskResponse.flatMap((task, index) => collectTaskErrors(task, `caseTasks[${index}]`));
}

export function assertValidWorkAllocationCaseTaskMock(caseTaskResponse: unknown): void {
  const errors = getWorkAllocationCaseTaskValidationErrors(caseTaskResponse);

  if (errors.length > 0) {
    throw buildValidationError('case task response', errors);
  }
}
