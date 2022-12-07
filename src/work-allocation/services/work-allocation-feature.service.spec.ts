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
  });
});
