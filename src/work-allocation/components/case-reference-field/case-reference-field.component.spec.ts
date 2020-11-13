import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

    it('should handle a CASE_REFERENCE type', () => {
      const FIRST_CASE_REFERENCE: string = 'First case reference';
      const SECOND_CASE_REFERENCE: string = 'sEc0nd C@53 REFERENCE';

      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseReference and it should work (showing the link).
      wrapper.caseReference = FIRST_CASE_REFERENCE;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(FIRST_CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/Firstcasereference`); // No spaces

      // Change the value of caseReference.
      wrapper.caseReference = SECOND_CASE_REFERENCE;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(SECOND_CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/sEc0ndC@53REFERENCE`); // No spaces

      // Clear out the value of caseReference and we should no longer have the anchor.
      wrapper.caseReference = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      wrapper.caseReference = FIRST_CASE_REFERENCE;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(FIRST_CASE_REFERENCE);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/Firstcasereference`); // No spaces

      // Make caseReference null.
      wrapper.caseReference = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

  });
});
