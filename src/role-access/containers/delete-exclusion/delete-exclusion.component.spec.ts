import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AnswerHeaderText, AnswerLabelText } from '../../models/enums';
import { AnswersComponent } from '../../components/answers/answers.component';
import { DeleteExclusionComponent } from './delete-exclusion.component';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
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
                    name: 'Judge Rinder',
                    notes: 'Test exclusion'
                  }
                ]
              }
            }
          }
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

  it('should display the exclusion details', () => {
    const personLabelElement = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__key')[0];
    expect(personLabelElement.textContent).toContain(AnswerLabelText.Person);
    const personValueElement = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__value')[0];
    expect(personValueElement.textContent).toContain('Judge Rinder');
    const descriptionLabelElement = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__key')[1];
    expect(descriptionLabelElement.textContent).toContain(AnswerLabelText.DescribeExclusion);
    const descriptionValueElement = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__value')[1];
    expect(descriptionValueElement.textContent).toContain('Test exclusion');
    const dateAddedLabelElement = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__key')[2];
    expect(dateAddedLabelElement.textContent).toContain(AnswerLabelText.DateAdded);
    const dateAddedValueElement = fixture.debugElement.nativeElement.querySelectorAll('.govuk-summary-list__value')[2];
    expect(dateAddedValueElement.textContent).toContain('01/07/2021');
  });
});
