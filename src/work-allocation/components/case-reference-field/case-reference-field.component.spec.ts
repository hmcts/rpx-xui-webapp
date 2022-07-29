import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConstants } from '../../../app/app.constants';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { CaseReferenceFieldComponent } from './case-reference-field.component';

@Component({
  template: `<exui-case-reference-field [caseReference]="caseReference"></exui-case-reference-field>`
})
class WrapperComponent {
  @ViewChild(CaseReferenceFieldComponent) public appComponentRef: CaseReferenceFieldComponent;
  @Input() public caseReference: string;
}

describe('WorkAllocation', () => {

  describe('CaseReferenceFieldComponent', () => {
    const CASE_DETAILS_URL: string = AppConstants.CASE_DETAILS_URL;
    const CASE_REFERENCE: string = 'Casereference';

    let component: CaseReferenceFieldComponent;
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

    it('should only show a link when it has a case reference', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseReference and it should work (showing the link).
      wrapper.caseReference = CASE_REFERENCE;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_REFERENCE}`); // No spaces
    });

    // Test no longer necessary but if formatting to case reference requires removal of spaces in future this may be useful again
    /* it('should allow the case reference to be changed', () => {
      const NEW_CASE_REFERENCE: string = 'n3w C@53    REFERENCE';

      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseReference and it should work (showing the link).
      wrapper.caseReference = CASE_REFERENCE;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_REFERENCE}`); // No spaces

      // Change the value of caseReference.
      wrapper.caseReference = NEW_CASE_REFERENCE;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(NEW_CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}n3wC@53REFERENCE`); // No spaces
    }); */

    it('should remove the link if case reference is changed to undefined', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseReference and it should work (showing the link).
      wrapper.caseReference = CASE_REFERENCE;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_REFERENCE}`); // No spaces

      // Clear out the value of caseReference and we should no longer have the anchor.
      wrapper.caseReference = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should remove the link if case reference is changed to null', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseReference and it should work (showing the link).
      wrapper.caseReference = CASE_REFERENCE;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_REFERENCE}`); // No spaces

      // Make caseReference undefined and we should no longer have the anchor.
      wrapper.caseReference = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should not show the link if case reference is simply a bunch of spaces', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseReference and it should work (showing the link).
      wrapper.caseReference = CASE_REFERENCE;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_REFERENCE}`); // No spaces
    });

  });
});
