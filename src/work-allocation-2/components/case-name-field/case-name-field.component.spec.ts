import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConstants } from '../../../app/app.constants';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { CaseNameFieldComponent } from './case-name-field.component';

@Component({
  template: `<exui-case-name-field [caseName]="caseName" [caseId]="caseId"></exui-case-name-field>`
})
class WrapperComponent {
  @ViewChild(CaseNameFieldComponent) public appComponentRef: CaseNameFieldComponent;
  @Input() public caseName: string;
  @Input() public caseId: string;
}

describe('WorkAllocation', () => {

  describe('CaseNameFieldComponent', () => {
    const CASE_DETAILS_URL: string = AppConstants.CASE_DETAILS_URL;
    const CASE_NAME: string = 'Casename';
    const CASE_ID: string = 'CaseId';

    let component: CaseNameFieldComponent;
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

    it('should only show a link when it has a case id', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseName and it should work (showing the link).
      wrapper.caseName = CASE_NAME;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_ID}`); // No spaces
    });

    it('should remove the link if case id is changed to undefined', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseId and it should work (showing the link).
      wrapper.caseName = CASE_NAME;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_ID}`); // No spaces

      // Clear out the value of caseId and we should no longer have the anchor.
      wrapper.caseId = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should remove the link if case id is changed to null', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseId and it should work (showing the link).
      wrapper.caseName = CASE_NAME;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_ID}`); // No spaces

      // Make caseId null and we should no longer have the anchor.
      wrapper.caseId = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

  });
});
