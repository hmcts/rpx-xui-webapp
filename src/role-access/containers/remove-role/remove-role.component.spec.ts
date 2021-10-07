import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AnswersComponent } from '../../components';
import { RemoveAllocationNavigationEvent, RoleCategory, TypeOfRole } from '../../models';
import { AnswerLabelText, RemoveRoleText } from '../../models/enums/answer-text';
import { AllocateRoleService } from '../../services';
import { RemoveRoleComponent } from './remove-role.component';

@Component({
  template: `<exui-remove-role></exui-remove-role>`
})
class WrapperComponent {
  @ViewChild(RemoveRoleComponent) public appComponentRef: RemoveRoleComponent;
}

describe('RemoveRoleComponent', () => {
  let component: RemoveRoleComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl', 'navigate'
  ]);
  const mockAllocateRoleService = jasmine.createSpyObj('allocateRoleService', ['removeAllocation']);
  const exampleCaseId = '123456789';
  const goToCaseUrl = `cases/case-details/${exampleCaseId}/roles-and-access`;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [ HttpClientModule ],
      declarations: [ AnswersComponent, RemoveRoleComponent, WrapperComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                roles: [
                  {
                    name: 'test user name',
                    roleCategory: RoleCategory.JUDICIAL,
                    roleName: TypeOfRole.LeadJudge,
                    location: '1234567',
                    start: '2021-07-13T00:29:10.656Z',
                    end: '2021-07-15T00:29:10.656Z',
                    id: '999999999',
                    actorId: '1234567',
                    actions: [],
                    email: 'user@test.com'
                  }
                ]
              },
              queryParams: {
                caseId: '123456789',
                assignmentId: '999999999',
              }
            },
          }
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: AllocateRoleService,
          useValue: mockAllocateRoleService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    const captionElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(captionElement.textContent).toBeFalsy();
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(headingElement.textContent).toContain(RemoveRoleText.heading);
    const hintElement = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hintElement.textContent).toContain(RemoveRoleText.hint);
  });

  it('should display the exclusion details', () => {
    const ELEMENT_0 = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__key')[0];
    expect(ELEMENT_0.textContent).toContain(AnswerLabelText.TypeOfRole);
    const ELEMENT_0_VALUE = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__value')[0];
    expect(ELEMENT_0_VALUE.textContent).toContain('Lead judge');
    const ELEMENT_1 = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__key')[1];
    expect(ELEMENT_1.textContent).toContain(AnswerLabelText.Person);
    const ELEMENT_1_VALUE = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__value')[1];
    expect(ELEMENT_1_VALUE.textContent).toContain('user@test.com');
  });

  it('should navigate correctly on click', () => {
    component.onNavEvent(RemoveAllocationNavigationEvent.CANCEL);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(goToCaseUrl);
    mockAllocateRoleService.removeAllocation.and.returnValue(of({}));
    component.onNavEvent(RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION);
    const additionalState = {state: {showMessage: true, messageText: RemoveRoleText.infoMessage}};
    expect(routerMock.navigate).toHaveBeenCalledWith([goToCaseUrl], additionalState);
  });
});
