import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { AnswersComponent } from '../../components/answers/answers.component';
import { ExclusionNavigationEvent } from '../../models';
import { AnswerHeaderText, AnswerLabelText, ExclusionMessageText } from '../../models/enums';
import { RoleExclusionsService } from '../../services';
import { RoleExclusionsMockService } from '../../services/role-exclusions.mock.service';
import { DeleteExclusionComponent } from './delete-exclusion.component';
import { of } from 'rxjs';

@Component({
  template: `<exui-delete-exclusion></exui-delete-exclusion>`
})
class WrapperComponent {
  @ViewChild(DeleteExclusionComponent) public appComponentRef: DeleteExclusionComponent;
}

describe('DeleteExclusionComponent', () => {
  let component: DeleteExclusionComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl', 'navigate'
  ]);
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
                    notes: 'Test exclusion'
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
          useClass: RoleExclusionsMockService
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
    expect(captionElement.textContent).toContain(AnswerHeaderText.DeleteExclusion);
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(headingElement.textContent).toContain(AnswerHeaderText.CheckAnswers);
    const hintElement = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hintElement.textContent).toContain(AnswerHeaderText.CheckInformation);
  });

  it('should navigate correctly on click', () => {
    component.onNavEvent(ExclusionNavigationEvent.CANCEL);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(goToCaseUrl);
    component.onNavEvent(ExclusionNavigationEvent.DELETE_EXCLUSION);
    const additionalState = {state: {showMessage: true, messageText: ExclusionMessageText.Delete}};
    expect(routerMock.navigate).toHaveBeenCalledWith([goToCaseUrl], additionalState);
  });
});
