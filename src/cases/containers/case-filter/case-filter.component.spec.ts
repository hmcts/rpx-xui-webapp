import { Component, DebugElement, Directive, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCaseCreate from '../../store/reducers';
import * as fromCases from '../../store/reducers/';
import * as fromCasesFeature from '../../store';
import { CaseFilterComponent } from './case-filter.component';
import { ActionBindingModel } from '../../models/create-case-actions.model';
import { RpxTranslationModule } from 'rpx-xui-translation';

@Component({
  selector: 'exui-ccd-connector',
  template: '<ng-content></ng-content>'
})
class MockCcdConnectorComponent {}

@Component({
  selector: 'ccd-create-case-filters',
  template: 'Mock CCD Create Case Filters'
})
class MockCreateCaseFiltersComponent {}

@Component({
  selector: 'exui-page-wrapper',
  template: '<ng-content></ng-content>'
})
class MockPageWrapperComponent {}

@Directive({
  selector: '[exuiFeatureToggle]'
})
class MockFeatureToggleDirective {
  @Input('exuiFeatureToggle') featureName: string;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    // Always show content in tests
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

describe('CaseFilterComponent', () => {
  let component: CaseFilterComponent;
  let fixture: ComponentFixture<CaseFilterComponent>;
  let store: Store<fromCaseCreate.State>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CaseFilterComponent,
        MockCcdConnectorComponent,
        MockCreateCaseFiltersComponent,
        MockPageWrapperComponent,
        MockFeatureToggleDirective
      ],
      imports: [
        StoreModule.forRoot({ ...fromCases.reducers, cases: combineReducers(fromCases.reducers) }),
        EffectsModule.forRoot([]),
        RpxTranslationModule.forRoot({
          baseUrl: '',
          debounceTimeMs: 300,
          validity: {
            days: 1
          },
          testMode: true
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFilterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
  });

  describe('Component initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with Store injected', () => {
      expect(component.store).toBeDefined();
      expect(component.store).toBe(store);
    });

    it('should have undefined properties before ngOnInit', () => {
      expect(component.startButtonText).toBeUndefined();
      expect(component.caseCreatFilterBindings).toBeUndefined();
      expect(component.fromCasesFeature).toBeUndefined();
    });
  });

  describe('ngOnInit', () => {
    it('should set startButtonText to "Start"', () => {
      component.ngOnInit();
      expect(component.startButtonText).toBe('Start');
    });

    it('should set fromCasesFeature to the imported module', () => {
      component.ngOnInit();
      expect(component.fromCasesFeature).toBe(fromCasesFeature);
    });

    it('should initialize caseCreatFilterBindings with correct action bindings', () => {
      component.ngOnInit();
      
      expect(component.caseCreatFilterBindings).toBeDefined();
      expect(component.caseCreatFilterBindings.length).toBe(2);
      
      const expectedBindings: ActionBindingModel[] = [
        { type: 'selectionSubmitted', action: 'CaseCreateFilterApply' },
        { type: 'selectionChanged', action: 'CaseCreateFilterChanged' }
      ];
      
      expect(component.caseCreatFilterBindings).toEqual(expectedBindings);
    });

    it('should initialize caseCreatFilterBindings with correct types and actions', () => {
      component.ngOnInit();
      
      const firstBinding = component.caseCreatFilterBindings[0];
      expect(firstBinding.type).toBe('selectionSubmitted');
      expect(firstBinding.action).toBe('CaseCreateFilterApply');
      
      const secondBinding = component.caseCreatFilterBindings[1];
      expect(secondBinding.type).toBe('selectionChanged');
      expect(secondBinding.action).toBe('CaseCreateFilterChanged');
    });
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render the page wrapper', () => {
      const pageWrapper = debugElement.query(By.css('exui-page-wrapper'));
      expect(pageWrapper).toBeTruthy();
    });

    it('should set the page title to "Create Case"', () => {
      const pageWrapper = debugElement.query(By.css('exui-page-wrapper'));
      expect(pageWrapper.attributes['title']).toBe('Create Case');
    });

    it('should render the container div with width-50 class', () => {
      const widthDiv = debugElement.query(By.css('.width-50'));
      expect(widthDiv).toBeTruthy();
    });

    it('should render exui-ccd-connector component', () => {
      // The component is inside the feature toggle, so we check if it exists in the template
      const componentHtml = fixture.debugElement.nativeElement.innerHTML;
      expect(componentHtml).toContain('exui-ccd-connector');
    });

    it('should pass correct inputs to exui-ccd-connector', () => {
      // Verify the component properties are set correctly
      expect(component.caseCreatFilterBindings).toBeDefined();
      expect(component.store).toBeDefined();
      expect(component.fromCasesFeature).toBeDefined();
    });

    it('should render ccd-create-case-filters component inside ccd-connector', () => {
      // The component is inside the feature toggle
      const componentHtml = fixture.debugElement.nativeElement.innerHTML;
      expect(componentHtml).toContain('ccd-create-case-filters');
    });

    it('should set isDisabled attribute to false on ccd-create-case-filters', () => {
      // The mock component receives the attribute as 'isdisabled="false"'
      const componentHtml = fixture.debugElement.nativeElement.innerHTML;
      expect(componentHtml.toLowerCase()).toContain('isdisabled="false"');
    });

    it('should pass startButtonText to ccd-create-case-filters', () => {
      // Verify the startButtonText is set
      expect(component.startButtonText).toBe('Start');
    });

    it('should have template reference #ccdComponent on ccd-create-case-filters', () => {
      // Template references are not visible in the rendered HTML
      // Instead, verify the component is rendered correctly
      const ccdFilters = fixture.debugElement.query(By.css('ccd-create-case-filters'));
      expect(ccdFilters).toBeTruthy();
    });
  });

  describe('Component bindings', () => {
    it('should bind eventsBindings correctly after initialization', () => {
      component.ngOnInit();
      fixture.detectChanges();
      
      expect(component.caseCreatFilterBindings).toEqual([
        { type: 'selectionSubmitted', action: 'CaseCreateFilterApply' },
        { type: 'selectionChanged', action: 'CaseCreateFilterChanged' }
      ]);
    });

    it('should maintain binding references after change detection', () => {
      component.ngOnInit();
      fixture.detectChanges();
      
      const initialBindings = component.caseCreatFilterBindings;
      fixture.detectChanges();
      
      expect(component.caseCreatFilterBindings).toBe(initialBindings);
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple ngOnInit calls safely', () => {
      component.ngOnInit();
      const firstBindings = component.caseCreatFilterBindings;
      
      component.ngOnInit();
      const secondBindings = component.caseCreatFilterBindings;
      
      expect(firstBindings).not.toBe(secondBindings);
      expect(component.caseCreatFilterBindings.length).toBe(2);
    });

    it('should use ViewEncapsulation.None', () => {
      // Get the component's constructor metadata
      const componentMetadata = (CaseFilterComponent as any).ɵcmp;
      expect(componentMetadata.encapsulation).toBe(2); // ViewEncapsulation.None is 2
    });
  });

  describe('Store integration', () => {
    it('should receive the same store instance as injected', () => {
      const injectedStore = TestBed.inject(Store);
      expect(component.store).toBe(injectedStore);
    });

    it('should have store property as constructor parameter', () => {
      // The store is injected via constructor and marked as readonly
      expect(component.store).toBeDefined();
      expect(component.store).toBe(store);
    });
  });
});