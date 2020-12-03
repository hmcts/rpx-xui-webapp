
import WorkAllocationConstants from './constants/work-allocation.constants'

export default class WorkAllocationUtils {

  static handleTaskAssignErrorResult(status: Number): String {
    switch(status) {
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