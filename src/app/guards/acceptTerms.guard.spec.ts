import { of } from 'rxjs';
import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept terms guard', () => {
  let guard: AcceptTermsGuard;
  let mockStore: any;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
    guard = new AcceptTermsGuard(mockStore);
  });

  it('is Truthy', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true when terms and conditions feature is disabled', (done: any) => {
      mockStore.pipe.and.returnValue(of(false));

      guard.canActivate().subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockStore.pipe).toHaveBeenCalled();
        done();
      });
    });

    it('should return false when terms and conditions feature is enabled', (done: any) => {
      mockStore.pipe.and.returnValue(of(true));

      guard.canActivate().subscribe((result) => {
        expect(result).toBeFalsy();
        expect(mockStore.pipe).toHaveBeenCalled();
        done();
      });
    });

    it('should return true when an error occurs', (done: any) => {
      mockStore.pipe.and.throwError(new Error('Store error'));

      guard.canActivate().subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockStore.pipe).toHaveBeenCalled();
        done();
      });
    });

    it('should call store.pipe with select', () => {
      mockStore.pipe.and.returnValue(of(false));

      guard.canActivate();

      expect(mockStore.pipe).toHaveBeenCalled();
      // The select operator creates an operator with the name 'selectOperator'
      expect(mockStore.pipe.calls.argsFor(0)[0].name).toBe('selectOperator');
    });

    it('should handle multiple sequential calls correctly', (done: any) => {
      mockStore.pipe.and.returnValue(of(false));

      let callCount = 0;

      guard.canActivate().subscribe(() => {
        callCount++;
        if (callCount === 1) {
          mockStore.pipe.and.returnValue(of(true));

          guard.canActivate().subscribe((result) => {
            expect(result).toBeFalsy();
            expect(mockStore.pipe).toHaveBeenCalledTimes(2);
            done();
          });
        }
      });
    });
  });
});
