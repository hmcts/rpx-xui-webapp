import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfigurationModel } from '../../models/configuration.model';
import { AppConfigService } from '../../services/config/configuration.services';
import { FeatureToggleDirective } from './feature-toggle.directive';

// Test component that uses the directive
@Component({
  standalone: false,
  template: `
    <div>
      <p *exuiFeatureToggle="'testFeature'" id="test-element">Feature content</p>
      <p *exuiFeatureToggle="'anotherFeature'" id="another-element">Another feature</p>
      <p *exuiFeatureToggle="'undefinedFeature'" id="undefined-element">Undefined feature</p>
    </div>
  `

})
class TestComponent {}

describe('FeatureToggleDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let mockAppConfigService: jasmine.SpyObj<AppConfigService>;
  let mockConfig: any;

  beforeEach(() => {
    mockAppConfigService = jasmine.createSpyObj('AppConfigService', ['getFeatureToggle']);
    mockConfig = {};

    TestBed.configureTestingModule({
      declarations: [TestComponent, FeatureToggleDirective],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  describe('when feature is enabled', () => {
    it('should display the element when feature is explicitly enabled', () => {
      mockConfig = {
        testFeature: { isEnabled: true }
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('#test-element'));
      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent).toBe('Feature content');
    });

    it('should display the element when feature is not in config (default enabled)', () => {
      mockConfig = {};
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('#undefined-element'));
      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent).toBe('Undefined feature');
    });
  });

  describe('when feature is disabled', () => {
    it('should not display the element when feature is explicitly disabled', () => {
      mockConfig = {
        testFeature: { isEnabled: false }
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('#test-element'));
      expect(element).toBeFalsy();
    });
  });

  describe('multiple features', () => {
    it('should handle multiple features with different states', () => {
      mockConfig = {
        testFeature: { isEnabled: true },
        anotherFeature: { isEnabled: false }
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      const enabledElement = fixture.debugElement.query(By.css('#test-element'));
      const disabledElement = fixture.debugElement.query(By.css('#another-element'));
      const undefinedElement = fixture.debugElement.query(By.css('#undefined-element'));

      expect(enabledElement).toBeTruthy();
      expect(disabledElement).toBeFalsy();
      expect(undefinedElement).toBeTruthy(); // Default is enabled
    });
  });

  describe('edge cases', () => {
    it('should handle null config from service', () => {
      mockAppConfigService.getFeatureToggle.and.returnValue(null);

      fixture.detectChanges();

      // All elements should be visible when config is null (defaults to enabled)
      const testElement = fixture.debugElement.query(By.css('#test-element'));
      const anotherElement = fixture.debugElement.query(By.css('#another-element'));
      const undefinedElement = fixture.debugElement.query(By.css('#undefined-element'));

      expect(testElement).toBeTruthy();
      expect(anotherElement).toBeTruthy();
      expect(undefinedElement).toBeTruthy();
    });

    it('should handle undefined config from service', () => {
      mockAppConfigService.getFeatureToggle.and.returnValue(undefined);

      fixture.detectChanges();

      // All elements should be visible when config is undefined (defaults to enabled)
      const testElement = fixture.debugElement.query(By.css('#test-element'));
      expect(testElement).toBeTruthy();
    });

    it('should handle feature config without isEnabled property', () => {
      mockConfig = {
        testFeature: {} as any // Feature exists but no isEnabled property
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('#test-element'));
      expect(element).toBeFalsy(); // Should be hidden when isEnabled is falsy
    });
  });

  describe('directive instance methods', () => {
    it('should call appConfigService.getFeatureToggle on initialization', () => {
      mockConfig = {};
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      expect(mockAppConfigService.getFeatureToggle).toHaveBeenCalled();
    });

    it('should create embedded view when feature is enabled', () => {
      mockConfig = {
        testFeature: { isEnabled: true }
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      // Check that the element with the directive is rendered
      const element = fixture.debugElement.query(By.css('#test-element'));
      expect(element).toBeTruthy();
    });
  });

  describe('isEnabled method', () => {
    let directive: FeatureToggleDirective;
    let mockTemplateRef: any;
    let mockViewContainer: jasmine.SpyObj<any>;

    beforeEach(() => {
      mockTemplateRef = {};
      mockViewContainer = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
      directive = new FeatureToggleDirective(mockTemplateRef, mockViewContainer, mockAppConfigService);
    });

    it('should return true when feature is not in config', () => {
      directive.config = {} as any;
      directive.exuiFeatureToggle = 'nonExistentFeature';

      expect(directive.isEnabled()).toBe(true);
    });

    it('should return true when feature is enabled', () => {
      directive.config = {
        myFeature: { isEnabled: true }
      } as any;
      directive.exuiFeatureToggle = 'myFeature';

      expect(directive.isEnabled()).toBe(true);
    });

    it('should return false when feature is disabled', () => {
      directive.config = {
        myFeature: { isEnabled: false }
      } as any;
      directive.exuiFeatureToggle = 'myFeature';

      expect(directive.isEnabled()).toBe(false);
    });

    it('should return false when feature exists but isEnabled is undefined', () => {
      directive.config = {
        myFeature: {} as any
      } as any;
      directive.exuiFeatureToggle = 'myFeature';

      expect(directive.isEnabled()).toBeFalsy();
    });
  });

  describe('dynamic feature toggle changes', () => {
    it('should not re-render when config changes after initialization', () => {
      mockConfig = {
        testFeature: { isEnabled: true }
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      fixture.detectChanges();

      let element = fixture.debugElement.query(By.css('#test-element'));
      expect(element).toBeTruthy();

      // Change config after initialization
      mockConfig.testFeature.isEnabled = false;
      fixture.detectChanges();

      // Element should still be visible as directive only checks on init
      element = fixture.debugElement.query(By.css('#test-element'));
      expect(element).toBeTruthy();
    });
  });

  describe('template syntax variations', () => {
    @Component({
      standalone: false,

      template: `
        <div *exuiFeatureToggle="featureName">
          Dynamic feature name content
        </div>
      `

    })
    class DynamicTestComponent {
      featureName = 'dynamicFeature';
    }

    it('should work with dynamic feature names', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [DynamicTestComponent, FeatureToggleDirective],
        providers: [
          { provide: AppConfigService, useValue: mockAppConfigService }
        ]
      });

      mockConfig = {
        dynamicFeature: { isEnabled: true }
      };
      mockAppConfigService.getFeatureToggle.and.returnValue(mockConfig);

      const dynamicFixture = TestBed.createComponent(DynamicTestComponent);
      dynamicFixture.detectChanges();

      const element = dynamicFixture.debugElement.query(By.css('div'));
      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent.trim()).toBe('Dynamic feature name content');
    });
  });

  describe('error handling', () => {
    it('should handle errors from appConfigService gracefully', () => {
      mockAppConfigService.getFeatureToggle.and.throwError('Service error');

      expect(() => {
        fixture.detectChanges();
      }).toThrow();
    });
  });

  describe('ViewContainer operations', () => {
    let directive: FeatureToggleDirective;
    let mockTemplateRef: any;
    let mockViewContainer: jasmine.SpyObj<any>;

    beforeEach(() => {
      mockTemplateRef = {};
      mockViewContainer = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
      directive = new FeatureToggleDirective(mockTemplateRef, mockViewContainer, mockAppConfigService);
    });

    it('should call createEmbeddedView when feature is enabled', () => {
      mockAppConfigService.getFeatureToggle.and.returnValue({
        testFeature: { isEnabled: true }
      });
      directive.exuiFeatureToggle = 'testFeature';

      directive.ngOnInit();

      expect(mockViewContainer.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
      expect(mockViewContainer.clear).not.toHaveBeenCalled();
    });

    it('should call clear when feature is disabled', () => {
      mockAppConfigService.getFeatureToggle.and.returnValue({
        testFeature: { isEnabled: false }
      });
      directive.exuiFeatureToggle = 'testFeature';

      directive.ngOnInit();

      expect(mockViewContainer.clear).toHaveBeenCalled();
      expect(mockViewContainer.createEmbeddedView).not.toHaveBeenCalled();
    });
  });
});
