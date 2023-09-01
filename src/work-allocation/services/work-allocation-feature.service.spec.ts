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
      mockFeatureToggleService.getValue.and.returnValue(of({
        configurations: [
          {
            caseTypes: [
              'TestAddressBookCase'
            ],
            releaseVersion: '3.5',
            serviceName: 'TEST'
          }
        ]
      }
      ));
      service.getActiveWAFeature('TEST', 'TestAddressBookCase').subscribe((activeWAFeature) => expect(activeWAFeature).toBeDefined());
    });
  });
});
