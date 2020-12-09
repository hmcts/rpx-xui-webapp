import WorkAllocationConstants from './constants/work-allocation.constants';
import WorkAllocationUtils from './work-allocation.utils';

describe('WorkAllocation utilities', () => {
    it('should return the correct url for the specific error response', async () => {

        // first define the statuses of the error responses
        const unexpectedCondition = 500;
        const accessForbidden = 401;
        const authDetailsUnavailable = 403;
        const badRequest = 400;
        const unspecificError = 421;

        // check that a 500 error returns the unexpected condition link
        expect(WorkAllocationUtils.handleTaskAssignErrorResult(unexpectedCondition)).toBe(WorkAllocationConstants.unexpectedConditionErrorLink);
        // check that a 401 and 403 error returns the access forbidden link
        expect(WorkAllocationUtils.handleTaskAssignErrorResult(accessForbidden)).toBe(WorkAllocationConstants.accessForbiddenOrAuthDetailsUnavailableErrorLink);
        expect(WorkAllocationUtils.handleTaskAssignErrorResult(authDetailsUnavailable)).toBe(WorkAllocationConstants.accessForbiddenOrAuthDetailsUnavailableErrorLink);
        // check that any other error returns the bad request link
        expect(WorkAllocationUtils.handleTaskAssignErrorResult(badRequest)).toBe(WorkAllocationConstants.badRequestErrorLink);
        expect(WorkAllocationUtils.handleTaskAssignErrorResult(unspecificError)).toBe(WorkAllocationConstants.badRequestErrorLink);
    });
});
