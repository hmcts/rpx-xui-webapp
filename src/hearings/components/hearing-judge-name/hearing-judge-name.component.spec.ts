import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HearingJudgeNameComponent } from './hearing-judge-name.component';

describe('HearingJudgeNameComponent', () => {
  let component: HearingJudgeNameComponent;
  let fixture: ComponentFixture<HearingJudgeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingJudgeNameComponent]
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
