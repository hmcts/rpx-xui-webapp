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
  console.log('Case IDs by type:', caseIdsByType);
  const hearingDatesByType = new Map<string, Map<string, Task['next_hearing_date']>>();
  console.log('Initialized hearingDatesByType:', hearingDatesByType);
  await Promise.all(
    Array.from(caseIdsByType, async ([caseType, caseIds]) => {
      const hearingDates = new Map<string, Task['next_hearing_date']>();
      hearingDatesByType.set(caseType, hearingDates);
      console.log(`Initialized hearingDates for caseType ${caseType}:`, hearingDates);
      const queries = constructElasticSearchQuery(Array.from(caseIds), 0, 200);
      await Promise.all(
        queries.map(async (query) => {
          try {
            const result = await searchCasesById(caseType, query, req);
            console.log(`Search result for query:`, result);
            const targetCase = result?.cases?.find(
              (item) => String(item.id) === '1782984689686332'
            );

            console.log(
              'Case 1782984689686332:',
              JSON.stringify(targetCase, null, 2)
            );
            console.log('Case 1782984689686332 ends here:')
            for (const caseDetail of result?.cases || []) {
              hearingDates.set(String(caseDetail.id), caseDetail.case_data?.nextHearingDetails?.hearingDateTime ?? null);
              console.log(`Set hearing date for case ${caseDetail.id}:`, hearingDates.get(String(caseDetail.id)));
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
