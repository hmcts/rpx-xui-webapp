import type { ManageTasksLiveTask } from './manageTasksLiveSetup';

export function normalizeManageTasksRowText(value: string | undefined): string {
  return (value ?? '').replaceAll(/\s+/g, ' ').trim().toLowerCase();
}

export function findManageTasksLiveTaskRowIndex(rows: Array<Record<string, string>>, task: ManageTasksLiveTask): number {
  const expectedCaseName = normalizeManageTasksRowText(task.caseName);
  const expectedTaskTitle = normalizeManageTasksRowText(task.taskTitle);

  return rows.findIndex(
    (row) =>
      normalizeManageTasksRowText(row['Case name']).includes(expectedCaseName) &&
      normalizeManageTasksRowText(row.Task).includes(expectedTaskTitle)
  );
}

export function buildManageTasksLiveTaskRowFailureMessage({
  rows,
  task,
  viewName,
}: {
  rows: Array<Record<string, string>>;
  task: ManageTasksLiveTask;
  viewName: string;
}): string {
  return (
    `${viewName} should show created case task "${task.taskTitle}" for case "${task.caseName}". ` +
    `Visible rows: ${JSON.stringify(rows.slice(0, 5))}`
  );
}
