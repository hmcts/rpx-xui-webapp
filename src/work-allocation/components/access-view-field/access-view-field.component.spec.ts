import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { AccessViewFieldComponent } from './access-view-field.component';

@Component({
  template: '<exui-access-view-field [workField]="workField"></exui-access-view-field>'
})
class WrapperComponent {
  @ViewChild(AccessViewFieldComponent) public appComponentRef: AccessViewFieldComponent;
  @Input() public workField: any;
}

describe('WorkAllocation', () => {
  describe('AccessViewFieldComponent', () => {
    const REJECTED_REQUEST_URL: string = '/role-access/rejected-request';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let component: AccessViewFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;
    let router: Router;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WrapperComponent],
        imports: [WorkAllocationComponentsModule,
          RouterTestingModule.withRoutes(
            [{ path: 'role-access/rejected-request', component: WrapperComponent }]
          )]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      fixture.detectChanges();
    });

    it('should only show a link when it has a role setting of specific-access-denied', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the role denied and it should work (showing the link).
      wrapper.workField = { role: 'specific-access-denied' };
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe('View');
    });

    it('should remove the link if role is changed to a different role', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      wrapper.workField = { role: 'specific-access-denied' };
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe('View');

      // Change the value of role and we should no longer have the anchor.
      wrapper.workField = { role: 'specific-access-granted' };
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should navigate to specific access rejected request view page', () => {
      wrapper.appComponentRef.workField = {
        role: 'specific-access-denied',
        case_name: 'Example name',
        case_id: '123456789',
        role_category: 'specific',
        jurisdictionId: 'IA',
        dateSubmitted: '01-01-2022',
        infoRequired: true,
        reviewer: 'Mr Test',
        requestDate: '01-01-2021',
        specificAccessReason: 'I want to test',
        reviewerRoleCategory: 'Judicial',
        infoRequiredComment: 'Need more Infomation',
        endDate: '15-01-2022'
      };
      fixture.detectChanges();
      wrapper.appComponentRef.viewRejection();

      expect(router.navigate).toHaveBeenCalledWith([REJECTED_REQUEST_URL], { queryParams: {
        caseName: 'Example name',
        caseReference: '123456789',
        roleCategory: 'specific',
        jurisdiction: 'IA',
        dateRejected: '01-01-2022',
        infoRequired: true,
        reviewer: 'Mr Test',
        dateSubmitted: '01-01-2021',
        specificAccessReason: 'I want to test',
        reviewerRoleCategory: 'Judicial',
        infoRequiredComment: 'Need more Infomation',
        endDate: '15-01-2022'
      } });
    });
  });
});
