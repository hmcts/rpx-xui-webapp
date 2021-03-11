import {NextFunction, Response} from 'express';
import {EnhancedRequest} from '../lib/models';
import {baseWorkAllocationTaskUrl, retrieveAllCaseWorkers} from '../workAllocation';
import {Caseworker} from '../workAllocation/interfaces/task';
import {handleTaskSearch} from '../workAllocation/taskService';
import {assignActionsToTasks, prepareSearchTaskUrl} from '../workAllocation/util';

export async function searchTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const postTaskPath: string = prepareSearchTaskUrl(baseWorkAllocationTaskUrl);
    const searchRequest = req.body.searchRequest;
    const { status, data } = await handleTaskSearch(postTaskPath, searchRequest, req);
    res.status(status);
    // Assign actions to the tasks on the data from the API.
    if (data) {
      const caseworkers: Caseworker[] = await retrieveAllCaseWorkers(req, res);
      assignActionsToTasks(data.tasks, req.body.view, caseworkers);
    }

    // Send the (possibly modified) data back in the Response.
    res.send(data);
  } catch (error) {
    next(error);
  }
}
