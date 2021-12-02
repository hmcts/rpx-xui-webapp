import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyJudgeComponent } from './specify-judge.component';

describe('SpecifyJudgeComponent', () => {
  let component: SpecifyJudgeComponent;
  let fixture: ComponentFixture<SpecifyJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifyJudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
