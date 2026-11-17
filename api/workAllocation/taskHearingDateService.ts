import * as log4jui from '../lib/log4jui';
import { EnhancedRequest } from '../lib/models';
import { Task } from './interfaces/task';
import { constructElasticSearchQuery, searchCasesById } from './util';

const logger = log4jui.getLogger('task-hearing-date-service');

export async function setTaskHearingDatesFromCases(tasks: Task[], req: EnhancedRequest): Promise<Task[]> {
  const caseIdsByType = new Map<string, Set<string>>();
  for (const task of tasks) {
    if (task.case_type_id && task.case_id) {
      if (!caseIdsByType.has(task.case_type_id)) {
        caseIdsByType.set(task.case_type_id, new Set());
      }
      caseIdsByType.get(task.case_type_id).add(String(task.case_id));
    }
  }
  const hearingDatesByType = new Map<string, Map<string, Task['next_hearing_date']>>();
  await Promise.all(
    Array.from(caseIdsByType, async ([caseType, caseIds]) => {
      const hearingDates = new Map<string, Task['next_hearing_date']>();
      hearingDatesByType.set(caseType, hearingDates);
      const queries = constructElasticSearchQuery(Array.from(caseIds), 0, 200);
      await Promise.all(
        queries.map(async (query) => {
          try {
            const result = await searchCasesById(caseType, query, req);
            for (const caseDetail of result?.cases || []) {
              hearingDates.set(String(caseDetail.id), caseDetail.case_data?.nextHearingDetails?.hearingDateTime ?? null);
            }
          } catch {
            logger.warn('Unable to retrieve CCD hearing dates for tasks');
          }
        })
      );
    })
  );

  return tasks.map((task) => ({
    ...task,
    next_hearing_date: hearingDatesByType.get(task.case_type_id)?.get(String(task.case_id)) ?? null,
  }));
}
