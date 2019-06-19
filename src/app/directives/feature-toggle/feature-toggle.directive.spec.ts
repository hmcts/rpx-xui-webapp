import {TestBed, ComponentFixture} from '@angular/core/testing';
import {FeatureToggleDirective} from './feature-toggle.directive';
import { Component, DebugElement, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppConfigService } from 'src/app/services/config/configuration.services';

const mockTemplateRef = jasmine.createSpyObj(['createEmbeddedView']);
const mockAppAppConfigService = jasmine.createSpyObj(['load', 'setConfiguration', 'getFeatureToggle', 'getEditorConfiguration',
'getRoutesConfig']);

@Component({
    template: `<input type="text" exuiFeatureToggle>`
})
class TestExuiFeatureToggleTestComponent {
}

describe('Directive: exuiFeatureToggle', () => {

    let component: TestExuiFeatureToggleTestComponent;
    let fixture: ComponentFixture<TestExuiFeatureToggleTestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestExuiFeatureToggleTestComponent, FeatureToggleDirective],
            providers: [
              {provide: TemplateRef, useValue: mockTemplateRef},
              {provide: AppConfigService, useValue: mockAppAppConfigService}
          ]
        });
    });

    it('Feature Toggle component Truthy', () => {
      fixture = TestBed.createComponent(TestExuiFeatureToggleTestComponent);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('Feature Toggle component should have Directive', () => {
      fixture = TestBed.createComponent(TestExuiFeatureToggleTestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(FeatureToggleDirective));
      expect(directiveEl).not.toBeNull();
    });
});
