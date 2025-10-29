import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppConstants } from '../../../app/app.constants';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { CaseNameFieldComponent } from './case-name-field.component';

@Component({
  standalone: false,
  template: '<exui-case-name-field [caseName]="caseName" [jurisdiction]="jurisdiction" [caseType]="caseType" [caseId]="caseId" [hasAccess]="hasAccess"></exui-case-name-field>'
})
class WrapperComponent {
  @ViewChild(CaseNameFieldComponent) public appComponentRef: CaseNameFieldComponent;
  @Input() public caseName: string;
  @Input() public caseId: string;
  @Input() public jurisdiction: string;
  @Input() public caseType: string;
  @Input() public hasAccess: boolean;
}

describe('WorkAllocation', () => {
  describe('CaseNameFieldComponent', () => {
    const CASE_DETAILS_URL: string = AppConstants.CASE_DETAILS_URL;
    const CASE_NAME: string = 'Casename';
    const JURISDICTION: string = 'IA';
    const CASETYPE: string = 'Asylum';
    const CASE_ID: string = 'CaseId';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let component: CaseNameFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WrapperComponent],
        imports: [WorkAllocationComponentsModule, RouterTestingModule]
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
      wrapper.jurisdiction = JURISDICTION;
      wrapper.caseType = CASETYPE;
      wrapper.caseId = CASE_ID;
      wrapper.hasAccess = true;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${JURISDICTION}/${CASETYPE}/${CASE_ID}`); // No spaces
    });

    it('should remove the link if case id is changed to undefined', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseId and it should work (showing the link).
      wrapper.caseName = CASE_NAME;
      wrapper.jurisdiction = JURISDICTION;
      wrapper.caseType = CASETYPE;
      wrapper.caseId = CASE_ID;
      wrapper.hasAccess = true;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${JURISDICTION}/${CASETYPE}/${CASE_ID}`); // No spaces

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
      wrapper.jurisdiction = JURISDICTION;
      wrapper.caseType = CASETYPE;
      wrapper.caseId = CASE_ID;
      wrapper.hasAccess = true;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${JURISDICTION}/${CASETYPE}/${CASE_ID}`); // No spaces

      // Make caseId null and we should no longer have the anchor.
      wrapper.caseId = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should remove the link if hasAccess is set to false', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseId and it should work (showing the link).
      wrapper.caseName = CASE_NAME;
      wrapper.jurisdiction = JURISDICTION;
      wrapper.caseType = CASETYPE;
      wrapper.caseId = CASE_ID;
      wrapper.hasAccess = true;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${JURISDICTION}/${CASETYPE}/${CASE_ID}`); // No spaces

      // Make hasAccess false and we should no longer have the anchor but instead a label.
      wrapper.hasAccess = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
      expect(fixture.debugElement.nativeElement.querySelector('label')).not.toBeNull();
    });
  });
});

@Component({
  template: '<exui-case-name-field [caseName]="caseName" [jurisdiction]="jurisdiction" [caseType]="caseType" [caseId]="caseId" ></exui-case-name-field>',
  standalone: false
})
class Wrapper1Component {
  @ViewChild(CaseNameFieldComponent) public appComponentRef: CaseNameFieldComponent;
  @Input() public caseName: string;
  @Input() public caseId: string;
  @Input() public jurisdiction: string;
  @Input() public caseType: string;
  @Input() public hasAccess: boolean;
}

describe('WorkAllocation', () => {
  describe('CaseNameFieldComponent', () => {
    const CASE_DETAILS_URL: string = AppConstants.CASE_DETAILS_URL;
    const CASE_NAME: string = 'Casename';
    const JURISDICTION: string = 'IA';
    const CASETYPE: string = 'Asylum';
    const CASE_ID: string = 'CaseId';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let component: CaseNameFieldComponent;
    let wrapper: Wrapper1Component;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [Wrapper1Component],
        imports: [WorkAllocationComponentsModule, RouterTestingModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(Wrapper1Component);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    it('should show a link when hasaccess is not set in wrapper component', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the caseName and it should work (showing the link).
      wrapper.caseName = CASE_NAME;
      wrapper.jurisdiction = JURISDICTION;
      wrapper.caseType = CASETYPE;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(CASE_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${JURISDICTION}/${CASETYPE}/${CASE_ID}`); // No spaces
    });
  });
});
