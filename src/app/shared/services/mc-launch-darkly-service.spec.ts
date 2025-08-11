import { TestBed } from '@angular/core/testing';
import { LaunchDarklyService } from '@hmcts/rpx-xui-common-lib';
import { McLaunchDarklyService, MCLAUNCHDARKLYKEY } from './mc-launch-darkly-service';

describe('McLaunchDarklyService', () => {
  let service: McLaunchDarklyService;
  const mockLaunchDarklyKey = 'test-launch-darkly-key';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        McLaunchDarklyService,
        { provide: MCLAUNCHDARKLYKEY, useValue: mockLaunchDarklyKey }
      ]
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('constructor', () => {
    it('should create an instance successfully', () => {
      service = TestBed.inject(McLaunchDarklyService);
      expect(service).toBeTruthy();
      expect(service).toBeInstanceOf(McLaunchDarklyService);
    });

    it('should inject MCLAUNCHDARKLYKEY token', () => {
      const injectedKey = TestBed.inject(MCLAUNCHDARKLYKEY);
      expect(injectedKey).toBe(mockLaunchDarklyKey);
    });
  });

  describe('rootGuard method', () => {
    it('should be called during construction', () => {
      spyOn<any>(McLaunchDarklyService.prototype, 'rootGuard');
      service = TestBed.inject(McLaunchDarklyService);
      expect(McLaunchDarklyService.prototype['rootGuard']).toHaveBeenCalledWith(LaunchDarklyService);
    });

    it('should not throw error when no parent instance exists', () => {
      expect(() => {
        service = TestBed.inject(McLaunchDarklyService);
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle null or undefined key gracefully', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          McLaunchDarklyService,
          { provide: MCLAUNCHDARKLYKEY, useValue: null }
        ]
      });

      expect(() => {
        service = TestBed.inject(McLaunchDarklyService);
      }).not.toThrow();
    });

    it('should handle empty string key', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          McLaunchDarklyService,
          { provide: MCLAUNCHDARKLYKEY, useValue: '' }
        ]
      });

      expect(() => {
        service = TestBed.inject(McLaunchDarklyService);
      }).not.toThrow();
    });
  });

  describe('injection token', () => {
    it('should have correct token name', () => {
      expect(MCLAUNCHDARKLYKEY.toString()).toBe('InjectionToken LAUNCHDARKLYKEY');
    });
  });
});
