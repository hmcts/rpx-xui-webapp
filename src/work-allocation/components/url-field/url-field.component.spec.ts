import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { UrlFieldComponent } from './url-field.component';

@Component({
  template: `<exui-url-field [href]="href" [label]="label" [target]="target"></exui-url-field>`
})
class WrapperComponent {
  @ViewChild(UrlFieldComponent) public appComponentRef: UrlFieldComponent;
  @Input() public href: string;
  @Input() public label: string;
  @Input() public target: string;
}

describe('WorkAllocation', () => {

  describe('UrlFieldComponent', () => {
    let component: UrlFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    it('should show only if there is a link', () => {
      // Expect the nativeElement to be empty (no link yet)
      expect(fixture.debugElement.nativeElement.innerText).toBe('');


      // Set up the href
      const HMCTS_URL: string = 'http://hmcts.gov.uk';

      // Add the href and it should now be available
      component.href = HMCTS_URL;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(HMCTS_URL);

      // Remove the href and it should no longer display
      component.href = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add the href again and it should be available
      component.href = HMCTS_URL;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(HMCTS_URL);

      // Set the href to null and it should no longer display
      component.href = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should allow replacing a link', () => {
      // Expect the nativeElement to be empty (no link yet)
      expect(fixture.debugElement.nativeElement.innerText).toBe('');


      // Set up the href
      const HMCTS_URL: string = 'http://hmcts.gov.uk';
      const GOOGLE_URL: string = 'http://google.co.uk';

      // Add the href and it should now be available
      component.href = HMCTS_URL;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(HMCTS_URL);

      // Replace the href and it should no longer display
      component.href = GOOGLE_URL;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(GOOGLE_URL);

      // Add the href again and it should be available
      component.href = HMCTS_URL;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(HMCTS_URL);

    });

    it('should show the label if the label and href is provided', () => {
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      const label: string = 'Example label';
      const HMCTS_URL: string = 'http://hmcts.gov.uk';


      // Add the label and make sure it does not display
      component.label = label;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Set the href so that the label will show
      component.href = HMCTS_URL;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(label);

      // Remove href and label should no longer display
      component.href = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should allow a target string to be applied', () => {
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      const initial: string = '_self';
      const target: string = 'Example label';
      const HMCTS_URL: string = 'http://hmcts.gov.uk';


      // Verify HTML object does not yet exist
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).toBeNull();

      // Set the href and initial value so that the default target string is applied
      component.href = HMCTS_URL;
      component.target = initial;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(HMCTS_URL);
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.getAttribute('target')).toBe(initial);

      // Set target and test value
      component.target = target;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(HMCTS_URL);
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.getAttribute('target')).toBe(target);

      // Remove href and check again
      component.href = undefined;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).toBeNull();
    });

  });
});
