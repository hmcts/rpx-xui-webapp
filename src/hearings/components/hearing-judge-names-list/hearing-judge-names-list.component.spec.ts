import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JudicialUserModel } from '../../../hearings/models/person.model';
import { HearingJudgeNamesListComponent } from './hearing-judge-names-list.component';

describe('HearingJudgeNamesListComponent', () => {
  let component: HearingJudgeNamesListComponent;
  let fixture: ComponentFixture<HearingJudgeNamesListComponent>;

  const judgeDetails: JudicialUserModel = {
    sidam_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    object_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    known_as: 'Hearing Judge',
    surname: 'Jacky',
    personal_code: 'P100001',
    full_name: 'Jacky Collins',
    post_nominals: '',
    email_id: 'jacky.collins@judicial.com'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingJudgeNamesListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingJudgeNamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check displayed Judge Name', () => {
    expect(component.displayedJudgeName(judgeDetails)).toBe(`Hearing Judge (jacky.collins@judicial.com)`);
  });

  it('should remove selected Judge', () => {
    component.judgeList = [judgeDetails];
    component.removeSelectedJudge(judgeDetails);
    expect(component.judgeList.length).toBe(0);
  });

  it('should check exclude judge', () => {
    component.judgeList = [];
    component.selectedJudge = judgeDetails;
    component.personFormGroup.controls.selectedFormControl.setValue(judgeDetails);
    component.excludeJudge();
    expect(component.judgeList.length).toBe(1);
    component.removeSelectedJudge(judgeDetails);
    expect(component.judgeList.length).toBe(0);
  });

  it('should check exclude judge is valid input or not', () => {
    component.selectedJudge = judgeDetails;
    component.judgeList = [];
    component.personFormGroup.controls.selectedFormControl.setValue(judgeDetails);
    expect(component.isExcludeJudgeInputValid()).toBe(false);
    component.personFormGroup.controls.selectedFormControl.setValue(null);
    expect(component.isExcludeJudgeInputValid()).toBe(true);
  });
});
