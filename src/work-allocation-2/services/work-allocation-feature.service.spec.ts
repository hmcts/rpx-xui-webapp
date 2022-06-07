import { of } from 'rxjs';
import { WorkAllocationFeatureService } from './work-allocation-feature.service';

// Check testing
describe('WorkAllocation', () => {
  const mockFeatureToggleService = jasmine.createSpyObj(
    'mockFeatureToggleService',
    ['getValue']
  );

  // Check testing
  describe('WorkAllocationFeatureService', () => {
    it('should be Truthy', () => {
      const service = new WorkAllocationFeatureService(
        mockFeatureToggleService
      );
      expect(service).toBeTruthy();
    });

    it('getFeatureName should call getValue', () => {
      const service = new WorkAllocationFeatureService(
        mockFeatureToggleService
      );
      mockFeatureToggleService.getValue.and.returnValue(of('WAFeature1'));
      service.getActiveWAFeature().subscribe(activeWAFeature => expect(activeWAFeature).toEqual('WAFeature1'));
    });
  });
});
