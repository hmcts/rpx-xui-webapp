import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../../hearings/models/person.model';
import { HearingJudgeNameComponent } from './hearing-judge-name.component';

describe('HearingJudgeNameComponent', () => {
  let component: HearingJudgeNameComponent;
  let fixture: ComponentFixture<HearingJudgeNameComponent>;

  const judgeDetails: Person = {
    id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    name: 'Jacky Collins',
    email: 'jacky.collins@judicial.com',
    domain: 'JUDICIAL',
    knownAs: 'Hearing Judge'
  };
  const personFormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    domain: new FormControl(),
    knownAs: new FormControl(),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingJudgeNameComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingJudgeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update person controls of selectedJudge', () => {
    component.updatePersonControls(judgeDetails);
    expect(component.selectedJudge).toBe(judgeDetails);
  });

  it('should check selected judge is valid input or not', () => {
    component.selectedJudge = judgeDetails;
    component.personControl = {};
    component.personControl.isPersonSelectionCompleted = true;
    component.personSelectionFormControl = personFormGroup;
    component.personControl.findPersonGroup = new FormGroup({});
    expect(component.isJudgeInputValid()).toBe(true);
    component.personControl.isPersonSelectionCompleted = false;
    expect(component.isJudgeInputValid()).toBe(false);
  });

  it('should check set Person Selection FormControl', () => {
    component.personSelectionFormControl = personFormGroup;
    component.selectedJudge = judgeDetails;
    component.setPersonSelectionToFormControl(judgeDetails);
    expect(component.personSelectionFormControl.get('email').value).toBe('jacky.collins@judicial.com');
  });

});
