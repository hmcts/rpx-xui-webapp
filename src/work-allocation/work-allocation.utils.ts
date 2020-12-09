
import WorkAllocationConstants from './constants/work-allocation.constants';

export default class WorkAllocationUtils {

  public static handleTaskAssignErrorResult(status: number): string {
    switch (status) {
      case 500: {
        return WorkAllocationConstants.unexpectedConditionErrorLink;
      }
      case 401: {
        return WorkAllocationConstants.accessForbiddenOrAuthDetailsUnavailableErrorLink;
      }
      case 403: {
        return WorkAllocationConstants.accessForbiddenOrAuthDetailsUnavailableErrorLink;
      }
      default: {
        return WorkAllocationConstants.badRequestErrorLink;
      }
    }
  }

}
