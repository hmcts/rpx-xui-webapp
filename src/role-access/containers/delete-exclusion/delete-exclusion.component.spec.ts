import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { Caseworker } from '../../../work-allocation-2/models/dtos';
import { AnswersComponent } from '../../components/answers/answers.component';
import { ExclusionNavigationEvent, RoleCategory, RoleExclusion } from '../../models';
import { AnswerHeaderText, ExclusionMessageText } from '../../models/enums';
import { RoleExclusionsService } from '../../services';
import { DeleteExclusionComponent } from './delete-exclusion.component';

@Component({
  template: `<exui-delete-exclusion></exui-delete-exclusion>`
})
class WrapperComponent {
  @ViewChild(DeleteExclusionComponent) public appComponentRef: DeleteExclusionComponent;
}

const mockCaseworker: Caseworker = {
  idamId: '999999999',
  firstName: 'test',
  lastName: 'testing',
  email: 'test@test.com',
  location: null,
  roleCategory: RoleCategory.LEGAL_OPERATIONS
}

describe('DeleteExclusionComponent', () => {
  let component: DeleteExclusionComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl', 'navigate'
  ]);
  const mockCaseworkerDataService = jasmine.createSpyObj('caseworkerDataService', ['getAll']);
  const mockRoleExclusionService = jasmine.createSpyObj('roleExclusionService', ['getCurrentUserRoleExclusions', 'deleteExclusion']);
  const exampleCaseId = '1234';
  const exclusionId = '2';
  const goToCaseUrl = `cases/case-details/${exampleCaseId}/roles-and-access`;
  const jurisdiction = 'Jurisdiction';
  const caseType = 'caseType';
  const exclusion = {caseId: exampleCaseId, exclusionId, jurisdiction, caseType, name: 'Sample Name' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [ HttpClientModule ],
      declarations: [ AnswersComponent, DeleteExclusionComponent, WrapperComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                roleExclusions: [
                  {
                    added: Date.UTC(2021, 6, 1),
                    id: exclusionId,
                    name: 'Judge Rinder',
                    notes: 'Test exclusion',
                    actorId: '999999999',
                  }
                ]
              }
            },
            queryParamMap: of(convertToParamMap(exclusion))
          }
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: RoleExclusionsService,
          useValue: mockRoleExclusionService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockCaseworkerDataService.getAll.and.returnValue(of([mockCaseworker]));
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeDefined();
    const captionElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(captionElement.textContent).toContain(AnswerHeaderText.DeleteExclusion);
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(headingElement.textContent).toContain(AnswerHeaderText.CheckAnswers);
    const hintElement = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hintElement.textContent).toContain(AnswerHeaderText.CheckInformation);
  });

  it('should navigate correctly on click', () => {
    component.onNavEvent(ExclusionNavigationEvent.CANCEL);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(goToCaseUrl);
    mockRoleExclusionService.deleteExclusion.and.returnValue(of(200));
    component.onNavEvent(ExclusionNavigationEvent.DELETE_EXCLUSION);
    const additionalState = {state: {showMessage: true, messageText: ExclusionMessageText.Delete}};
    expect(routerMock.navigate).toHaveBeenCalledWith([goToCaseUrl], additionalState);
  });
});
