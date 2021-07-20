import { of } from 'rxjs';
import { WorkAllocationFeatureService } from './work-allocation-feature.service';

describe('WorkAllocation', () => {
  const mockFeatureToggleService = jasmine.createSpyObj(
    'mockFeatureToggleService',
    ['getValue']
  );

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
