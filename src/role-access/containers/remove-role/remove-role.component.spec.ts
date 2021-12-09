import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AnswersComponent } from '../../components';
import { AllocateRoleStateData, CaseRole, RemoveAllocationNavigationEvent, Role, RoleCategory, TypeOfRole } from '../../models';
import { CaseRoleDetails } from '../../models/case-role-details.interface';
import { AnswerLabelText, RemoveRoleText } from '../../models/enums/answer-text';
import { AllocateRoleService } from '../../services';
import { RemoveRoleComponent } from './remove-role.component';

@Component({
  template: `
    <exui-remove-role></exui-remove-role>`
})
class WrapperComponent {
  @ViewChild(RemoveRoleComponent) public appComponentRef: RemoveRoleComponent;
}

describe('RemoveRoleComponent', () => {
  let component: RemoveRoleComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl', 'navigate', 'getCurrentNavigation'
  ]);
  const locationMock = jasmine.createSpyObj('Location', [
    'back'
  ]);
  const allworkUrl = `work/all-work/cases`;
  window.history.pushState({ returnUrl: allworkUrl }, '', allworkUrl);

  class AllocateRoleMockService extends AllocateRoleService {
    public confirmAllocation(allocateRoleStateData: AllocateRoleStateData): Observable<any> {
      return of(null);
    }

    public getCaseRoles(caseId: string, jurisdiction: string, caseType: string, assignmentId?: string): Observable<CaseRole[]> {
      return of([
        {
          added: Date.UTC(2021, 6, 1),
          id: '999999999',
          actorId: '999999999',
          name: 'Judge Rinder',
          notes: 'Test exclusion',
          roleCategory: RoleCategory.JUDICIAL,
          email: 'user@test.com'
        }
      ] as unknown as CaseRole[]);
    }

    public getValidRoles(): Observable<Role[]> {
      return of(null);
    }

    public removeAllocation(assigmentId: string): Observable<any> {
      return of(null);
    }

    public getCaseRolesUserDetails(caseRoles: CaseRole[]): Observable<CaseRoleDetails[]> {
      const caseRoleDetail: CaseRoleDetails = {
        idam_id: '999999999',
        surname: '',
        email_id: 'user@test.com',
        full_name: 'Judge Rinder',
        known_as: '',
        sidam_id: '999999999'
      };
      return of([caseRoleDetail]);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AnswersComponent, RemoveRoleComponent, WrapperComponent],
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
              },
            },
            queryParamMap: of(convertToParamMap({
              caseId: '123456789',
              assignmentId: '999999999',
              jurisdiction: 'IA',
              caseType: 'Alsyum',
            }))
          }
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: Location,
          useValue: locationMock
        },
        {
          provide: AllocateRoleService,
          useClass: AllocateRoleMockService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    routerMock.getCurrentNavigation.and.returnValue({ extras: { state: { backUrl: allworkUrl } } });
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
    expect(ELEMENT_0_VALUE.textContent).toContain('Judge Rinder');
    const ELEMENT_1 = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__key')[1];
    expect(ELEMENT_1.textContent).toContain(AnswerLabelText.Person);
    const ELEMENT_1_VALUE = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__value')[1];
    expect(ELEMENT_1_VALUE.textContent).toContain('user@test.com');
  });

  it('should navigate correctly on click', () => {
    component.onNavEvent(RemoveAllocationNavigationEvent.CANCEL);
    expect(locationMock.back).toHaveBeenCalled();
    component.onNavEvent(RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION);
    const additionalState = { state: { showMessage: true, messageText: RemoveRoleText.infoMessage } };
    expect(routerMock.navigate).toHaveBeenCalledWith([allworkUrl], additionalState);
  });

  describe('navigationHandler cancel', () => {
    it('on cancel event', () => {
      fixture.detectChanges();
      component.onNavEvent(RemoveAllocationNavigationEvent.CANCEL);
      expect(locationMock.back).toHaveBeenCalled();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
