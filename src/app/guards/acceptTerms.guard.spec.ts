import { of } from 'rxjs';
import { TermsConditionsService } from '../services/terms-and-conditions/terms-and-conditions.service';
import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept terms guard', () => {
    let guard: AcceptTermsGuard;
    let mockStore: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        guard = new AcceptTermsGuard(mockStore);
        mockStore.pipe.and.returnValue(of(true));
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });
});
