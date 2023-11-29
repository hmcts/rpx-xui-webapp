import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantAttendanceSectionComponent } from './participant-attendance-section.component';

describe('ParticipantAttendanceSectionComponent', () => {
  let component: ParticipantAttendanceSectionComponent;
  let fixture: ComponentFixture<ParticipantAttendanceSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ParticipantAttendanceSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantAttendanceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
