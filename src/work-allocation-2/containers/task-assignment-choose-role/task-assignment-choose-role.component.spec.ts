import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { ChooseRadioOptionComponent } from '../../../role-access/components';

import { TaskAssignmentChooseRoleComponent } from './task-assignment-choose-role.component';

describe('TaskAssignmentChooseRoleComponent', () => {
  let component: TaskAssignmentChooseRoleComponent;
  let fixture: ComponentFixture<TaskAssignmentChooseRoleComponent>;
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  mockSessionStorageService.getItem.and.returnValue('{"id":"db17f6f7-1abf-4223-8b5e-1eece04ee5d8","forename":"Case","surname":"Officer","email":"CRD_func_test_demo_user@justice.gov.uk","active":true,"roles":["case-allocator","caseworker","caseworker-ia","caseworker-ia-caseofficer","cwd-user","hmcts-legal-operations","task-supervisor","tribunal-caseworker"],"roleCategory":"LEGAL_OPERATIONS","token":"Bearer eyJ0eXAiOiJKV1QiLCJ6aXAiOiJOT05FIiwia2lkIjoiWjRCY2pWZ2Z2dTVaZXhLekJFRWxNU200M0xzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJDUkRfZnVuY190ZXN0X2RlbW9fdXNlckBqdXN0aWNlLmdvdi51ayIsImN0cyI6Ik9BVVRIMl9TVEFURUxFU1NfR1JBTlQiLCJhdXRoX2xldmVsIjowLCJhdWRpdFRyYWNraW5nSWQiOiJhMGQ4MzNmNS00NGZmLTRjOTAtYmQ4Zi0wY2ZmMThhZDNiYzUtNDYzMDYxNyIsImlzcyI6Imh0dHBzOi8vZm9yZ2Vyb2NrLWFtLnNlcnZpY2UuY29yZS1jb21wdXRlLWlkYW0tZGVtby5pbnRlcm5hbDo4NDQzL29wZW5hbS9vYXV0aDIvcmVhbG1zL3Jvb3QvcmVhbG1zL2htY3RzIiwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImF1dGhHcmFudElkIjoic0w2cUpGaDNuOVdaNFN6alFLLW9jcjN4NXY0IiwiYXVkIjoieHVpd2ViYXBwIiwibmJmIjoxNjM2OTg3NjgxLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiY3JlYXRlLXVzZXIiLCJtYW5hZ2UtdXNlciJdLCJhdXRoX3RpbWUiOjE2MzY5ODc2ODAsInJlYWxtIjoiL2htY3RzIiwiZXhwIjoxNjM3MDE2NDgxLCJpYXQiOjE2MzY5ODc2ODEsImV4cGlyZXNfaW4iOjI4ODAwLCJqdGkiOiJrWDlUUFE0aVNGUVZlZEducUJnMkh6ZGpsOW8ifQ.pUCEKOpixSMssO7_krYetP2sbtSkIOPBs-Gia0COB1FPIxCRBGVwXUODT_E_w0cGxwUhmHCLhpNn6aFbvgRVHe5bmyAqpvEkoTUaRyElQ8rNscliXoXaci_ROkbZ5rR9tzcV6WjWRo7OuC9PFqabq1Kyop-f3B8IsA_Fbm6my3ryBOcMP4S8V9eA3pUI2-Ek5Oqjv57Vx5NAFN7KCVJD424F0UQ7viGlfiZNx7DPyGANvx4GxAhe-LRB6pn2bzqfEsnbEOjjULlvdyZUB_c4jZib6_pznrc8ppz7oKXKtmHPt1RZxT0bLbt8DuxC-n_NM4yR9JDasUtTGtke52BFzQ"}');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ExuiCommonLibModule, RouterTestingModule.withRoutes([])],
      declarations: [TaskAssignmentChooseRoleComponent, ChooseRadioOptionComponent],
      providers: [
        {provide: SessionStorageService, useValue: mockSessionStorageService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                verb: 'Reassign'
              },
              paramMap: convertToParamMap({taskId: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8'})
            }
          },
        },
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAssignmentChooseRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select legal ops role', () => {
    const nativeElement = fixture.debugElement.nativeElement as HTMLElement;
    const radios: any = nativeElement.querySelectorAll('.govuk-radios__item');
    const input = radios[1].firstChild;
    expect(input.checked).toBeTruthy();

  });

  it('should set the caption to reassign', () => {
    expect(component.caption).toEqual('Reassign task');
    expect(component.description).toEqual('Which role type are you reassigning the task to?');
  });

  it('should send user to find person', () => {
    component.submit(component.form.value, component.form.valid);
    expect(router.navigate).toHaveBeenCalledWith(
      ['work', 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', 'reassign', 'person'],
      {queryParams: { role: 'LEGAL_OPERATIONS'}}
    );
  });
});
