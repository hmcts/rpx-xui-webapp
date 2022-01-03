import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../../hearings/models/person.model';
import { HearingJudgeNamesListComponent } from './hearing-judge-names-list.component';

describe('HearingJudgeNamesListComponent', () => {
  let component: HearingJudgeNamesListComponent;
  let fixture: ComponentFixture<HearingJudgeNamesListComponent>;

  const judgeDetails: Person = {
    id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    name: 'Jacky Collins',
    email: 'jacky.collins@judicial.com',
    domain: 'JUDICIAL',
    knownAs: 'Hearing Judge'
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

  it('should update person controls of selectedJudge', () => {
    component.updatePersonControls(judgeDetails);
    expect(component.selectedJudge).toBe(judgeDetails);
  });

  it('should check displayed Judge Name', () => {
    expect(component.displayedJudgeName(judgeDetails)).toBe(`Hearing Judge(jacky.collins@judicial.com)`);
    const judgeDetailsWithoutKnownas: Person = {
      id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
      name: 'Jacky Collins',
      email: 'jacky.collins@judicial.com',
      domain: 'JUDICIAL',
    };
    expect(component.displayedJudgeName(judgeDetailsWithoutKnownas)).toBe(`Jacky Collins(jacky.collins@judicial.com)`);
  });

  it('should remove selected Judge', () => {
    component.judgeList = [judgeDetails];
    component.removeSelectedJudge(judgeDetails);
    expect(component.judgeList.length).toBe(0);
  });
});
