import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HearingJudgeNameComponent } from './hearing-judge-name.component';

describe('HearingJudgeNameComponent', () => {
  let component: HearingJudgeNameComponent;
  let fixture: ComponentFixture<HearingJudgeNameComponent>;

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
});
